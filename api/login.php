<?php
$users = json_decode(file_get_contents('users.json'), true);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($request->username) && isset($request->password)) {
    if (!empty($request->username) && !empty($request->password)) {
        foreach ($users as $user) {
            if ($user['username'] === $request->username && $user['password'] === $request->password) {
                $token = bin2hex(random_bytes(16));
                $user_id = $user['id'];

                http_response_code(200);
                echo json_encode(['token' => $token, 'id' => $user_id]);
                return;
            }
        }
        http_response_code(401);
        echo json_encode(['message' => 'Denna användare finns inte']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Användarnamn och lösenord krävs']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Användarnamn och lösenord krävs']);
}
?>