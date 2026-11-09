<?php

declare(strict_types=1);

$site = require __DIR__ . '/../app/bootstrap.php';

echo App\Support\View::render('pets', [
    'site' => $site,
    'title' => 'Hewan',
    'description' => 'Daftar seluruh hewan yang tersedia untuk adopsi di PawPals, lengkap dengan jenis, usia, gender, dan deskripsi masing-masing hewan.',
]);
