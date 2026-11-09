<?php

declare(strict_types=1);

$site = require __DIR__ . '/../app/bootstrap.php';

echo App\Support\View::render('about', [
    'site' => $site,
    'title' => 'Tentang',
    'description' => 'Misi, profil, dan nilai PawPals: komunitas pencinta hewan yang mengurangi jumlah hewan terlantar melalui adopsi yang bertanggung jawab.',
]);
