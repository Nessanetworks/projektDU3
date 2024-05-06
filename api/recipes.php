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
else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lägg till ett nytt recept i databasen

    // Generera ID för det nya receptet
    $nextId = count($recipes) + 1; // Nästkommande ID

    // Hämta data från POST-förfrågan
    $postData = json_decode(file_get_contents("php://input"), true);

    // Skapa det nya receptobjektet med det tilldelade ID:t
    $newRecipe = [
        "id" => $nextId,
        "name" => $postData["name"],
        "time" => $postData["time"],
        "rating" => $postData["rating"],
        "toDo" => $postData["toDo"],
        "ingredients" => $postData["ingredients"]
    ];

    // Lägg till det nya receptet i databasen
    $recipes[] = $newRecipe;

    // Spara databasen till filen
    file_put_contents($fileName, json_encode($recipes, JSON_PRETTY_PRINT));

    // Returnera respons med det nya receptet inklusive ID:t
    send(201, $newRecipe);
}






























    /*if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $recipeKeys = ["name", "time", "rating", "ingredients", "toDo"];

    if (requestContainsAllKeys($requestData, $recipeKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = getUserFromToken($requestData["token"]);

//     // Make sure that the creator (user_id) is the same as the owner of the token
//     if ($user == false) {
//         abort(400, "Bad Request (invalid token)");
//     }

    $recipe = findItemByKey("name", $requestData["name"]);
 
    if ($recipe != false) {
        abort(400, "Bad Request (recipe already exists)");
    }

    $recipeKeys[] = "id";
    $requestData["id"] = $user["id"];
    $newRecipe = insertItem($recipeKeys, $requestData);
    send(201, $newRecipe);
    }*/
?>