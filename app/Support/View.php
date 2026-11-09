<?php

declare(strict_types=1);

namespace App\Support;

use App\Data\PetRepository;

/**
 * Renderer template minimal: membungkus satu halaman dengan layout bersama.
 */
final class View
{
    /**
     * @param string $page nama view di resources/views/pages/ sekaligus penanda halaman aktif
     * @param array<string, mixed> $data
     */
    public static function render(string $page, array $data = []): string
    {
        $data['pets'] = PetRepository::all();
        $data['page'] = $page;

        ob_start();
        extract($data, EXTR_SKIP);
        include BASE_PATH . '/resources/views/layout.php';

        return (string) ob_get_clean();
    }
}
