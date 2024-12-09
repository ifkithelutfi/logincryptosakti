document.getElementById('start-button').addEventListener('click', function() {
    // Setelah tombol "Start" diklik, hilangkan tampilan "Who’s Watching"
    document.querySelector('.who-watching-container').style.display = 'none';
    
    // Tampilkan halaman utama aplikasi
    window.location.href = 'index.html'; // Halaman utama setelah login
  });  