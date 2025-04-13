const express = require("express");
const axios = require("axios");
const app = express();

const DISCORD_BOT_TOKEN = 'MTM2MDk4NjUzODU4MTk1NDcyMA.G4h1Qe.mj-b6p5cBEHjLegPW10GsY2GDN5uU-PD89XgMM';
const SERVER_ID = '1208429119747137606';
const ROLE_ID = '1360994008134058164';

app.get("/verificar/:discordId", async (req, res) => {
    const discordId = req.params.discordId;

    try {
        const response = await axios.get(`https://discord.com/api/guilds/${SERVER_ID}/members/${discordId}`, {
            headers: {
                Authorization: `Bot ${DISCORD_BOT_TOKEN}`
            }
        });

        const temCargo = response.data.roles.includes(ROLE_ID);
        res.json({ temCargo });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ erro: "Erro ao verificar" });
    }
});

app.listen(3000, () => {
    console.log("✅ Servidor rodando na porta 3000");
});
