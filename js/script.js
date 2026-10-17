/* ==========================================================
   PawPals · js/script.js
   Vanilla JavaScript, tanpa dependency.

   Catatan penting
   ---------------
   Project ini 100% frontend. Tidak ada backend, API, atau
   database. Setiap formulir hanya MEMVALIDASI isian di browser
   dan sengaja tidak mengirim maupun menyimpan data pribadi.
   Lihat fungsi submitAdoptionRequest() / submitContactMessage()
   / submitNewsletter() sebagai titik integrasi backend.
   ========================================================== */

// ==========================================
// 1. DATA HEWAN
// ==========================================
const pets = [
    { id: 1, name: 'Milo', type: 'anjing', age: '2 tahun', gender: 'Jantan', description: 'Milo adalah anjing yang ramah dan suka bermain. Cocok untuk keluarga aktif.', image: '🐕', featured: true },
    { id: 2, name: 'Luna', type: 'kucing', age: '1 tahun', gender: 'Betina', description: 'Luna manja dan suka dipeluk. Sangat cocok untuk rumah yang tenang.', image: '🐈', featured: true },
    { id: 3, name: 'Coco', type: 'kelinci', age: '6 bulan', gender: 'Betina', description: 'Coco lucu dan energik. Suka makan wortel dan bermain di rumput.', image: '🐇', featured: true },
    { id: 4, name: 'Bella', type: 'anjing', age: '3 tahun', gender: 'Betina', description: 'Bella setia dan protektif. Sangat cocok untuk keluarga dengan anak.', image: '🐕', featured: true },
    { id: 5, name: 'Max', type: 'kucing', age: '4 tahun', gender: 'Jantan', description: 'Max adalah kucing yang kalem dan mandiri. Suka tidur di tempat tinggi.', image: '🐈', featured: false },
    { id: 6, name: 'Chloe', type: 'hamster', age: '8 bulan', gender: 'Betina', description: 'Chloe mungil dan lincah. Sangat mudah dirawat, cocok untuk pemula.', image: '🐹', featured: false },
    { id: 7, name: 'Charlie', type: 'burung', age: '1,5 tahun', gender: 'Jantan', description: 'Charlie pandai meniru suara dan sangat sosial. Suka berinteraksi dengan manusia.', image: '🐦', featured: false },
    { id: 8, name: 'Lucky', type: 'anjing', age: '5 tahun', gender: 'Jantan', description: 'Lucky adalah anjing senior yang tenang dan penyayang. Suka tidur di pangkuan.', image: '🐕', featured: false }
];

const OTHER_PET_VALUE = 'other';

// ==========================================
// 2. UTILITAS
// ==========================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const byId = (id) => document.getElementById(id);

function capitalize(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function normalizeText(text) {
    return String(text == null ? '' : text).trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Pesan error per field, dikosongkan bila valid. */
function setFieldError(input, message) {
    const errorEl = byId(input ? input.id + '-error' : '');
    if (input) {
        if (message) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
    }
    if (errorEl) {
        errorEl.textContent = message || '';
        errorEl.hidden = !message;
    }
    return Boolean(message);
}

function setStatus(el, text, kind) {
    if (!el) return;
    el.textContent = text || '';
    el.classList.remove('is-success', 'is-error', 'is-info');
    if (kind) el.classList.add('is-' + kind);
}

function clearFormErrors(form) {
    if (!form) return;
    $$('.form-error', form).forEach(el => {
        el.textContent = '';
        el.hidden = true;
    });
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
}

// ---------- Validasi bersama ----------
// Sengaja dibuat longgar agar format nomor valid tidak ikut ditolak.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEmail(value) {
    const v = value.trim();
    if (!v) return 'Alamat email wajib diisi.';
    if (!EMAIL_PATTERN.test(v)) return 'Format email belum benar. Contoh: nama@domain.com';
    return '';
}

function validatePhone(value) {
    const v = value.trim();
    if (!v) return 'Nomor telepon wajib diisi.';
    const digits = v.replace(/\D/g, '');
    if (digits.length < 7) return 'Nomor telepon terlalu pendek, minimal 7 digit.';
    if (digits.length > 15) return 'Nomor telepon terlalu panjang, maksimal 15 digit.';
    return '';
}

function validateRequired(value, label) {
    if (!value.trim()) return label + ' wajib diisi.';
    return '';
}

// ==========================================
// 3. NIGHT MODE
// ==========================================
const THEME_KEY = 'pawpals-theme';

function getSavedTheme() {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        return (saved === 'dark' || saved === 'light') ? saved : null;
    } catch (e) {
        // localStorage bisa diblokir (mode privat, cookie consent, dsb.)
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
        // Penyimpanan tidak tersedia — tema tetap berlaku di halaman ini saja.
    }
}

function getPreferredTheme() {
    const saved = getSavedTheme();
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    if (isDark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    root.style.colorScheme = theme;

    $$('.theme-toggle').forEach(btn => {
        btn.setAttribute('aria-pressed', String(isDark));
        btn.setAttribute('aria-label', isDark ? 'Aktifkan Light Mode' : 'Aktifkan Night Mode');
        btn.title = isDark ? 'Light Mode' : 'Night Mode';
    });
}

function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    root.classList.add('theme-transition');
    setTimeout(() => root.classList.remove('theme-transition'), 400);

    applyTheme(next);
    saveTheme(next);
}

function initTheme() {
    applyTheme(getPreferredTheme());
    $$('.theme-toggle').forEach(btn => btn.addEventListener('click', toggleTheme));

    // Ikuti perubahan pengaturan sistem selama pengguna belum memilih manual.
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = e => {
        if (!getSavedTheme()) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (systemPref.addEventListener) systemPref.addEventListener('change', onSystemChange);
    else if (systemPref.addListener) systemPref.addListener(onSystemChange);
}

// ==========================================
// 4. TOAST NOTIFICATION
// ==========================================
const TOAST_LIMIT = 3;

function ensureToastContainer() {
    let container = byId('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-relevant', 'additions');
        document.body.appendChild(container);
    }
    return container;
}

function closeToast(toast) {
    if (!toast || toast.classList.contains('hide')) return;
    toast.classList.add('hide');
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
}

/**
 * Notifikasi singkat. Dipakai bersama oleh seluruh formulir agar
 * tidak ada notifikasi yang saling bertumpuk.
 * Teks disisipkan lewat textContent (bukan innerHTML) supaya aman.
 */
function showToast(title, message, type = 'info', duration = 5000) {
    const container = ensureToastContainer();

    // Batasi jumlah toast agar tidak menumpuk
    while (container.childElementCount >= TOAST_LIMIT) {
        container.removeChild(container.firstElementChild);
    }

    const icons = { success: '✅', error: '❌', info: '📢', warning: '⚠️' };
    const isUrgent = type === 'error' || type === 'warning';

    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.setAttribute('role', isUrgent ? 'alert' : 'status');
    toast.setAttribute('aria-live', isUrgent ? 'assertive' : 'polite');

    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = icons[type] || '📢';

    const content = document.createElement('div');
    content.className = 'toast-content';

    const titleEl = document.createElement('div');
    titleEl.className = 'toast-title';
    titleEl.textContent = title;

    const msgEl = document.createElement('div');
    msgEl.className = 'toast-message';
    msgEl.textContent = message;

    content.append(titleEl, msgEl);

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', 'Tutup notifikasi');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => closeToast(toast));

    toast.append(icon, content, closeBtn);
    container.appendChild(toast);

    if (duration > 0) setTimeout(() => closeToast(toast), duration);
    return toast;
}

// ==========================================
// 5. RENDER KARTU HEWAN
// ==========================================
/**
 * Membangun kartu hewan dengan DOM API + textContent.
 * Tidak ada interpolasi string ke innerHTML, sehingga data dari
 * sumber mana pun tidak bisa disisipkan sebagai HTML.
 */
function renderPets(petList, containerId) {
    const container = byId(containerId);
    if (!container) return;

    if (petList.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'pets-empty';
        empty.textContent = 'Tidak ada hewan yang ditemukan.';
        container.replaceChildren(empty);
        return;
    }

    const frag = document.createDocumentFragment();

    petList.forEach(pet => {
        const card = document.createElement('article');
        card.className = 'pet-card';

        const emoji = document.createElement('span');
        emoji.className = 'pet-emoji';
        emoji.setAttribute('aria-hidden', 'true');
        emoji.textContent = pet.image;

        // Level heading dipakai h2 agar tidak melompat dari h1
        const name = document.createElement('h2');
        name.className = 'pet-name';
        name.textContent = pet.name;

        const type = document.createElement('p');
        type.className = 'pet-type';
        type.textContent = capitalize(pet.type) + ' · ' + pet.gender;

        const detail = document.createElement('p');
        detail.className = 'pet-detail';
        detail.textContent = pet.age;

        const desc = document.createElement('p');
        desc.className = 'pet-description';
        desc.textContent = pet.description;

        const cta = document.createElement('a');
        cta.className = 'btn btn-primary';
        cta.href = 'adopt.html?pet=' + encodeURIComponent(pet.id);
        cta.textContent = 'Adopsi';
        cta.setAttribute('aria-label', 'Ajukan adopsi untuk ' + pet.name);

        card.append(emoji, name, type, detail, desc, cta);
        frag.appendChild(card);
    });

    container.replaceChildren(frag);
}

// ==========================================
// 6. PILIHAN HEWAN (radio semantik)
// ==========================================
/**
 * Kartu pilihan hewan dibangun sebagai <input type="radio"> +
 * <label>, bukan <div> dengan event klik. Ini memberi navigasi
 * keyboard native (tombol panah / spasi), status terucentang yang
 * bisa dibaca screen reader, dan tetap memakai tampilan kartu
 * yang sama lewat class .pet-option-card.
 */
function renderPetOptions(container) {
    const options = pets.map(pet => ({
        value: String(pet.id),
        name: pet.name,
        type: capitalize(pet.type),
        image: pet.image,
        extra: ', ' + pet.gender + ', ' + pet.age,
        isOther: false
    }));

    options.push({
        value: OTHER_PET_VALUE,
        name: 'Lainnya',
        type: 'Jenis lainnya',
        image: '🐾',
        extra: ', isi detail hewan pada kolom yang muncul',
        isOther: true
    });

    const frag = document.createDocumentFragment();

    options.forEach(opt => {
        const wrap = document.createElement('div');
        wrap.className = 'pet-option';

        const input = document.createElement('input');
        input.type = 'radio';
        input.className = 'pet-option-input';
        input.name = 'petChoice';
        input.id = 'pet-option-' + opt.value;
        input.value = opt.value;

        const label = document.createElement('label');
        label.className = 'pet-option-card';
        label.htmlFor = input.id;

        const emoji = document.createElement('span');
        emoji.className = 'pet-emoji';
        emoji.setAttribute('aria-hidden', 'true');
        emoji.textContent = opt.image;

        const name = document.createElement('span');
        name.className = 'pet-name';
        name.textContent = opt.name;

        const type = document.createElement('span');
        type.className = 'pet-type-label';
        type.textContent = opt.type;

        // Tambahan info hanya untuk pembaca layar
        const srExtra = document.createElement('span');
        srExtra.className = 'visually-hidden';
        srExtra.textContent = opt.extra;

        const check = document.createElement('span');
        check.className = 'pet-check';
        check.setAttribute('aria-hidden', 'true');
        check.textContent = '✓';

        label.append(emoji, name, type, srExtra, check);
        wrap.append(input, label);
        frag.appendChild(wrap);
    });

    container.replaceChildren(frag);
}

/**
 * Mengatur interaksi pemilih hewan: sinkronisasi tampilan,
 * buka/tutup kolom "Lainnya", dan dukungan deep-link ?pet=ID.
 */
function initPetPicker(form) {
    const container = byId('petSelection');
    if (!container) return null;

    renderPetOptions(container);

    const otherFields = byId('otherPetFields');
    const otherName = byId('otherPetName');
    const otherType = byId('otherPetType');
    const feedback = byId('petSelectionFeedback');
    const radios = () => $$('input[name="petChoice"]', container);

    function describe(value) {
        if (!value) return '';
        if (value === OTHER_PET_VALUE) return 'Anda memilih: Lainnya. Isi detail hewan di bawah.';
        const pet = pets.find(p => String(p.id) === value);
        return pet ? 'Anda memilih: ' + pet.name + ' (' + capitalize(pet.type) + ')' : '';
    }

    /** Baca radio yang tercentang lalu perbarui seluruh state turunan. */
    function sync() {
        const checked = radios().find(r => r.checked);
        const value = checked ? checked.value : '';
        const isOther = value === OTHER_PET_VALUE;

        if (otherFields) otherFields.hidden = !isOther;
        if (otherName) {
            otherName.required = isOther;
            otherName.setAttribute('aria-required', String(isOther));
        }

        if (feedback) {
            feedback.textContent = describe(value);
            feedback.style.color = value ? 'var(--cocoa)' : '';
        }

        // Saat berpindah away dari "Lainnya", bersihkan error kolom tersembunyi
        if (!isOther) {
            setFieldError(otherName, '');
            setFieldError(otherType, '');
        }
        return value;
    }

    container.addEventListener('change', sync);

    // Dukungan deep-link dari tombol "Adopsi" di kartu hewan
    const requested = new URLSearchParams(window.location.search).get('pet');
    if (requested) {
        const match = radios().find(r => r.value === String(requested));
        if (match) match.checked = true;
    }

    sync();

    return {
        sync,
        getSelected: () => {
            const checked = radios().find(r => r.checked);
            return checked ? checked.value : '';
        },
        isOtherSelected: () => sync() === OTHER_PET_VALUE,
        radios
    };
}

// ==========================================
// 7. FORMULIR ADOPSI
// ==========================================
/**
 * ENGKEL BACKEND.
 * Sengaja tidak melakukan permintaan jaringan apa pun karena
 * project ini belum punya server. Untuk integrasi nanti, ganti
 * isi fungsi ini dengan fetch() menuju endpoint Anda; seluruh
 * alur form di bawah (validasi, status, anti double-submit)
 * tidak perlu ditulis ulang.
 *
 * @param {object} payload data formulir yang sudah tervalidasi
 * @returns {Promise<{delivered: boolean, note: string}>}
 */
async function submitAdoptionRequest(payload) {
    // Sengaja tidak ada panggilan jaringan pada versi frontend-only ini.
    void payload;
    return {
        delivered: false,
        note: 'Data ini belum dikirim ke server PawPals dan tidak disimpan di browser Anda.'
    };
}

function initAdoptForm() {
    const form = byId('adoptForm');
    if (!form) return;

    const picker = initPetPicker(form);
    const status = byId('adoptStatus');
    const submitBtn = byId('adoptSubmit');

    const fullname = byId('fullname');
    const email = byId('email');
    const phone = byId('phone');
    const message = byId('message');
    const otherName = byId('otherPetName');
    const otherType = byId('otherPetType');

    let submitting = false;

    function validate() {
        let firstInvalid = null;
        const fail = (input, msg) => {
            setFieldError(input, msg);
            if (msg && !firstInvalid) firstInvalid = input;
        };

        fail(fullname, validateRequired(fullname.value, 'Nama lengkap'));
        fail(email, validateEmail(email.value));
        fail(phone, validatePhone(phone.value));

        // Pilihan hewan
        const chosen = picker ? picker.getSelected() : '';
        const choiceError = byId('petChoice-error');
        if (!chosen) {
            if (choiceError) {
                choiceError.textContent = 'Pilih hewan yang ingin diadopsi terlebih dahulu.';
                choiceError.hidden = false;
            }
            if (!firstInvalid) firstInvalid = $('input[name="petChoice"]', form);
        } else if (choiceError) {
            choiceError.textContent = '';
            choiceError.hidden = true;
        }

        // Kolom "Lainnya" hanya wajib ketika opsi itu dipilih
        if (chosen === OTHER_PET_VALUE) {
            fail(otherName, validateRequired(otherName.value, 'Nama atau ciri hewan'));
            fail(otherType, '');
        } else {
            fail(otherName, '');
            fail(otherType, '');
        }

        return firstInvalid;
    }

    // Bersihkan error begitu pengguna mulai memperbaiki isian
    form.addEventListener('input', e => {
        if (e.target.matches && e.target.matches('.form-control')) setFieldError(e.target, '');
    });
    form.addEventListener('change', e => {
        if (e.target.name === 'petChoice') {
            const err = byId('petChoice-error');
            if (err) { err.textContent = ''; err.hidden = true; }
        }
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Cegah pengiriman berulang saat proses sedang berjalan
        if (submitting) return;

        const firstInvalid = validate();
        if (firstInvalid) {
            setStatus(status, 'Periksa kembali field yang ditandai merah di atas.', 'error');
            showToast('Data belum lengkap', 'Formulir belum valid. Isian yang bermasalah ditandai merah.', 'warning', 4500);
            if (typeof firstInvalid.focus === 'function') firstInvalid.focus();
            return; // data pengguna TIDAK dihapus
        }

        const chosen = picker.getSelected();
        const chosenPet = pets.find(p => String(p.id) === chosen);
        const petLabel = chosen === OTHER_PET_VALUE
            ? 'Lainnya: ' + otherName.value.trim()
            : chosenPet ? chosenPet.name + ' (' + capitalize(chosenPet.type) + ')' : '-';

        const payload = {
            nama: fullname.value.trim(),
            email: email.value.trim(),
            telepon: phone.value.trim(),
            hewan: chosen,
            hewanNama: chosen === OTHER_PET_VALUE ? otherName.value.trim() : (chosenPet ? chosenPet.name : ''),
            hewanJenis: chosen === OTHER_PET_VALUE ? otherType.value.trim() : (chosenPet ? chosenPet.type : ''),
            pesan: message.value.trim(),
            dipilihPada: new Date().toISOString()
        };

        submitting = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Memvalidasi...';
        }
        setStatus(status, 'Memvalidasi isian...', 'info');

        try {
            const result = await submitAdoptionRequest(payload);
            if (result.delivered) {
                setStatus(status, 'Permohonan berhasil dikirim ke PawPals.', 'success');
                showToast('Permohonan Terkirim', 'Data Anda sudah diterima PawPals.', 'success', 5000);
            } else {
                setStatus(
                    status,
                    'Formulir tervalidasi (mode demo). Permohonan untuk ' + petLabel +
                    ' belum dikirim dan tidak disimpan — belum ada server yang menerimanya. Isian Anda sengaja dipertahankan.',
                    'info'
                );
                showToast('Tervalidasi (mode demo)', 'Isian sudah benar, tetapi belum ada server yang menerima data. Tidak ada yang dikirim atau disimpan.', 'info', 6000);
            }
            // Formulir sengaja tidak di-reset: data belum terkirim, jadi user
            // masih memerlukan isiannya (bisa disalin atau dikoreksi).
        } catch (err) {
            setStatus(status, 'Terjadi kesalahan saat memproses formulir. Silakan coba lagi.', 'error');
            showToast('Gagal memproses', 'Formulir tidak dapat diproses saat ini.', 'error', 5000);
        } finally {
            submitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Validasi Permohonan';
            }
        }
    });

    // Tombol Reset: kembalikan seluruh state ke kondisi awal
    form.addEventListener('reset', () => {
        // event 'reset' dipanggil SEBELUM field dikosongkan
        setTimeout(() => {
            clearFormErrors(form);
            setStatus(status, '');
            if (picker) picker.sync();
        }, 0);
    });
}

// ==========================================
// 8. FORMULIR KONTAK
// ==========================================
/** ENGKEL BACKEND — lihat catatan pada submitAdoptionRequest(). */
async function submitContactMessage(payload) {
    void payload;
    return {
        delivered: false,
        note: 'Pesan belum dikirim dan tidak disimpan.'
    };
}

function initContactForm() {
    const form = byId('contactForm');
    if (!form) return;

    const status = byId('contactStatus');
    const name = byId('contactName');
    const email = byId('contactEmail');
    const message = byId('contactMessage');
    const submitBtn = $('button[type="submit"]', form);

    let submitting = false;

    form.addEventListener('input', e => {
        if (e.target.matches && e.target.matches('.form-control')) setFieldError(e.target, '');
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (submitting) return;

        let firstInvalid = null;
        const fail = (input, msg) => {
            setFieldError(input, msg);
            if (msg && !firstInvalid) firstInvalid = input;
        };

        fail(name, validateRequired(name.value, 'Nama'));
        fail(email, validateEmail(email.value));
        fail(message, validateRequired(message.value, 'Pesan'));

        if (firstInvalid) {
            setStatus(status, 'Periksa kembali field yang ditandai merah.', 'error');
            showToast('Pesan belum valid', 'Isian yang bermasalah ditandai merah.', 'warning', 4500);
            firstInvalid.focus();
            return;
        }

        const payload = {
            nama: name.value.trim(),
            email: email.value.trim(),
            pesan: message.value.trim(),
            dikirimPada: new Date().toISOString()
        };

        submitting = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Memvalidasi...';
        }
        setStatus(status, 'Memvalidasi pesan...', 'info');

        try {
            const result = await submitContactMessage(payload);
            if (result.delivered) {
                setStatus(status, 'Pesan berhasil dikirim. Terima kasih!', 'success');
                showToast('Pesan Terkirim', 'Pesan Anda sudah diterima PawPals.', 'success', 5000);
                form.reset();
            } else {
                setStatus(status, 'Pesan tervalidasi (mode demo). Belum dikirim dan tidak disimpan — belum ada server yang menerimanya. Isian Anda dipertahankan.', 'info');
                showToast('Tervalidasi (mode demo)', 'Pesan sudah benar, tetapi belum dikirim ke server mana pun.', 'info', 6000);
            }
        } catch (err) {
            setStatus(status, 'Terjadi kesalahan. Silakan coba lagi.', 'error');
            showToast('Gagal memproses', 'Pesan tidak dapat diproses saat ini.', 'error', 5000);
        } finally {
            submitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Validasi Pesan';
            }
        }
    });
}

// ==========================================
// 9. FORMULIR NEWSLETTER
// ==========================================
/** ENGKEL BACKEND — lihat catatan pada submitAdoptionRequest(). */
async function submitNewsletter(email) {
    void email;
    return {
        delivered: false,
        note: 'Alamat email belum dikirim dan tidak disimpan.'
    };
}

function initNewsletter() {
    $$('#newsletterForm').forEach(form => {
        const input = byId('newsletterEmail');
        const status = byId('newsletterStatus');
        const submitBtn = $('button[type="submit"]', form);
        if (!input) return;

        let submitting = false;

        input.addEventListener('input', () => {
            input.removeAttribute('aria-invalid');
            if (status) setStatus(status, '');
        });

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            if (submitting) return;

            const error = validateEmail(input.value);
            if (error) {
                input.setAttribute('aria-invalid', 'true');
                setStatus(status, error, 'error');
                showToast('Email tidak valid', error, 'warning', 4000);
                input.focus();
                return;
            }

            input.removeAttribute('aria-invalid');
            submitting = true;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Memproses...';
            }
            setStatus(status, 'Memproses...', 'info');

            try {
                const result = await submitNewsletter(input.value.trim());
                if (result.delivered) {
                    setStatus(status, 'Berhasil berlangganan. Terima kasih!', 'success');
                    showToast('Berlangganan Berhasil', 'Alamat email Anda sudah terdaftar.', 'success', 5000);
                    form.reset();
                } else {
                    setStatus(status, 'Email valid, tetapi mode demo: belum ada layanan berlangganan, jadi alamat ini tidak dikirim dan tidak disimpan.', 'info');
                    showToast('Mode demo', 'Email valid, tetapi belum ada layanan berlangganan yang menerimanya.', 'info', 6000);
                }
            } catch (err) {
                setStatus(status, 'Terjadi kesalahan. Silakan coba lagi.', 'error');
                showToast('Gagal memproses', 'Permintaan tidak dapat diproses saat ini.', 'error', 5000);
            } finally {
                submitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Berlangganan';
                }
            }
        });
    });
}

// ==========================================
// 10. PENCARIAN HEWAN
// ==========================================
function initSearch() {
    const form = byId('searchForm');
    const input = byId('searchInput');
    const results = byId('searchResults');
    const noResults = byId('noResults');
    const summary = byId('searchSummary');
    if (!results) return;

    const filterButtons = $$('[data-filter]');
    let activeType = 'all';

    function runSearch() {
        const keyword = normalizeText(input ? input.value : '');

        const byType = activeType === 'all'
            ? pets
            : pets.filter(p => p.type === activeType);

        const filtered = keyword
            ? byType.filter(pet => [pet.name, pet.type, pet.age, pet.gender, pet.description]
                .some(field => normalizeText(field).includes(keyword)))
            : byType;

        if (filtered.length === 0) results.replaceChildren();
        else renderPets(filtered, 'searchResults');

        if (noResults) noResults.hidden = filtered.length !== 0;

        if (summary) {
            const typePart = activeType === 'all' ? '' : ' · jenis ' + capitalize(activeType);
            const keyPart = keyword ? ' · kata kunci "' + input.value.trim() + '"' : '';
            summary.textContent = filtered.length === 0
                ? 'Tidak ada hewan yang cocok dengan filter ini.'
                : filtered.length + ' hewan ditemukan' + typePart + keyPart;
        }
    }

    filterButtons.forEach(btn => {
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-pressed', String(btn.dataset.filter === 'all'));
        btn.addEventListener('click', () => {
            activeType = btn.dataset.filter || 'all';
            filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            // Chip filter selalu berarti "jenis ini saja", jadi kata kunci
            // dikosongkan agar hasilnya tidak menyesatkan.
            if (input) input.value = '';
            runSearch();
        });
    });

    // Enter pada kolom pencarian memicu submit form, jadi tidak perlu
    // listener keyup terpisah (menghindari pemrosesan ganda).
    if (form) form.addEventListener('submit', e => { e.preventDefault(); runSearch(); });
    if (input) input.addEventListener('search', runSearch);

    runSearch();
}

// ==========================================
// 11. MENU HAMBURGER
// ==========================================
function initNav() {
    const toggle = $('.nav-toggle');
    const nav = byId('navLinks');
    if (!toggle || !nav) return;

    function setOpen(open) {
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    }

    function isOpen() {
        return nav.classList.contains('open');
    }

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    nav.addEventListener('click', e => {
        if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener('click', e => {
        if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    setOpen(false);
}

// ==========================================
// 12. GRID HEWAN STANDAR
// ==========================================
function initPetGrids() {
    const featuredGrid = byId('featuredGrid');
    if (featuredGrid) renderPets(pets.filter(p => p.featured), 'featuredGrid');

    const allPetsGrid = byId('allPetsGrid');
    if (allPetsGrid) renderPets(pets, 'allPetsGrid');
}

// ==========================================
// 13. INISIALISASI
// ==========================================
let pawPalsReady = false;

document.addEventListener('DOMContentLoaded', function () {
    // Jaga agar listener tidak pernah terpasang dua kali
    if (pawPalsReady) return;
    pawPalsReady = true;

    initTheme();
    initNav();
    initPetGrids();
    initSearch();
    initAdoptForm();
    initContactForm();
    initNewsletter();
});