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
$patchData = json_decode(file_get_contents("php://input"), true);

$recipes = [];

if (file_exists($fileName)) {
    $json = file_get_contents($fileName);
    $recipes = json_decode($json, true);
}

if ($requestMethod == "GET") {
    //behöver sätta in user_id i varje recept??
    // if (isset($requestData["id"])) {
    //     $id = $requestData["id"];
    //     $recipe = findItemByKey("recipes", "id", $id);
        
    //     if ($recipe == false) {
    //         abort(404, "recipe Not Found");
    //     }
        
    //     send(200, $recipe);
    // }

    // $user = getUserFromToken($requestData["token"]);

    // $recipes = getDatabaseByType("recipes");
    // foreach ($recipes as $index => &$recipe) {
    //     if ($recipe["user_id"] != $user["id"]) {
    //         array_splice($recipes, $index, 1);
    //     }
    // } 
    send(200, $recipes);
}
else if ($requestMethod == "POST") {
    $nextId = count($recipes) + 1; 
    $postData = json_decode(file_get_contents("php://input"), true);
    $newRecipe = [
        "id" => $nextId,
        "name" => $postData["name"],
        "time" => $postData["time"],
        "rating" => $postData["rating"],
        "toDo" => $postData["toDo"],
        "ingredients" => $postData["ingredients"]
    ];   
    $recipes[] = $newRecipe; 
    file_put_contents($fileName, json_encode($recipes, JSON_PRETTY_PRINT));
    send(201, $newRecipe);
}
else if {}

?>
