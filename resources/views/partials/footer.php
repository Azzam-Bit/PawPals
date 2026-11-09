<?php
/**
 * Footer bersama.
 *
 * @var array<string, mixed> $site
 */
$footer = $site['footer'];
$newsletter = $footer['newsletter'];
?>
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo">
                        <span class="logo-icon">🐾</span>
                        <span class="logo-text"><?= e($site['name']) ?></span>
                    </div>
                    <p><?= e($footer['description']) ?></p>
                    <div class="footer-social">
<?php foreach ($footer['social'] as $social): ?>
                        <span class="footer-link-pending" title="Segera hadir"><span aria-hidden="true"><?= e($social['emoji']) ?></span><span class="visually-hidden"><?= e($social['label']) ?> (segera hadir)</span></span>
<?php endforeach; ?>
                    </div>
                </div>
                <div class="footer-links">
                    <h2>Jelajahi</h2>
                    <ul>
<?php foreach ($site['nav'] as $item): ?>
                        <li><a href="<?= e($item['href']) ?>"><?= e($item['label']) ?></a></li>
<?php endforeach; ?>
                    </ul>
                </div>
                <div class="footer-links">
                    <h2>Bantuan</h2>
                    <ul>
<?php foreach ($footer['help'] as $link): ?>
<?php if (!empty($link['pending'])): ?>
                        <li><span class="footer-link-pending" title="Segera hadir"><?= e($link['label']) ?><span class="visually-hidden"> (segera hadir)</span></span></li>
<?php else: ?>
                        <li><a href="<?= e($link['href']) ?>"><?= e($link['label']) ?></a></li>
<?php endif; ?>
<?php endforeach; ?>
                    </ul>
                </div>
                <div class="footer-newsletter">
                    <h2><?= e($newsletter['heading']) ?></h2>
                    <p><?= e($newsletter['text']) ?></p>
                    <p class="footer-demo-note"><?= e($newsletter['demo_note']) ?></p>
                    <form id="newsletterForm" novalidate>
                        <label for="newsletterEmail" class="visually-hidden"><?= e($newsletter['label']) ?></label>
                        <input type="email" id="newsletterEmail" name="newsletterEmail" placeholder="<?= e($newsletter['placeholder']) ?>" autocomplete="email" required aria-required="true" aria-describedby="newsletterStatus" />
                        <button type="submit" class="btn btn-primary"><?= e($newsletter['button']) ?></button>
                    </form>
                    <p class="footer-form-status" id="newsletterStatus" role="status" aria-live="polite"></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?= date('Y') ?> <?= e($site['name']) ?>. <?= e($footer['copyright']) ?></p>
            </div>
        </div>
    </footer>
