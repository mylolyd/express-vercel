
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;
const bot = new TelegramBot("7908620487:AAF4g43C8WDQ_MPr2Eo9Dg2XYusyQbvMS6U", { polling: true });

app.use(express.json());

// Event saat bot menerima pesan
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Halo, ${msg.from.first_name}! Anda mengirim: ${msg.text}`);
});

// Endpoint untuk mengirim pesan ke chat tertentu
app.post("/send-message", async (req, res) => {
    const { chatId, text } = req.body;
    if (!chatId || !text) {
        return res.status(400).json({ error: "chatId dan text diperlukan" });
    }

    try {
        await bot.sendMessage(chatId, text);
        res.json({ success: true, message: "Pesan berhasil dikirim" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint root
app.get("/", (req, res) => {
    res.send("Bot Telegram dengan Express berjalan!");
});

// Jalankan server Express
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
