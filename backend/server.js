// backend/server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições CORS do frontend
app.use(cors());

// Endpoint para obter dados METAR
app.get('/api/metar', async (req, res) => {
    const METAR_API_URL = `https://avwx.rest/api/metar/SBGR?options=translate&format=json&token=${process.env.API_KEY}`;

    try {
        const response = await fetch(METAR_API_URL);
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados METAR: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar dados METAR.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
