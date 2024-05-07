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








//session_start(); 


if ($_SERVER['REQUEST_METHOD'] !== 'PATCH') {
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
    exit();
}

if (!isset($_SESSION['token'])) {
    http_response_code(401);
    echo json_encode(array("error" => "Unauthorized"));
    exit();
}


$request_body = file_get_contents('php://input');
$dataPatch = json_decode($request_body, true);


if (!isset($dataPatch['id'])) {
    http_response_code(400);
    echo json_encode(array("error" => "Missing required data"));
    exit();
}


$id = $dataPatch['id'];


foreach ($users as &$user) {
    if ($user['token'] === $_SESSION['token']) {
       
        $user['favorites'][] = $id;
        break;
    }
}


file_put_contents('users.json', json_encode($usersPatch, JSON_PRETTY_PRINT));

http_response_code(200);
echo json_encode(array("success" => true));


?>
