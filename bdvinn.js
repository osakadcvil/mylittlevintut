document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const closeCardButton = document.getElementById('closeCard');

    envelope.addEventListener('click', () => {
        // Tambahkan kelas 'open' untuk menganimasikan amplop
        envelope.classList.add('open');

        // Setelah animasi amplop selesai, tampilkan kartu
        setTimeout(() => {
            card.classList.add('show');
            // Panggil fungsi confetti dan musik saat kartu muncul
            playConfetti(); 
            playBirthdayMusic(); 
        }, 800); // Sesuaikan waktu ini dengan durasi transisi CSS amplop
    });

    closeCardButton.addEventListener('click', () => {
        card.classList.remove('show');
        // Setelah kartu ditutup, animasikan amplop kembali tertutup
        setTimeout(() => {
            envelope.classList.remove('open');
            stopBirthdayMusic(); // Hentikan musik saat kartu ditutup
        }, 300); // Jeda sebentar sebelum amplop menutup
    });
    
    // Pastikan Anda sudah menambahkan CDN canvas-confetti di index.html
    function playConfetti() {
        if (window.confetti) {
            
            // Tembakan utama dari tengah atas
            window.confetti({
                particleCount: 150,
                spread: 180, // Menyebar sangat lebar
                startVelocity: 40,
                decay: 0.92,
                scalar: 1.2,
                origin: { y: 0.2 } // Dari atas layar
            });
            
            // Tembakan tambahan dari sisi kiri
            window.confetti({
                particleCount: 75,
                angle: 60, 
                spread: 55,
                origin: { x: 0, y: 0.7 },
                colors: ['#ffc0cb', '#ffffff', '#ff69b4']
            });

            // Tembakan tambahan dari sisi kanan
            window.confetti({
                particleCount: 75,
                angle: 120, 
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors: ['#ffc0cb', '#ffffff', '#ff69b4']
            });
            
        } else {
            // Ini akan muncul di Console jika CDN confetti gagal dimuat
            console.warn("Confetti library not loaded. Check index.html <script> tag."); 
        }
    }

    // --- FUNGSI MUSIK Ulang Tahun ---
    let birthdayAudio; // Variabel global untuk audio
    function playBirthdayMusic() {
        if (!birthdayAudio) { // Hanya buat objek audio sekali
            // *** PERBAIKAN: Path audio harus diapit tanda kutip ***
            // Saya asumsikan file 'vintutt.mp3' berada di root folder. 
            // Jika berada di folder 'assets', ganti menjadi: 'assets/vintutt.mp3'
            birthdayAudio = new Audio('vintutt.mp3'); 
            birthdayAudio.loop = true; // Loop musik
        }
        birthdayAudio.volume = 0.5; // Atur volume
        birthdayAudio.play().catch(e => console.error("Gagal memutar audio:", e)); 
    }

    function stopBirthdayMusic() {
        if (birthdayAudio) {
            birthdayAudio.pause();
            birthdayAudio.currentTime = 0; // Kembali ke awal lagu
        }
    }
});
