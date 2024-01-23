const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.use(express.json());

app.all('*', async (req, res) => {
    const url = 'https://script.google.com/macros/s/AKfycbw3Q1efWc-hgEEjE1c18PwNOzJwCd03P3aezfBvWjX3_nj0GezYGiusD0LY4K623_IZ/exec'; // Replace with your GAS script URL

    try {
        const response = await fetch(url, {
            method: req.method,
            headers: req.headers,
            body: JSON.stringify(req.body)
        });

        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
