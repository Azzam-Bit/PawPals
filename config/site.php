<?php

declare(strict_types=1);

/**
 * Konfigurasi & konten statis situs.
 * Nilai di sini dipindahkan apa adanya dari markup HTML sebelumnya.
 */

return [
    'name' => 'PawPals',
    'timezone' => 'Asia/Jakarta',

    'nav' => [
        ['key' => 'home', 'label' => 'Beranda', 'href' => 'index.php'],
        ['key' => 'about', 'label' => 'Tentang', 'href' => 'about.php'],
        ['key' => 'pets', 'label' => 'Hewan', 'href' => 'pets.php'],
        ['key' => 'search', 'label' => 'Cari', 'href' => 'search.php'],
        ['key' => 'adopt', 'label' => 'Adopsi', 'href' => 'adopt.php', 'cta' => true],
    ],

    'stats' => [
        ['value' => '150+', 'label' => 'Hewan diadopsi'],
        ['value' => '45', 'label' => 'Hewan tersedia'],
        ['value' => '98%', 'label' => 'Kebahagiaan'],
    ],

    'testimonials' => [
        [
            'quote' => 'Mengadopsi Milo adalah keputusan terbaik kami. PawPals membuat prosesnya begitu mudah dan menyenangkan!',
            'avatar' => '👩',
            'name' => 'Sarah',
            'note' => 'Mengadopsi Milo 🐕',
        ],
        [
            'quote' => 'Luna langsung menjadi bagian dari keluarga kami. Terima kasih PawPals telah mempertemukan kami!',
            'avatar' => '👨',
            'name' => 'Andi',
            'note' => 'Mengadopsi Luna 🐈',
        ],
        [
            'quote' => 'Proses adopsi sangat transparan dan tim PawPals sangat membantu. Kami sangat merekomendasikan!',
            'avatar' => '👩',
            'name' => 'Dewi',
            'note' => 'Mengadopsi Coco 🐇',
        ],
    ],

    'contact' => [
        'email' => 'hello@pawpals.com',
        'phone' => '+62 812 3456 7890',
        'address' => 'Jl. Hewan Bahagia No. 8, Jakarta',
    ],

    'footer' => [
        'description' => 'Menghubungkan hewan-hewan yang membutuhkan dengan orang-orang yang peduli.',
        'copyright' => 'Dibuat dengan ❤️ untuk para pecinta hewan.',
        'social' => [
            ['label' => 'Instagram', 'emoji' => '📷'],
            ['label' => 'Facebook', 'emoji' => '📘'],
            ['label' => 'Twitter', 'emoji' => '🐦'],
            ['label' => 'YouTube', 'emoji' => '▶️'],
        ],
        'help' => [
            ['label' => 'FAQ', 'pending' => true],
            ['label' => 'Syarat & Ketentuan', 'pending' => true],
            ['label' => 'Kebijakan Privasi', 'pending' => true],
            ['label' => 'Hubungi Kami', 'href' => 'contact.php'],
        ],
        'newsletter' => [
            'heading' => 'Tetap Terhubung',
            'text' => 'Dapatkan update hewan-hewan terbaru yang membutuhkan rumah.',
            'demo_note' => 'Mode demo: belum ada layanan berlangganan, jadi alamat email tidak dikirim dan tidak disimpan.',
            'label' => 'Alamat email',
            'placeholder' => 'Alamat email',
            'button' => 'Berlangganan',
        ],
    ],
];
