<?php

function send($status = 200, $data = [])
{
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function abort($status = 400, $message = "")
{
    send($status, ["error" => $message]);
}

function getRequestData()
{
    if ($_SERVER["CONTENT_TYPE"] != "application/json") {
        abort(400, "Bad Request (invalid content type)");
    }

    $json = file_get_contents("php://input");
    return json_decode($json, true);
}

function getDatabase()
{
    // Incase the database does not exist, or is empty, we'll default to this
    $emptyDatabaseTemplate = json_encode([
        "recipes" => []
    ], JSON_PRETTY_PRINT);

    if (file_exists("recipes.json") == false) {
        file_put_contents("recipes.json", $emptyDatabaseTemplate);
    }

    $databaseContents = file_get_contents("recipes.json");

    if ($databaseContents == "") {
        file_put_contents("recipes.json", $emptyDatabaseTemplate);
    }
    
    $databaseContents = file_get_contents("recipes.json");
    $databaseData = json_decode($databaseContents, true);
    
    if (is_array($databaseData) == false) {
        abort(500, "Internal Server Error (invalid database)");
    }

    return $databaseData;
}

// function getDatabaseByType($type)
// {
//     $database = getDatabase();

//     /*if (isset($database[$type]) == false) {
//         abort(500, "Internal Server Error (database type '$type' does not exist)");
//     }*/

//     return $database[$type];
// }

function requestContainsAllKeys($data, $keys)
{
    foreach ($keys as $key) {
        if (isset($data[$key]) == false) {
            return false;
        }
    }

    return true;
}

function requestContainsSomeKey($data, $keys)
{
    foreach ($keys as $key) {
        if (isset($data[$key])) {
            return true;
        }
    }

    return false;
}

function findItemByKey($key, $value)
{
    $database = getDatabase();
    
    if (isset($database) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    // $databaseByType = $database[$type];

    foreach ($database as $item) {
        if (isset($item[$key]) && $item[$key] == $value) {
            return $item;
        }
    }

    return false;
}

function insertItem($keys, $data)
{
    $database = getDatabase();
    
    // if (isset($database[$type]) == false) {
    //     abort(500, "Internal Server Error (database type '$type' does not exist)");
    // }

    // $databaseByType = $database[$type];

    $newItem = [];

    foreach ($keys as $key) {
        if ($key == "token") {
            continue;
        }
        $newItem[$key] = $data[$key];
    }

    $id = 0;

    foreach ($database as $item) {
        if (isset($item["id"]) && $item["id"] > $id) {
            $id = $item["id"];
        }
    }

    $newItem["id"] = $id + 1;
    $databaseByType[] = $newItem;
    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $newItem;
}

function updateItemByType($type, $updatedItem)
{
    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    foreach ($databaseByType as $index => $item) {
        if (isset($item["id"]) && $item["id"] == $updatedItem["id"]) {
            $databaseByType[$index] = $updatedItem;
        }
    }

    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $updatedItem;
}

function deleteItemByType($type, $itemToDelete)
{
    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    foreach ($databaseByType as $index => $item) {
        if (isset($item["id"]) && $item["id"] == $itemToDelete["id"]) {
            array_splice($databaseByType, $index, 1);
        }
    }

    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $itemToDelete;
}

function getUserFromToken($requestToken)
{
    $database = getDatabase();
    $type = "users";
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $users = $database[$type];

    foreach ($users as $user) {
        if (isset($user["name"], $user["password"])) {
            $name = $user["name"];
            $password = $user["password"];

            $userToken = sha1("$name$password");

            if ($requestToken == $userToken) {
                return $user;
            }
        }
    }

    return false;
}

function removeUserGamesCharactersAndLikes($user)
{
    $database = getDatabase();

    if (isset($database["games"]) == false) {
        abort(500, "Internal Server Error (database type 'games' does not exist)");
    }

    if (isset($database["characters"]) == false) {
        abort(500, "Internal Server Error (database type 'characters' does not exist)");
    }

    $games = $database["games"];
    $characters = $database["characters"];
    $userId = $user["id"];

    foreach ($games as $gameIndex => $game) {
        // If the user created the game, remove it completely
        if ($game["user_id"] == $userId) {
            array_slice($games, $gameIndex, 1);
        } else {
            // Otherwise we'll see if they liked it and only remove their like
            foreach ($game["likes"] as $likeIndex => $like) { 
                // Remember that each like is represented as a user_id
                if ($userId == $like) {
                    array_slice($game["likes"], $likeIndex, 1);
                    $game[$gameIndex] = $game;
                }
            }
        }
    }

    foreach ($characters as $characterIndex => $character) {
        // If the user created the character, remove it completely
        if ($character["user_id"] == $userId) {
            array_slice($characters, $characterIndex, 1);
        } else {
            // Otherwise we'll see if they liked it and only remove their like
            foreach ($character["likes"] as $likeIndex => $like) {
                // Remember that each like is represented as a user_id
                if ($userId == $like) {
                    array_slice($character["likes"], $likeIndex, 1);
                    $character[$characterIndex] = $game;
                }
            }
        }
        
    }
}



?>
