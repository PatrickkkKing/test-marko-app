const express = require('express');
const session = require('express-session');
const marko = require('@marko/express');
const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware untuk parsing body form
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(marko());

app.get('/', (req, res) => {
    res.marko(require('./views/index.marko')); // Ganti dengan path file Marko yang sesuai
});

// Halaman login
app.get('/login', (req, res) => {
    res.marko(require('./views/login.marko'));
});

// Proses login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi user (ganti dengan logika autentikasi yang sesuai)
    if (username === 'user' && password === 'pass') {
        req.session.user = { username };
        res.redirect('/'); // Arahkan ke halaman utama setelah login berhasil
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
