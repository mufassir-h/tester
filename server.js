const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const version = process.env.VERSION || 'v1';

// Mengatur folder 'public' sebagai tempat file statis web
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk keperluan pengecekan health kontainer/pod k8s
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Portal Berita Kampus versi ${version} berjalan di http://localhost:${port}`);
});