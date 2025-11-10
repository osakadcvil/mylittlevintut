document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const closeCardButton = document.getElementById('closeCard');

    envelope.addEventListener('click', () => {
        // Tambahkan kelas 'open' untuk menganimasikan amplop
        envelope.classList.add('open');

        // Setelah animasi amplop selesai, tampilkan kartu
        // Kita gunakan setTimeout agar ada jeda setelah animasi flap
        setTimeout(() => {
            card.classList.add('show');
            // Opsional: Mainkan suara atau confetti
            playConfetti(); // Fungsi ini akan kita buat
            playBirthdayMusic(); // Fungsi ini akan kita buat
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


    // --- Fungsi Tambahan (opsional) ---

    // Fungsi untuk Confetti (menggunakan library sederhana)
    function playConfetti() {
        // Jika belum ada library confetti, ini akan menjadi fungsi kosong
        // Atau kamu bisa menambahkan library seperti 'canvas-confetti'
        // Untuk demo, kita akan membuat elemen confetti dasar.
        const confettiCount = 50;
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.width = Math.random() * 8 + 'px';
            confetti.style.height = Math.random() * 8 + 'px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * -100 + 'vh'; // Mulai dari atas layar
            confetti.style.opacity = Math.random();
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards, rotate ${Math.random() * 2 + 1}s infinite linear`;
            confetti.style.zIndex = '9999'; // Pastikan di atas semua elemen
            document.body.appendChild(confetti);

            // Hapus confetti setelah animasi selesai
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // Tambahkan CSS untuk confetti di style.css (di bagian paling bawah)
    // @keyframes fall {
    //     to { transform: translateY(100vh) rotateZ(360deg); }
    // }
    // @keyframes rotate {
    //     0% { transform: rotateZ(0deg); }
    //     100% { transform: rotateZ(360deg); }
    // }
    // .confetti {
    //     /* Gaya tambahan jika diperlukan */
    // }


    // Fungsi untuk Musik Ulang Tahun
    let birthdayAudio; // Variabel global untuk audio
    function playBirthdayMusic() {
        // Ganti 'path/to/your/birthday_song.mp3' dengan path lagu ulang tahun
        // Pastikan file audio ada di folder proyek atau gunakan URL eksternal.
        // Contoh: let birthdayAudio = new Audio('assets/happy_birthday.mp3');
        // Kamu bisa unduh musik non-copyright atau gunakan dari koleksimu.

        if (!birthdayAudio) { // Hanya buat objek audio sekali
            birthdayAudio = new Audio('vintutt.mp3'); 
            birthdayAudio.loop = true; // Loop musik
        }
        birthdayAudio.volume = 0.5; // Atur volume
        birthdayAudio.play().catch(e => console.error("Gagal memutar audio:", e)); // Tangani error autoplay
    }

    function stopBirthdayMusic() {
        if (birthdayAudio) {
            birthdayAudio.pause();
            birthdayAudio.currentTime = 0; // Kembali ke awal lagu
        }
    }

});
