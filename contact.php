<?php
// NRG ONE contact endpoint for PHP-enabled hosting (cPanel/shared hosting, etc.).
// Sends enquiries to nrgone1991@gmail.com using the hosting server's mail transport.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: contact.html'); exit; }

function clean($v) { return trim(strip_tags((string)$v)); }
$name = clean($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$company = clean($_POST['company'] ?? '');
$phone = clean($_POST['phone'] ?? '');
$timeline = clean($_POST['timeline'] ?? '');
$service = clean($_POST['service'] ?? '');
$budget = clean($_POST['budget'] ?? '');
$message = trim(strip_tags((string)($_POST['message'] ?? '')));

if (!$name || !$email || !$company || !$timeline || !$service || !$budget || !$message) {
  http_response_code(422);
  echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Incomplete enquiry | NRG ONE</title><link rel="stylesheet" href="styles.css"></head><body><section class="section"><div class="container center"><div class="notice"><b>Please complete the required fields.</b><br>Go back to the contact form and fill in the missing information.</div><p><a class="btn primary" href="contact.html">Back to contact →</a></p></div></section></body></html>'; exit;
}

$to = 'nrgone1991@gmail.com';
$subject = 'NRG ONE Project Enquiry — ' . $service;
$safe = function($v) { return htmlspecialchars($v, ENT_QUOTES, 'UTF-8'); };
$html = '<h2>New NRG ONE Website Enquiry</h2>'
  . '<table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">'
  . '<tr><td><b>Name</b></td><td>'.$safe($name).'</td></tr>'
  . '<tr><td><b>Email</b></td><td>'.$safe($email).'</td></tr>'
  . '<tr><td><b>Company</b></td><td>'.$safe($company).'</td></tr>'
  . '<tr><td><b>Phone</b></td><td>'.$safe($phone).'</td></tr>'
  . '<tr><td><b>Timeline</b></td><td>'.$safe($timeline).'</td></tr>'
  . '<tr><td><b>Service</b></td><td>'.$safe($service).'</td></tr>'
  . '<tr><td><b>Budget</b></td><td>'.$safe($budget).'</td></tr>'
  . '</table><p><b>Requirement</b></p><p>'.nl2br($safe($message)).'</p>';
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: NRG ONE Website <noreply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

$sent = @mail($to, $subject, $html, $headers);
if ($sent) { header('Location: contact-success.html'); exit; }

http_response_code(503);
$mailto = 'mailto:' . $to . '?subject=' . rawurlencode($subject) . '&body=' . rawurlencode("Name: $name\nEmail: $email\nCompany: $company\nPhone: $phone\nTimeline: $timeline\nService: $service\nBudget: $budget\n\nRequirement:\n$message");
echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mail server unavailable | NRG ONE</title><link rel="stylesheet" href="styles.css"></head><body><section class="section"><div class="container center"><div class="notice"><b>Your hosting mail service did not accept the message.</b><br>Use the email fallback below, or enable SMTP/mail delivery with your hosting provider.</div><p><a class="btn primary" href="'.$mailto.'">Open email app →</a></p><p><a class="btn ghost" href="contact.html">Back to contact</a></p></div></section></body></html>';
