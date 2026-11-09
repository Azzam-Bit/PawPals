<?php
/**
 * Hubungi Kami.
 *
 * @var array<string, mixed> $site
 */
$contact = $site['contact'];
$contactCards = [
    ['icon' => '&#128231;', 'label' => 'Email', 'value' => $contact['email']],
    ['icon' => '&#128222;', 'label' => 'Telepon', 'value' => $contact['phone']],
    ['icon' => '&#128205;', 'label' => 'Alamat', 'value' => $contact['address']],
];
?>
        <section class="page-pad">
            <div class="container">
                <div class="form-narrow">
                    <div class="section-header">
                        <h1>Hubungi <span class="highlight">Kami</span></h1>
                        <p>Punya pertanyaan atau saran? Kami dengan senang hati mendengarnya.</p>
                    </div>

                    <!-- Jujur soal status proyek: belum ada backend -->
                    <p class="demo-notice">
                        <span aria-hidden="true">&#9432;&#65039;</span>
                        <span><strong>Mode demo.</strong> Belum ada server yang menerima pesan. Formulir di bawah hanya <strong>memvalidasi isian di browser Anda</strong> &mdash; pesan Anda tidak dikirim dan tidak disimpan.</span>
                    </p>

                    <div class="contact-grid">
                        <div class="info-card">
<?php foreach ($contactCards as $card): ?>
                            <h2 class="info-card-title"><?= $card['icon'] ?> <?= e($card['label']) ?></h2>
                            <p class="info-card-text"><?= e($card['value']) ?></p>
<?php endforeach; ?>
                        </div>
                        <div class="info-card">
                            <form id="contactForm" novalidate>
                                <div class="form-field">
                                    <label for="contactName" class="form-label">Nama <span class="form-required" aria-hidden="true">*</span></label>
                                    <input type="text" id="contactName" name="contactName" class="form-control" placeholder="Nama Anda" autocomplete="name" required aria-required="true" aria-describedby="contactName-error" />
                                    <p class="form-error" id="contactName-error" hidden></p>
                                </div>
                                <div class="form-field">
                                    <label for="contactEmail" class="form-label">Email <span class="form-required" aria-hidden="true">*</span></label>
                                    <input type="email" id="contactEmail" name="contactEmail" class="form-control" placeholder="email@example.com" autocomplete="email" inputmode="email" required aria-required="true" aria-describedby="contactEmail-error" />
                                    <p class="form-error" id="contactEmail-error" hidden></p>
                                </div>
                                <div class="form-field">
                                    <label for="contactMessage" class="form-label">Pesan <span class="form-required" aria-hidden="true">*</span></label>
                                    <textarea id="contactMessage" name="contactMessage" class="form-control" rows="4" placeholder="Tulis pesan Anda..." required aria-required="true" aria-describedby="contactMessage-error"></textarea>
                                    <p class="form-error" id="contactMessage-error" hidden></p>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Validasi Pesan</button>
                                <p class="form-status" id="contactStatus" role="status" aria-live="polite"></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
