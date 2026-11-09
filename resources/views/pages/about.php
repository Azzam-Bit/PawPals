<?php
/**
 * Tentang PawPals.
 */
$values = [
    ['icon' => '❤️', 'title' => 'Cinta', 'text' => 'Setiap hewan diperlakukan dengan kasih sayang.'],
    ['icon' => '🤝', 'title' => 'Integritas', 'text' => 'Proses adopsi transparan dan bertanggung jawab.'],
    ['icon' => '🌱', 'title' => 'Keberlanjutan', 'text' => 'Komitmen jangka panjang untuk kesejahteraan hewan.'],
];
?>
        <section class="hero hero-compact">
            <div class="container">
                <div class="about-intro">
                    <span class="hero-badge">🐾 Tentang Kami</span>
                    <h1 class="about-title">Misi <span class="highlight">PawPals</span></h1>
                    <p class="about-lead">
                        Kami adalah komunitas pecinta hewan yang berdedikasi untuk menemukan rumah yang penuh kasih bagi hewan-hewan yang membutuhkan.
                    </p>
                </div>
            </div>
        </section>

        <section class="about-body">
            <div class="container">
                <div class="about-split">
                    <div>
                        <h2 class="about-heading">Setiap hewan <span class="highlight">berhak</span> bahagia</h2>
                        <p class="about-text">
                            PawPals didirikan pada tahun 2025 dengan tujuan sederhana: mengurangi jumlah hewan terlantar dan meningkatkan kesadaran akan pentingnya adopsi. Kami bekerja sama dengan berbagai shelter dan relawan untuk memastikan setiap hewan mendapatkan perawatan yang layak sebelum diadopsi.
                        </p>
                        <p class="about-text">
                            Hingga saat ini, lebih dari 150 hewan telah berhasil kami pertemukan dengan keluarga baru. Kami percaya bahwa setiap ekor hewan memiliki keunikan dan layak untuk dicintai.
                        </p>
                        <a href="pets.php" class="btn btn-primary about-cta">Lihat Hewan Tersedia</a>
                    </div>
                    <div class="about-panel">
                        <span class="about-panel-emoji">🐕🐈🐇</span>
                        <p class="about-panel-label">150+ adopsi bahagia</p>
                    </div>
                </div>

                <div class="about-values">
                    <h2 class="about-values-title">Nilai <span class="highlight">Kami</span></h2>
                    <div class="about-values-grid">
<?php foreach ($values as $value): ?>
                        <div class="value-card">
                            <span class="value-icon"><?= e($value['icon']) ?></span>
                            <h3 class="value-title"><?= e($value['title']) ?></h3>
                            <p class="value-text"><?= e($value['text']) ?></p>
                        </div>
<?php endforeach; ?>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta">
            <div class="container cta-box">
                <h2>Bergabunglah dengan <span class="highlight">Kami</span></h2>
                <p>Jadilah bagian dari perubahan. Dukung kami atau adopsi hewan hari ini.</p>
                <a href="adopt.php" class="btn btn-primary">Mulai Adopsi →</a>
            </div>
        </section>
