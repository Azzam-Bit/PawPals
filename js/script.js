// ==========================================
// DATA HEWAN (sama seperti sebelumnya)
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

// ==========================================
// RENDER HEWAN (grid biasa)
// ==========================================
function renderPets(petList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (petList.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Tidak ada hewan yang ditemukan.</p>';
        return;
    }
    container.innerHTML = petList.map(pet => `
        <div class="pet-card" data-id="${pet.id}">
            <span class="pet-emoji">${pet.image}</span>
            <h3>${pet.name}</h3>
            <div class="pet-type">${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)} · ${pet.gender}</div>
            <div class="pet-detail">${pet.age}</div>
            <p class="pet-description">${pet.description}</p>
            <a href="adopt.html?pet=${pet.id}" class="btn btn-primary">Adopsi</a>
        </div>
    `).join('');
}

// ==========================================
// TOAST NOTIFICATION
// ==========================================
function showToast(title, message, type = 'success', duration = 4000) {
    const container = document.getElementById('toastContainer') || (() => {
        const div = document.createElement('div');
        div.id = 'toastContainer';
        div.className = 'toast-container';
        document.body.appendChild(div);
        return div;
    })();

    const icons = {
        success: '✅',
        error: '❌',
        info: '📢',
        warning: '⚠️'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || '📢'}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Tutup notifikasi">✕</button>
    `;

    container.appendChild(toast);

    // Tombol close
    toast.querySelector('.toast-close').addEventListener('click', () => {
        closeToast(toast);
    });

    // Auto close
    if (duration > 0) {
        setTimeout(() => {
            closeToast(toast);
        }, duration);
    }
}

function closeToast(toast) {
    if (toast.classList.contains('hide')) return;
    toast.classList.add('hide');
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
}

// ==========================================
// RENDER PET OPTION CARDS (untuk halaman adopsi)
// ==========================================
function renderPetOptions(containerId, hiddenInputId, feedbackId) {
    const container = document.getElementById(containerId);
    const hiddenInput = document.getElementById(hiddenInputId);
    const feedback = document.getElementById(feedbackId);
    if (!container) return;

    // Tambahkan opsi "Lainnya" secara manual
    const allOptions = [...pets, { id: 'other', name: 'Lainnya', type: '—', image: '🐾', featured: false }];

    container.innerHTML = allOptions.map(pet => `
        <div class="pet-option-card" data-id="${pet.id}" data-name="${pet.name}" data-type="${pet.type}">
            <span class="pet-emoji">${pet.image}</span>
            <div class="pet-name">${pet.name}</div>
            <div class="pet-type-label">${pet.type !== '—' ? pet.type.charAt(0).toUpperCase() + pet.type.slice(1) : 'Lainnya'}</div>
        </div>
    `).join('');

    // Event listener untuk setiap kartu
    container.querySelectorAll('.pet-option-card').forEach(card => {
        card.addEventListener('click', function() {
            // Hapus class selected dari semua kartu
            container.querySelectorAll('.pet-option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            const petId = this.dataset.id;
            const petName = this.dataset.name;
            hiddenInput.value = petId;
            if (feedback) {
                feedback.textContent = petId === 'other' ? 'Anda memilih: Lainnya (tulis di pesan)' : `Anda memilih: ${petName}`;
                feedback.style.color = 'var(--cocoa)';
            }
        });
    });

    // Jika ada parameter ?pet= di URL, pilih otomatis
    const urlParams = new URLSearchParams(window.location.search);
    const petIdParam = urlParams.get('pet');
    if (petIdParam) {
        const targetCard = container.querySelector(`.pet-option-card[data-id="${petIdParam}"]`);
        if (targetCard) {
            targetCard.click();
        }
    }
}

// ==========================================
// INISIALISASI
// ==========================================
document.addEventListener('DOMContentLoaded', function() {

    // --- Featured pets (index) ---
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
        const featured = pets.filter(p => p.featured);
        renderPets(featured, 'featuredGrid');
    }

    // --- Semua hewan (pets.html) ---
    const allPetsGrid = document.getElementById('allPetsGrid');
    if (allPetsGrid) {
        renderPets(pets, 'allPetsGrid');
    }

    // --- Pilihan hewan di halaman adopsi (kartu) ---
    const petSelectionContainer = document.getElementById('petSelection');
    if (petSelectionContainer) {
        renderPetOptions('petSelection', 'selectedPet', 'petSelectionFeedback');
    }

    // --- SEARCH (search.html) ---
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');

    function filterPets(keyword) {
        if (!searchResults) return;
        const filtered = pets.filter(pet => {
            const match = pet.name.toLowerCase().includes(keyword.toLowerCase()) ||
                          pet.type.toLowerCase().includes(keyword.toLowerCase()) ||
                          pet.age.toLowerCase().includes(keyword.toLowerCase()) ||
                          pet.description.toLowerCase().includes(keyword.toLowerCase());
            return match;
        });
        if (filtered.length === 0) {
            searchResults.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            if (noResults) noResults.style.display = 'none';
            renderPets(filtered, 'searchResults');
        }
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            filterPets(searchInput.value.trim());
        });
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterPets(searchInput.value.trim());
            }
        });
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                if (filter === 'all') {
                    searchInput.value = '';
                    filterPets('');
                } else {
                    searchInput.value = filter;
                    filterPets(filter);
                }
            });
        });
        if (searchResults) {
            renderPets(pets, 'searchResults');
        }
    }

    // --- FORM ADOPSI ---
    const adoptForm = document.getElementById('adoptForm');
    if (adoptForm) {
        adoptForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedPetId = document.getElementById('selectedPet')?.value || '';
            const petName = document.querySelector('.pet-option-card.selected')?.dataset.name || 'tidak dipilih';
            
            // Validasi sederhana
            if (!selectedPetId) {
                showToast('Perhatian', 'Silakan pilih hewan yang ingin diadopsi terlebih dahulu.', 'warning', 3000);
                return;
            }

            // Jika sukses
            showToast('✅ Permohonan Terkirim!', `Terima kasih! Permohonan adopsi untuk ${petName} telah kami terima. Tim kami akan menghubungi Anda segera.`, 'success', 5000);
            adoptForm.reset();
            // Reset pilihan kartu
            document.querySelectorAll('.pet-option-card').forEach(c => c.classList.remove('selected'));
            document.getElementById('selectedPet').value = '';
            const feedback = document.getElementById('petSelectionFeedback');
            if (feedback) feedback.textContent = '';
        });
    }

    // --- FORM KONTAK ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('📨 Pesan Terkirim!', 'Terima kasih, pesan Anda telah kami terima. Kami akan membalas secepatnya.', 'success', 4000);
            contactForm.reset();
        });
    }

    // --- NEWSLETTER (dengan toast) ---
    const newsletterForms = document.querySelectorAll('#newsletterForm');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (!input.value || !input.value.includes('@')) {
                showToast('⚠️ Email tidak valid', 'Mohon masukkan alamat email yang benar.', 'warning', 3000);
                return;
            }
            showToast('📬 Berlangganan Berhasil!', `Email ${input.value} telah terdaftar. Anda akan mendapat update dari PawPals.`, 'success', 4500);
            input.value = '';
        });
    });

    // --- NAV TOGGLE (hamburger) ---
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        });
    }
});