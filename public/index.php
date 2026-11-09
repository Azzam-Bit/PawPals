<?php

declare(strict_types=1);

$site = require __DIR__ . '/../app/bootstrap.php';

echo App\Support\View::render('home', [
    'site' => $site,
    'title' => 'Beranda',
    'description' => 'PawPals menghubungkan hewan-hewan yang membutuhkan rumah dengan orang-orang yang penuh kasih. Temukan dan ajukan adopsi anjing, kucing, kelinci, hamster, dan burung.',
]);
