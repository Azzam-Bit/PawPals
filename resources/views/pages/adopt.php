        <section class="page-pad">
            <div class="container">
                <div class="form-narrow">
                    <div class="section-header">
                        <h1>Formulir <span class="highlight">Adopsi</span></h1>
                        <p>Isi data diri Anda dengan benar agar kami dapat memproses permohonan adopsi.</p>
                    </div>

                    <!-- Jujur soal status proyek: belum ada backend -->
                    <p class="demo-notice">
                        <span aria-hidden="true">&#9432;&#65039;</span>
                        <span><strong>Mode demo.</strong> PawPals saat ini berjalan sepenuhnya di browser &mdash; belum ada server yang menerima atau menyimpan data. Formulir ini hanya <strong>memvalidasi isian di perangkat Anda</strong> dan tidak mengirim data ke mana pun.</span>
                    </p>

                    <form id="adoptForm" class="form-card" novalidate>
                        <!-- Nama -->
                        <div class="form-field">
                            <label for="fullname" class="form-label">Nama Lengkap <span class="form-required" aria-hidden="true">*</span></label>
                            <input type="text" id="fullname" name="fullname" class="form-control" placeholder="Contoh: Andi Wijaya" autocomplete="name" required aria-required="true" aria-describedby="fullname-error" />
                            <p class="form-error" id="fullname-error" hidden></p>
                        </div>

                        <!-- Email -->
                        <div class="form-field">
                            <label for="email" class="form-label">Alamat Email <span class="form-required" aria-hidden="true">*</span></label>
                            <input type="email" id="email" name="email" class="form-control" placeholder="email@example.com" autocomplete="email" inputmode="email" required aria-required="true" aria-describedby="email-error" />
                            <p class="form-error" id="email-error" hidden></p>
                        </div>

                        <!-- Telepon -->
                        <div class="form-field">
                            <label for="phone" class="form-label">Nomor Telepon <span class="form-required" aria-hidden="true">*</span></label>
                            <input type="tel" id="phone" name="phone" class="form-control" placeholder="0812-3456-7890" autocomplete="tel" inputmode="tel" required aria-required="true" aria-describedby="phone-help phone-error" />
                            <p class="form-hint" id="phone-help">Format bebas, boleh nomor lokal maupun internasional, contoh +62 812 3456 7890.</p>
                            <p class="form-error" id="phone-error" hidden></p>
                        </div>

                        <!-- ===== PILIHAN HEWAN (fieldset + radio semantik) ===== -->
                        <fieldset class="form-field pet-picker" aria-describedby="petSelectionFeedback petChoice-error">
                            <legend class="form-label">&#128062; Pilih Hewan yang Diinginkan <span class="form-required" aria-hidden="true">*</span></legend>
                            <div class="pet-picker-grid" id="petSelection">
                                <!-- diisi js/script.js sebagai input[radio] + label kartu -->
                            </div>
                            <p class="form-hint" id="petSelectionFeedback" role="status"></p>
                            <p class="form-error" id="petChoice-error" hidden></p>
                        </fieldset>

                        <!-- ===== INPUT TAMBAHAN (hanya saat opsi "Lainnya" dipilih) ===== -->
                        <div class="form-field other-fields" id="otherPetFields" hidden>
                            <p class="other-fields-title">Detail hewan pilihan Anda</p>

                            <div class="form-field">
                                <label for="otherPetName" class="form-label">Nama atau ciri hewan <span class="form-required" aria-hidden="true">*</span></label>
                                <input type="text" id="otherPetName" name="otherPetName" class="form-control" placeholder="Contoh: Kucing Persia" aria-describedby="otherPetName-error" />
                                <p class="form-error" id="otherPetName-error" hidden></p>
                            </div>

                            <div class="form-field">
                                <label for="otherPetType" class="form-label">Jenis atau ras <span class="form-optional">(opsional)</span></label>
                                <input type="text" id="otherPetType" name="otherPetType" class="form-control" placeholder="Contoh: Persia" aria-describedby="otherPetType-error" />
                                <p class="form-error" id="otherPetType-error" hidden></p>
                            </div>
                        </div>

                        <!-- Pesan tambahan -->
                        <div class="form-field">
                            <label for="message" class="form-label">Pesan Tambahan <span class="form-optional">(opsional)</span></label>
                            <textarea id="message" name="message" class="form-control" rows="4" placeholder="Ceritakan tentang rumah dan keluarga Anda..."></textarea>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary" id="adoptSubmit">Validasi Permohonan</button>
                            <button type="reset" class="btn btn-secondary">Reset</button>
                        </div>

                        <p class="form-status" id="adoptStatus" role="status" aria-live="polite"></p>
                    </form>
                </div>
            </div>
        </section>
