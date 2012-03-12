<?php
header('Content-Type:text/html;charset=gbk');

$url = $_GET['url'];
$body = file_get_contents($url);
echo $body;
