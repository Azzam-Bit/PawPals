<?php
/**
 * Beranda.
 *
 * @var array<string, mixed> $site
 */
?>
        <section class="hero">
            <div class="container hero-grid">
                <div class="hero-text">
                    <span class="hero-badge">🐶 Temukan sahabat sejati</span>
                    <h1>Setiap ekor <br />layak <span class="highlight">dicintai</span></h1>
                    <p>PawPals menghubungkan hewan-hewan yang membutuhkan rumah dengan orang-orang penuh kasih. Mulai petualangan adopsimu hari ini.</p>
                    <div class="hero-actions">
                        <a href="pets.php" class="btn btn-primary">Lihat Hewan</a>
                        <a href="about.php" class="btn btn-secondary">Pelajari</a>
                    </div>
                    <div class="hero-stats">
<?php foreach ($site['stats'] as $stat): ?>
                        <div><span><?= e($stat['value']) ?></span> <?= e($stat['label']) ?></div>
<?php endforeach; ?>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="hero-illustration">
                        <span>🐕</span>
                        <span>🐈</span>
                        <span>🐇</span>
                        <span>🐹</span>
                        <span>🐦</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="featured">
            <div class="container">
                <div class="section-header">
                    <h2>Hewan <span class="highlight">Tersedia</span></h2>
                    <p>Temukan teman berbulu yang menunggu untuk membawa kebahagiaan ke rumahmu</p>
                </div>
                <div class="pets-grid" id="featuredGrid">
                    <!-- diisi oleh JS -->
                </div>
                <div class="section-footer">
                    <a href="pets.php" class="btn btn-primary">Lihat Semua Hewan →</a>
                </div>
            </div>
        </section>

        <section class="testimonials">
            <div class="container">
                <div class="section-header">
                    <h2>Cerita <span class="highlight">Bahagia</span></h2>
                    <p>Dengar langsung dari mereka yang telah menemukan sahabat melalui PawPals</p>
                </div>
                <div class="testimonial-grid">
<?php foreach ($site['testimonials'] as $testimonial): ?>
                    <div class="testimonial-card">
                        <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p>"<?= e($testimonial['quote']) ?>"</p>
                        <div class="testimonial-author">
                            <span class="author-avatar"><?= e($testimonial['avatar']) ?></span>
                            <div><strong><?= e($testimonial['name']) ?></strong><span><?= e($testimonial['note']) ?></span></div>
                        </div>
                    </div>
<?php endforeach; ?>
                </div>
            </div>
        </section>

        <section class="cta">
            <div class="container cta-box">
                <h2>Siap memberi <span class="highlight">rumah</span> baru?</h2>
                <p>Setiap hewan layak mendapatkan keluarga yang penuh cinta. Mulai proses adopsimu sekarang.</p>
                <a href="adopt.php" class="btn btn-primary">Mulai Adopsi →</a>
            </div>
        </section>
