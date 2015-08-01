<?php

$placeid = $_GET['id'];

$url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' . $placeid . '&key=AIzaSyAfUa2-g732LxbljShjVoz16JUKclQCtSc';

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'GET',
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;
