import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN; // Use the token from the environment variable
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start (.+)/, (msg, match) => {
   const referralToken = match[1];  // Captures the referral token from the /start command
   const webAppUrl = `https://bamboo-1.vercel.app/?referralToken=${referralToken}`;
   bot.sendMessage(msg.chat.id, `Click here to access the app: ${webAppUrl}`);
});

console.log('Bot is running...');
