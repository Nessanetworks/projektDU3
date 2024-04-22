<?php

require_once("helpers.php");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
} else {
    header("Access-Control-Allow-Origin: *");
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestData = getRequestData();

if ($requestMethod == "GET")
{
    if (isset($requestData["id"])) {
        $id = $requestData["id"];
        $game = findItemByKey("games", "id", $id);
        
        if ($game == false) {
            abort(404, "Game Not Found");
        }
        
        send(200, $game);
    }

    $user = getUserFromToken($requestData["token"]);

    $games = getDatabaseByType("games");
    foreach ($games as $index => &$game) {
        if ($game["user_id"] != $user["id"]) {
            array_splice($games, $index, 1);
        }
    }
    send(200, $games);
}
?>

