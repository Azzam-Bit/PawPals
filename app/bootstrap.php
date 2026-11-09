<?php

declare(strict_types=1);

/**
 * Bootstrap aplikasi. Direquire sekali oleh setiap entry point di public/.
 * Mengembalikan array konfigurasi situs.
 */

define('BASE_PATH', dirname(__DIR__));

spl_autoload_register(static function (string $class): void {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $path = BASE_PATH . '/app/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
    if (is_file($path)) {
        require $path;
    }
});

if (!function_exists('e')) {
    /** Escape untuk konteks HTML. */
    function e(mixed $value): string
    {
        return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}

$config = require BASE_PATH . '/config/site.php';

date_default_timezone_set($config['timezone']);

return $config;
