<?php

// define( 'UPLOADS', ''.'static' );
define( 'ACF_TO_REST_API_REQUEST_VERSION', 3 );


// suppress update emails
add_filter('allow_dev_auto_core_updates', '__return_false' );
add_filter('allow_minor_auto_core_updates', '__return_true' );
add_filter('allow_major_auto_core_updates', '__return_true' );
add_filter('auto_core_update_send_email', '__return_false' );
add_filter('auto_update_plugin', '__return_true' );
add_filter('upload_mimes', 'cc_mime_types');
add_filter('wp_mail_content_type','set_content_type');

function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}

function set_content_type($content_type){
  return 'text/html';
}

// Rest API CACHE
add_action( 'save_post', function( $post_id ) {
  if ( class_exists( 'WP_REST_Cache' ) ) {
    WP_REST_Cache::empty_cache();
  }
});
