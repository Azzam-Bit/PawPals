<?php

declare(strict_types=1);

$site = require __DIR__ . '/../app/bootstrap.php';

echo App\Support\View::render('search', [
    'site' => $site,
    'title' => 'Cari Hewan',
    'description' => 'Cari hewan yang ingin kamu adopsi berdasarkan nama, jenis, atau usia, lengkap dengan filter cepat anjing, kucing, kelinci, hamster, dan burung.',
]);
