document.addEventListener('DOMContentLoaded', () => {
    // --- AMBIL SEMUA ELEMEN ---
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('birthdayCard'); // ID kartu diubah
    const openCakeBtn = document.getElementById('openCake'); // Tombol diganti
    const cakeContainer = document.getElementById('cakeContainer'); // Wadah Kue
    const candles = document.querySelectorAll('.candle'); // Semua Lilin
    const finalMessage = document.getElementById('finalMessage'); // Pesan Hadiah
    const finalCloseBtn = document.getElementById('finalClose'); // Tombol Tutup Kue

    // --- VARIABEL AUDIO & KUE ---
    let birthdayAudio; // Variabel global untuk audio
    let litCandles = candles.length; // Hitungan lilin yang menyala (Awalnya 3)

    // ==========================================================
    // 1. LOGIKA UTAMA: MEMBUKA AMPLOP DAN KARTU
    // ==========================================================
    envelope.addEventListener('click', () => {
        // Tambahkan kelas 'open' untuk menganimasikan amplop
        envelope.classList.add('open');

        // Setelah animasi amplop selesai, tampilkan kartu
        setTimeout(() => {
            card.classList.add('show');
            playConfetti(); // Tembakkan confetti saat kartu muncul
            playBirthdayMusic(); 
        }, 800); 
    });

    // ==========================================================
    // 2. LOGIKA KARTU -> KUE
    // ==========================================================
    if (openCakeBtn) {
        openCakeBtn.addEventListener('click', function() {
            // 1. Sembunyikan Kartu
            card.classList.remove('show');
            stopConfetti(); // Hentikan confetti dari kartu
            
            // 2. Tampilkan Kue
            setTimeout(() => {
                cakeContainer.classList.add('show');
            }, 500); // Tunda sebentar agar transisi terlihat mulus
        });
    }


    // ==========================================================
    // 3. LOGIKA KUE INTERAKTIF (MEMADAMKAN LILIN)
    // ==========================================================
    candles.forEach(candle => {
        candle.addEventListener('click', function() {
            const flame = this.querySelector('.flame');
            
            // Hanya memproses jika api masih menyala
            if (flame && flame.style.opacity !== '0') {
                flame.style.opacity = '0'; // Matikan api
                litCandles--; // Kurangi hitungan lilin yang menyala
                
                // Panggil pengecekan hadiah
                checkAllCandlesOut();
            }
        });
    });

    // --- Pengecekan Hadiah (Opsi 3) ---
    function checkAllCandlesOut() {
        if (litCandles === 0) {
            console.log("Semua lilin sudah mati! Tampilkan hadiah.");
            
            // 1. Tampilkan Pesan Hadiah
            setTimeout(() => {
                finalMessage.classList.add('show');
            }, 500); 
            
            // 2. Tembakkan Confetti Hadiah!
            playFinalConfetti(); 
        }
    }


    // ==========================================================
    // 4. LOGIKA MENUTUP KUE (SELESAI)
    // ==========================================================
    if (finalCloseBtn) {
        finalCloseBtn.addEventListener('click', function() {
            cakeContainer.classList.remove('show');
            stopConfetti(); // Bersihkan sisa confetti

            // Opsional: Hentikan musik di sini jika Anda ingin lagu berhenti setelah semua interaksi selesai
            stopBirthdayMusic(); 
            
            // Opsional: Animasi amplop kembali tertutup
            setTimeout(() => {
                envelope.classList.remove('open');
            }, 300);
        });
    }


    // ==========================================================
    // --- FUNGSI CONFETTI & AUDIO ---
    // ==========================================================

    // Confetti saat kartu terbuka (awal)
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
            console.warn("Confetti library not loaded."); 
        }
    }
    
    // Confetti saat lilin padam (hadiah)
    function playFinalConfetti() {
        if (window.confetti) {
            window.confetti({
                particleCount: 150,
                spread: 360,
                ticks: 150,
                gravity: 0.8,
                decay: 0.94,
                scalar: 0.8,
                origin: { y: 0.6 } // Dari area kue
            });
        }
    }

    function stopConfetti() {
        if (window.confetti) {
            window.confetti.reset();
        }
    }


    // --- FUNGSI MUSIK Ulang Tahun ---
    function playBirthdayMusic() {
        if (!birthdayAudio) { 
            // Path audio
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
