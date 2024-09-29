import TelegramBot from 'node-telegram-bot-api'; // Using import instead of require
const token = '7394104022:AAFbbeaeuGx0zUKPKejUTdrVgzvjVlnCDfo'; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start (.+)/, (msg, match) => {
   const referralToken = match[1];  // Captures the referral token from the /start command
   const webAppUrl = `https://bamboo-1.vercel.app/?referralToken=${referralToken}`;
   bot.sendMessage(msg.chat.id, `Click here to access the app: ${webAppUrl}`);
});

console.log('Bot is running...');
