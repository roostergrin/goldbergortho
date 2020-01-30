<?php
// wp api custom endpoints
add_action('rest_api_init', 'rg_register_routes');
function rg_register_routes () {
  register_rest_route('rg-mail/v1', 'appointmentform', array(
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'rg_serve_route_v1'
  ));
  register_rest_route('rg-mail/v1', 'postappointmentform', array(
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'rg_serve_route_v2'
  ));    
}
// function for handling post request to new api route
function rg_serve_route_v1 () {
  require('wp-load.php');

  $data = json_decode(file_get_contents("php://input"), true);
  $from = 'info@wordpress.com';
  $to = 'form7test@gmail.com';

  $subject = 'Appointment Request Form';
  // $headers = "From: " . strip_tags($_POST['req-email']) . "\r\n";
  // $headers .= "Reply-To: " . "\r\n";
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  $message = '<html><body>';
  $message .= '<p><h4><strong>Name:</strong></h4> ' . $data['yourName'] . '</p>';
  $message .= '<p><h4><strong>Email Address:</strong></h4> ' . $data['email'] . '</p>';
  $message .= '<p><h4><strong>Phone Number:</strong></h4> ' . $data['phoneNumber'] . '</p>';
  $message .= '<p><h4><strong>Comment:</strong></h4> ' . $data['message'] . '</p>';


  $sent_message = wp_mail($to, $subject, $message, $headers);

  if ($sent_message) {
    echo 'Email has been received!';
  } else {
    echo 'Could not send email. Did you Update SendGrid?';
  }
}

function rg_serve_route_v2 () {
  require('wp-load.php');

  $data = json_decode(file_get_contents("php://input"), true);
  $from = 'info@wordpress.com';
  $to = 'form7test@gmail.com';

  $subject = 'Post Appointment Survey Form';
  // $headers = "From: " . strip_tags($_POST['req-email']) . "\r\n";
  // $headers .= "Reply-To: " . "\r\n";
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  $message = '<html><body>';
  $message .= '<p><h4><strong>Please describe your experience visiting our practice.:</strong></h4> ' . $data['experiencePractice'] . '</p>';
  $message .= '<p><h4><strong>Please describe your experience working with the doctor(s) and staff.</strong></h4> ' . $data['experienceWithDoctor'] . '</p>';    
  $message .= '<p><h4><strong>What was your favorite thing about being at our practice?</strong></h4> ' . $data['favoritePractice'] . '</p>';
  $message .= '<p><h4><strong>What areas could we improve upon to make your experience even more enjoyable?</strong></h4> ' . $data['experienceEnjoyable'] . '</p>';
  $message .= '<p><h4><strong>How would you rate your overall experience?</strong></h4> ' . $data['overallExperience'] . '</p>';
  $message .= '<p><h4><strong>Please provide any additional comments/suggestions.</strong></h4> ' . $data['additionalComments'] . '</p>';
  $message .= '<p><h4><strong>Would you like a member of our team to contact you to further discuss your experience?*  </strong></h4> ' . $data['memberExperience'] . '</p>';
  $message .= '<p><h4><strong>Please provide your name and email address: </strong></h4></p>';
  $message .= '<p><h4><strong>Your Name:  </strong></h4> ' . $data['yourName'] . '</p>';
  $message .= '<p><h4><strong>Your Email Address: </strong></h4> ' . $data['email'] . '</p>';


  $sent_message = wp_mail($to, $subject, $message, $headers);

  if ($sent_message) {
    echo 'Email has been received!';
  } else {
    echo 'Could not send email. Did you Update SendGrid?';
  }
}
