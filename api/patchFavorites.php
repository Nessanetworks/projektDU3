<?php

function send($status = 200, $data = []) {
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit();
}

// Load users data from JSON file
$usersData = json_decode(file_get_contents('users.json'), true);
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    // Get the request body
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Check if the required data is provided
    if (isset($requestData['id']) && isset($requestData['userId'])) {
        $id = $requestData['id'];
        $userId = $requestData['userId'];

        // Read existing users data from JSON file
        $usersData = json_decode(file_get_contents('users.json'), true);

        // Find the user by userId
        $userIndex = array_search($userId, array_column($usersData, 'id'));

        if ($userIndex !== false) {
            // Ensure 'favorites' is always an array
            if (!is_array($usersData[$userIndex]['favorites'])) {
                // If 'favorites' is not an array, initialize it as an empty array
                $usersData[$userIndex]['favorites'] = [];
            }

            // Check if the id is not already in favorites
            if (!in_array($id, $usersData[$userIndex]['favorites'])) {
                // Add the id to the favorites array
                $usersData[$userIndex]['favorites'][] = $id;
            } else {
                // Remove the id from favorites if it already exists
                $key = array_search($id, $usersData[$userIndex]['favorites']);
                if ($key !== false) {
                    unset($usersData[$userIndex]['favorites'][$key]);
                }
            }

            // Save the updated users data back to the JSON file
            file_put_contents('users.json', json_encode($usersData, JSON_PRETTY_PRINT));
            // Send a success response
            send(200, ['message' => 'Favorite updated successfully']);
        } else {
            // Send a not found response if the user is not found
            send(404, ['error' => 'User not found']);
        }
    } else {
        // Send a bad request response if required data is missing
        send(400, ['error' => 'Missing id, userId, or filled in request']);
    }
} else {
    // Send a method not allowed response for other request methods
    send(405, ['error' => 'Method Not Allowed']);
}



?>
