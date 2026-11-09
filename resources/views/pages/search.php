        <section class="page-pad-sm">
            <div class="container">
                <div class="search-head">
                    <h1>Cari <span class="highlight">Hewan</span></h1>
                    <p class="search-lead">Temukan hewan impianmu berdasarkan nama, jenis, atau usia.</p>
                    <form id="searchForm" class="search-bar" role="search">
                        <label for="searchInput" class="visually-hidden">Kata kunci pencarian hewan</label>
                        <input type="search" id="searchInput" name="q" placeholder="Cari hewan..." autocomplete="off" />
                        <button type="submit" id="searchButton" class="btn btn-primary">Cari</button>
                    </form>
                    <div class="search-filters" role="group" aria-label="Saring menurut jenis hewan">
                        <button type="button" class="btn btn-secondary" data-filter="all">Semua</button>
<?php foreach (App\Data\PetRepository::types() as $type): ?>
                        <button type="button" class="btn btn-secondary" data-filter="<?= e($type['slug']) ?>"><span aria-hidden="true"><?= e($type['emoji']) ?></span> <?= e($type['label']) ?></button>
<?php endforeach; ?>
                    </div>
                    <p class="form-hint" id="searchSummary" role="status" aria-live="polite"></p>
                </div>
                <div class="pets-grid" id="searchResults">
                    <!-- diisi oleh js/script.js -->
                </div>
                <div id="noResults" class="no-results" hidden>
                    <span aria-hidden="true">&#128269;</span>
                    <p>Tidak ada hewan yang ditemukan. Coba kata kunci lain.</p>
                </div>
            </div>
        </section>
