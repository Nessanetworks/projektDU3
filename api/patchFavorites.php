<?php

function send($status = 200, $data = []) {
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit();
}

// Load users data from JSON file
$usersData = json_decode(file_get_contents('users.json'), true);

// Check if the request method is PATCH
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    // Get the request body
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Check if the required data is provided
    if (isset($requestData['id']) && isset($requestData['userId'])) {
        $id = $requestData['id'];
        $userId = $requestData['userId'];

        // Find the user by userId
        $userIndex = array_search($userId, array_column($usersData, 'id'));

        if ($userIndex !== false) {
            // Check if the id is not already in favorites
            if (!in_array($id, $usersData[$userIndex]['favorites'])) {
                // Add the id to the favorites array
                $usersData[$userIndex]['favorites'][] = $id;

                // Save the updated users data back to the JSON file
                file_put_contents('users.json', json_encode($usersData, JSON_PRETTY_PRINT));

                // Send a success response
                send(200, ['message' => 'Favorite updated successfully']);
            } else {
                // Send a conflict response if the id is already in favorites
                send(409, ['error' => 'ID already exists in favorites']);
            }
        } else {
            // Send a not found response if the user is not found
            send(404, ['error' => 'User not found']);
        }
    } else {
        // Send a bad request response if required data is missing
        send(400, ['error' => 'Missing id or userId in request']);
    }
} else {
    // Send a method not allowed response for other request methods
    send(405, ['error' => 'Method Not Allowed']);
}

?>
