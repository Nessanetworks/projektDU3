<?php

require_once("functions.php");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
} else {
    header("Access-Control-Allow-Origin: *");
}

$fileName = "recipes.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestData = getRequestData();

$recipes = [];

if (file_exists($fileName)) {
    $json = file_get_contents($fileName);
    $recipes = json_decode($json, true);
}

if ($requestMethod == "GET")
{
    send(200, $recipes);
}
?>

