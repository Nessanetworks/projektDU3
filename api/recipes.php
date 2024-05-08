<?php

require_once ("functions.php");

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

if ($requestMethod == "GET") {
    send(200, $recipes);
}
else if ($requestMethod == "POST") {
    $nextId = count($recipes) + 1; 
    $postData = json_decode(file_get_contents("php://input"), true);

    $imageData = $postData["picture"];
    list($type, $imageData) = explode(';', $imageData);
    list(, $imageData)      = explode(',', $imageData);
    $imageData = base64_decode($imageData);
    $imageName = "recipe_" . $nextId . ".png";

    $imagePath = "../media/images/" . $imageName;
    file_put_contents($imagePath, $imageData);

    $newRecipe = [
        "id" => $nextId,
        "name" => $postData["name"],
        "time" => $postData["time"],
        "rating" => $postData["rating"],
        "toDo" => $postData["toDo"],
        "ingredients" => $postData["ingredients"],
        "picture" => $imagePath 
    ];   
    $recipes[] = $newRecipe; 
    file_put_contents($fileName, json_encode($recipes, JSON_PRETTY_PRINT));
    send(201, $newRecipe);
}
?>