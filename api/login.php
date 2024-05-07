<?php

$users = json_decode(file_get_contents('users.json'), true);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($request->username) && isset($request->password)) {
    foreach ($users as $user) {
        if ($user['username'] === $request->username && $user['password'] === $request->password) {
            // Generera en unik token
            $token = bin2hex(random_bytes(16));
            // Spara användar-ID:t
            $user_id = $user['id'];

            // Skicka tillbaka en respons med token och användar-ID
            http_response_code(200);
            echo json_encode(['token' => $token, 'id' => $user_id]);
            return;
        }
    }

    // Om ingen matchande användare hittades, skicka felmeddelande
    http_response_code(401);
    echo json_encode(['message' => 'Denna användare finns inte']);
} else {
    // Om användarnamn eller lösenord saknas, skicka felmeddelande
    http_response_code(400);
    echo json_encode(['message' => 'Användarnamn och lösenord krävs']);
}
?>