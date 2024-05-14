<?php
function send($status = 200, $data = []) {
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit();
}


$input = json_decode(file_get_contents('php://input'), true);
$userId = $input['userId'] ?? null;  // Fetching userId from request
$recipeId = $input['recipeId'] ?? null;
$rating = $input['rating'] ?? null;

// Validate the presence of all required parameters
if (is_null($userId) || is_null($recipeId) || is_null($rating)) {
    send(400, ['error' => 'Missing required fields']);
}

// Validate that the rating is within the expected range (1-5)
if ($rating < 1 || $rating > 5) {
    send(400, ['error' => 'Invalid rating value']);
}

// Path to the recipes.json file
$filename = 'recipes.json';
if (!file_exists($filename)) {
    send(500, ['error' => 'Recipes data file not found']);
}

$recipes = json_decode(file_get_contents($filename), true);
$found = false;
$updatedRecipe = null; 

foreach ($recipes as &$recipe) {
    if ($recipe['id'] == $recipeId) {
        if (isset($recipe['totalRatings'], $recipe['ratingCount'])) {
            $recipe['totalRatings'] += $rating;
            $recipe['ratingCount']++;
            $recipe['rating'] = round($recipe['totalRatings'] / $recipe['ratingCount']);
        } else {
            $recipe['totalRatings'] = $rating;
            $recipe['ratingCount'] = 1;
            $recipe['rating'] = $rating;
        }
        $updatedRecipe = ['id' => $recipe['id'], 'rating' => $recipe['rating']];
        $found = true;
        break;
    }
}

if (!$found) {
    send(404, ['error' => 'Recipe not found']);
}

// Write the updated recipes back to the file
if (file_put_contents($filename, json_encode($recipes, JSON_PRETTY_PRINT)) === false) {
    send(500, ['error' => 'Failed to update the data file']);
}

// Return only the updated recipe's rating
send(200, ['recipe' => $updatedRecipe]);
?>

