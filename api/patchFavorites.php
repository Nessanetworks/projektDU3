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
    
    $requestData = json_decode(file_get_contents('php://input'), true);

   
    if (isset($requestData['id']) && isset($requestData['userId'])) {
        $id = $requestData['id'];
        $userId = $requestData['userId'];

       
        $usersData = json_decode(file_get_contents('users.json'), true);

      
        $userIndex = array_search($userId, array_column($usersData, 'id'));

        if ($userIndex !== false) {
           
            if (!is_array($usersData[$userIndex]['favorites'])) {
    
                $usersData[$userIndex]['favorites'] = [];
            }

           
            if (!in_array($id, $usersData[$userIndex]['favorites'])) {
                
                $usersData[$userIndex]['favorites'][] = $id;
            } else {
                $key = array_search($id, $usersData[$userIndex]['favorites']);
                if ($key !== false) {
                    // unset($usersData[$userIndex]['favorites'][$key]);
                    array_splice($usersData[$userIndex]['favorites'], $key, 1);
                }
            }

           
            file_put_contents('users.json', json_encode($usersData, JSON_PRETTY_PRINT));

            send(200, ['message' => 'Favorite updated successfully']);
        } else {
            send(404, ['error' => 'User not found']);
        }
    } else {
        send(400, ['error' => 'Missing id, userId, or filled in request']);
    }
} else {
    send(405, ['error' => 'Method Not Allowed']);
}



?>
