<?php
/**
 * Header + navigasi bersama.
 *
 * @var array<string, mixed> $site
 * @var string $page
 */
?>
    <header>
        <div class="container nav-container">
            <div class="header-left">
                <div class="logo">
                    <a href="index.php">
                        <span class="logo-icon">🐾</span>
                        <span class="logo-text"><?= e($site['name']) ?></span>
                    </a>
                </div>
                <button class="theme-toggle" type="button" aria-pressed="false" aria-label="Aktifkan Night Mode" title="Night Mode">
                    <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                    </svg>
                    <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" width="19" height="19" fill="currentColor" stroke="none" aria-hidden="true">
                        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                    </svg>
                </button>
            </div>
            <nav>
                <ul class="nav-links" id="navLinks">
<?php foreach ($site['nav'] as $item): ?>
<?php
    $classes = [];
    if ($page === $item['key']) {
        $classes[] = 'active';
    }
    if (!empty($item['cta'])) {
        $classes[] = 'nav-cta';
    }
    $classAttr = $classes === [] ? '' : ' class="' . implode(' ', $classes) . '"';
?>
                    <li><a href="<?= e($item['href']) ?>"<?= $classAttr ?>><?= e($item['label']) ?></a></li>
<?php endforeach; ?>
                </ul>
                <button class="nav-toggle" type="button" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="navLinks">
                    <span></span><span></span><span></span>
                </button>
            </nav>
        </div>
    </header>
