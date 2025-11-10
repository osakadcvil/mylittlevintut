document.addEventListener('DOMContentLoaded', () => {
    // --- AMBIL SEMUA ELEMEN ---
    const envelope = document.getElementById('envelope');
    // ID Kartu dikembalikan ke 'card'
    const card = document.getElementById('card'); 
    // ID tombol dikembalikan ke 'closeCard'
    const closeCardButton = document.getElementById('closeCard'); 

    // --- LOGIKA UTAMA: MEMBUKA AMPLOP DAN KARTU ---
    envelope.addEventListener('click', () => {
        // Tambahkan kelas 'open' untuk menganimasikan amplop
        envelope.classList.add('open');

        // Setelah animasi amplop selesai, tampilkan kartu
        setTimeout(() => {
            card.classList.add('show');
            playConfetti(); // Panggil confetti
            playBirthdayMusic(); // Panggil musik
        }, 800); 
    });

    // --- LOGIKA MENUTUP KARTU ---
    if (closeCardButton) {
        closeCardButton.addEventListener('click', () => {
            card.classList.remove('show');
            // Setelah kartu ditutup, animasikan amplop kembali tertutup
            setTimeout(() => {
                envelope.classList.remove('open');
                stopBirthdayMusic(); // Hentikan musik saat kartu ditutup
                stopConfetti(); // Hentikan Confetti yang sedang berjalan
            }, 300); 
        });
    }

    // --- FUNGSI CONFETTI & AUDIO ---
    
    // Confetti saat kartu terbuka
    function playConfetti() {
        if (window.confetti) {
            
            // Tembakan utama dari tengah atas
            window.confetti({
                particleCount: 150,
                spread: 180, 
                startVelocity: 40,
                decay: 0.92,
                scalar: 1.2,
                origin: { y: 0.2 } 
            });
            
            // Tembakan tambahan dari sisi kiri & kanan
            window.confetti({ particleCount: 75, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#ffc0cb', '#ffffff', '#ff69b4'] });
            window.confetti({ particleCount: 75, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#ffc0cb', '#ffffff', '#ff69b4'] });

        } else {
            console.warn("Confetti library not loaded. Check index.html <script> tag."); 
        }
    }
    
    function stopConfetti() {
        if (window.confetti) {
            window.confetti.reset();
        }
    }

    // --- FUNGSI MUSIK Ulang Tahun ---
    let birthdayAudio; // Variabel global untuk audio
    function playBirthdayMusic() {
        if (!birthdayAudio) { 
            birthdayAudio = new Audio('vintutt.mp3'); 
            birthdayAudio.loop = true; 
        }
        birthdayAudio.volume = 0.5; 
        // Menggunakan play().catch untuk menghindari error browser saat autoplay diblokir
        birthdayAudio.play().catch(e => console.error("Gagal memutar audio, mungkin diblokir oleh browser:", e)); 
    }

    function stopBirthdayMusic() {
        if (birthdayAudio) {
            birthdayAudio.pause();
            birthdayAudio.currentTime = 0; 
        }
    }
});
