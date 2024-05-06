<?php
$users = json_decode(file_get_contents('users.json'), true);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


if (isset($request->username) && isset($request->password)) {

    $newUser = [
        'id' => count($users) + 1, 
        'username' => $request->username,
        'password' => $request->password,
        'favorites' => [] 
    ];

    $users[] = $newUser;

    file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode(['message' => 'Användare skapad']);
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Användarnamn och lösenord krävs']);
}
?>