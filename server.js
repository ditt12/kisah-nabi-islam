const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware untuk mengatur header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Rute untuk endpoint root
app.get('/', (req, res) => {
    res.send('Selamat datang di REST API Kisah Nabi! Gunakan /api/kisah-nabi/:nama untuk mengakses kisah nabi.');
});

// Endpoint untuk mendapatkan kisah nabi
app.get('/api/kisah-nabi/:nama', (req, res) => {
    const namaNabi = req.params.nama.toLowerCase();
    const filePath = path.join(__dirname, 'rest-api', 'kisah-nabi', `${namaNabi}.txt`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ message: 'Kisah nabi tidak ditemukan' });
        }
        res.json({ nama: namaNabi, kisah: data });
    });
});

// Ekspor aplikasi untuk digunakan oleh Vercel
module.exports = app;
