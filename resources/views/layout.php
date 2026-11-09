<?php
/**
 * Layout bersama: head, header, isi halaman, footer, script.
 *
 * @var string $page
 * @var string $title
 * @var string $description
 * @var array<string, mixed> $site
 * @var array<int, array<string, mixed>> $pets
 */
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= e($site['name']) ?> · <?= e($title) ?></title>
    <meta name="description" content="<?= e($description) ?>" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/style.css" />
    <script src="assets/js/theme-boot.js"></script>
</head>
<body>
<?php include __DIR__ . '/partials/header.php'; ?>
    <main>
<?php include __DIR__ . '/pages/' . $page . '.php'; ?>
    </main>

<?php include __DIR__ . '/partials/footer.php'; ?>
    <script>
        window.PAWPALS_DATA = <?= json_encode(
            ['pets' => $pets],
            JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE
        ) ?>;
    </script>
    <script src="assets/js/script.js"></script>
</body>
</html>
