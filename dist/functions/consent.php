<?php
// Cookie consent support for static/consent/consent.js:
// - stores a record of every consent choice (proof of consent)
// - Tools > Consent Records admin screen with CSV export
// - creates the Privacy Policy / Cookie Policy pages the Vue routes need

define('RG_CONSENT_DB_VERSION', '1');
define('RG_CONSENT_CATEGORIES', 'necessary,analytics,marketing');

function rg_consent_table () {
  global $wpdb;
  return $wpdb->prefix . 'rg_consent_log';
}

// Create the log table once (runs on the first request after deploy)
function rg_consent_install () {
  if (get_option('rg_consent_db_version') === RG_CONSENT_DB_VERSION) {
    return;
  }
  global $wpdb;
  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  $table = rg_consent_table();
  $charset = $wpdb->get_charset_collate();
  dbDelta("CREATE TABLE $table (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    consent_id char(36) NOT NULL,
    created_at datetime NOT NULL,
    event varchar(10) NOT NULL,
    accept_type varchar(10) NOT NULL DEFAULT '',
    accepted varchar(100) NOT NULL DEFAULT '',
    rejected varchar(100) NOT NULL DEFAULT '',
    revision int(11) NOT NULL DEFAULT 0,
    gpc tinyint(1) NOT NULL DEFAULT 0,
    page varchar(255) NOT NULL DEFAULT '',
    ip_hash char(64) NOT NULL DEFAULT '',
    user_agent varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY  (id),
    KEY consent_id (consent_id),
    KEY created_at (created_at)
  ) $charset;");
  update_option('rg_consent_db_version', RG_CONSENT_DB_VERSION);
}
add_action('init', 'rg_consent_install');

// The Vue app renders these pages; WordPress only needs them to exist so the URLs return 200
function rg_consent_policy_pages () {
  if (get_option('rg_consent_pages_version')) {
    return;
  }
  // add_option fails if another request got here first
  if (!add_option('rg_consent_pages_version', '1')) {
    return;
  }
  $pages = array(
    'privacy-policy' => 'Privacy Policy',
    'cookie-policy' => 'Cookie Policy'
  );
  foreach ($pages as $slug => $title) {
    $page = get_page_by_path($slug);
    if ($page) {
      $id = $page->ID;
      if ($page->post_status !== 'publish') {
        // WordPress installs a draft privacy-policy page with sample text; publish it empty
        wp_update_post(array('ID' => $id, 'post_status' => 'publish', 'post_content' => ''));
      }
    } else {
      $id = wp_insert_post(array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'post_title' => $title,
        'post_name' => $slug,
        'post_content' => ''
      ));
    }
    if ($slug === 'privacy-policy' && $id && !is_wp_error($id)) {
      update_option('wp_page_for_privacy_policy', $id);
    }
  }
}
add_action('init', 'rg_consent_policy_pages');

add_action('rest_api_init', 'rg_consent_register_routes');
function rg_consent_register_routes () {
  register_rest_route('rg-consent/v1', 'log', array(
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'rg_consent_log',
    'permission_callback' => '__return_true'
  ));
}

function rg_consent_clean_categories ($value) {
  $allowed = explode(',', RG_CONSENT_CATEGORIES);
  return implode(',', array_values(array_intersect($allowed, (array) $value)));
}

function rg_consent_log (WP_REST_Request $request) {
  $consent_id = (string) $request->get_param('consent_id');
  if (!preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i', $consent_id)) {
    return new WP_Error('rg_consent_invalid', 'Invalid consent ID', array('status' => 400));
  }

  // IPs are stored as a keyed hash: enough to match a record, not to identify a visitor
  $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
  $ip_hash = hash_hmac('sha256', $ip, wp_salt('auth'));

  // Public endpoint, so cap how many records one visitor can write
  $limit_key = 'rg_consent_' . substr($ip_hash, 0, 32);
  $count = (int) get_transient($limit_key);
  if ($count >= 30) {
    return new WP_Error('rg_consent_rate_limited', 'Too many requests', array('status' => 429));
  }
  set_transient($limit_key, $count + 1, 10 * MINUTE_IN_SECONDS);

  $event = $request->get_param('event') === 'change' ? 'change' : 'first';
  $accept_type = in_array($request->get_param('accept_type'), array('all', 'custom', 'necessary'), true) ? $request->get_param('accept_type') : '';
  $page = substr(sanitize_text_field((string) $request->get_param('page')), 0, 255);
  $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? substr(sanitize_text_field($_SERVER['HTTP_USER_AGENT']), 0, 255) : '';

  global $wpdb;
  $saved = $wpdb->insert(rg_consent_table(), array(
    'consent_id' => strtolower($consent_id),
    'created_at' => current_time('mysql', true),
    'event' => $event,
    'accept_type' => $accept_type,
    'accepted' => rg_consent_clean_categories($request->get_param('accepted')),
    'rejected' => rg_consent_clean_categories($request->get_param('rejected')),
    'revision' => absint($request->get_param('revision')),
    'gpc' => $request->get_param('gpc') ? 1 : 0,
    'page' => $page,
    'ip_hash' => $ip_hash,
    'user_agent' => $user_agent
  ));

  if (!$saved) {
    return new WP_Error('rg_consent_failed', 'Could not save consent', array('status' => 500));
  }
  return new WP_REST_Response(array('saved' => true), 201);
}

// Tools > Consent Records
add_action('admin_menu', 'rg_consent_admin_menu');
function rg_consent_admin_menu () {
  add_management_page('Consent Records', 'Consent Records', 'manage_options', 'rg-consent-records', 'rg_consent_admin_page');
}

function rg_consent_admin_page () {
  if (!current_user_can('manage_options')) {
    return;
  }
  global $wpdb;
  $table = rg_consent_table();
  $search = isset($_GET['consent_id']) ? sanitize_text_field(wp_unslash($_GET['consent_id'])) : '';

  if ($search) {
    $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE consent_id = %s ORDER BY id DESC", strtolower($search)));
  } else {
    $rows = $wpdb->get_results("SELECT * FROM $table ORDER BY id DESC LIMIT 100");
  }
  $summary = $wpdb->get_results("SELECT accept_type, COUNT(*) AS total FROM $table WHERE event = 'first' AND created_at >= UTC_TIMESTAMP() - INTERVAL 30 DAY GROUP BY accept_type");
  $export_url = wp_nonce_url(admin_url('admin-post.php?action=rg_consent_export'), 'rg_consent_export');
  ?>
  <div class="wrap">
    <h1>Consent Records</h1>
    <p>Every cookie choice made on the site, newest first. Times are UTC. Visitors can find their consent ID in the <code>cc_cookie</code> cookie.</p>
    <p>
      <strong>First choices, last 30 days:</strong>
      <?php foreach ($summary as $row) : ?>
        <?php echo esc_html(array('all' => 'Accepted all', 'necessary' => 'Rejected all', 'custom' => 'Custom', '' => 'Unknown')[$row->accept_type] ?? $row->accept_type); ?>: <?php echo (int) $row->total; ?> &nbsp;
      <?php endforeach; ?>
      <?php if (!$summary) : ?>none yet<?php endif; ?>
    </p>
    <form method="get">
      <input type="hidden" name="page" value="rg-consent-records">
      <input type="search" name="consent_id" value="<?php echo esc_attr($search); ?>" placeholder="Consent ID" size="40">
      <button class="button">Search</button>
      <a class="button" href="<?php echo esc_url($export_url); ?>">Export all (CSV)</a>
    </form>
    <table class="widefat striped" style="margin-top:12px">
      <thead><tr><th>Time (UTC)</th><th>Consent ID</th><th>Event</th><th>Choice</th><th>Accepted</th><th>Rejected</th><th>GPC</th><th>Page</th></tr></thead>
      <tbody>
      <?php foreach ($rows as $row) : ?>
        <tr>
          <td><?php echo esc_html($row->created_at); ?></td>
          <td><code><?php echo esc_html($row->consent_id); ?></code></td>
          <td><?php echo esc_html($row->event); ?></td>
          <td><?php echo esc_html($row->accept_type); ?></td>
          <td><?php echo esc_html($row->accepted); ?></td>
          <td><?php echo esc_html($row->rejected); ?></td>
          <td><?php echo $row->gpc ? 'Yes' : ''; ?></td>
          <td><?php echo esc_html($row->page); ?></td>
        </tr>
      <?php endforeach; ?>
      <?php if (!$rows) : ?>
        <tr><td colspan="8">No records found.</td></tr>
      <?php endif; ?>
      </tbody>
    </table>
  </div>
  <?php
}

add_action('admin_post_rg_consent_export', 'rg_consent_export');
function rg_consent_export () {
  if (!current_user_can('manage_options')) {
    wp_die('Not allowed');
  }
  check_admin_referer('rg_consent_export');
  global $wpdb;
  $table = rg_consent_table();
  header('Content-Type: text/csv; charset=utf-8');
  header('Content-Disposition: attachment; filename=consent-records-' . gmdate('Y-m-d') . '.csv');
  $out = fopen('php://output', 'w');
  fputcsv($out, array('id', 'consent_id', 'created_at_utc', 'event', 'accept_type', 'accepted', 'rejected', 'revision', 'gpc', 'page', 'ip_hash', 'user_agent'));
  $last_id = 0;
  do {
    $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE id > %d ORDER BY id ASC LIMIT 1000", $last_id), ARRAY_N);
    foreach ($rows as $row) {
      fputcsv($out, $row);
      $last_id = $row[0];
    }
  } while (count($rows) === 1000);
  fclose($out);
  exit;
}
