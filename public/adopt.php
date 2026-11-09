<?php

declare(strict_types=1);

$site = require __DIR__ . '/../app/bootstrap.php';

echo App\Support\View::render('adopt', [
    'site' => $site,
    'title' => 'Adopsi',
    'description' => 'Formulir adopsi PawPals. Pilih hewan yang diinginkan dan isi data diri Anda. Catatan: situs ini masih mode demo, data divalidasi di browser tanpa dikirim ke server.',
]);
