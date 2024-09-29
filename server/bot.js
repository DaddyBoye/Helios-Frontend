import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN; // Use the token from the environment variable
const bot = new TelegramBot(token, { polling: true });

// Listen for the /start command
bot.onText(/\/start(.*)/, (msg, match) => {
    const referralToken = match[1]?.trim(); // Capture the referral token from the /start command

    // Construct the web app URL for Telegram
    const webAppUrl = `https://bamboo-1.vercel.app/?referralToken=${referralToken || ''}`;

    // Open the web app directly in Telegram
    bot.sendMessage(msg.chat.id, 'Click the button below to open the web app:', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: "Open Web App",
                    web_app: { url: webAppUrl } // This will open the app directly in Telegram
                }
            ]]
        }
    });
});

console.log('Bot is running...');
