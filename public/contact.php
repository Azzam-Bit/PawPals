<?php

declare(strict_types=1);

$site = require __DIR__ . '/../app/bootstrap.php';

echo App\Support\View::render('contact', [
    'site' => $site,
    'title' => 'Hubungi Kami',
    'description' => 'Hubungi PawPals untuk pertanyaan atau saran. Lihat informasi kontak dan isi formulir pesan kami. Catatan: situs ini masih mode demo tanpa backend.',
]);
