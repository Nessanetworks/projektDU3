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
else if ($requestMethod == "POST") // Create a new recipe (token required)
{
    if (empty($requestData)) {
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
}
else if ($requestMethod == "PATCH") // Patch a recipe (token required)
{
    $usersPatch = json_decode(file_get_contents('users.json'), true);

    // Function to authenticate the user based on the token
    function authenticateUser($token) {
        global $usersPatch;
        foreach ($usersPatch as $user) {
            if ($user['token'] === $token) {
                // Authentication successful
                return true;
            }
        }
        // Authentication failed
        return false;
    }

    // Retrieve data from the request
    $request_body = file_get_contents('php://input');
    $dataPatch = json_decode($request_body, true);

    var_dump($dataPatch);

    // Check if required data is present
    if (!isset($dataPatch['id']) || !isset($dataPatch['token'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Missing required data"));
        exit();
    }

    // Your authentication logic here to verify the token
    $authenticated = authenticateUser($dataPatch['token']);
    if (!$authenticated) {
        http_response_code(401);
        echo json_encode(array("error" => "Unauthorized"));
        exit();
    }

    // Your patch logic here
    $id = $dataPatch['id'];

    // Find the user in the $usersPatch array based on the token
    foreach ($usersPatch as &$user) {
        // if ($user['token'] === $dataPatch['token']) {
            // Append the ID to the favorites array
            $user['favorites'][] = $id;
            break; // Stop looping once the user is found and updated
        // }
    }

    // Save the updated user data back to the file (if needed)

    // Sending a response
    http_response_code(200);
    echo json_encode(array("success" => true));
}
else {
    // If the request method is not GET, POST, or PATCH
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
    exit();
}

    ?>