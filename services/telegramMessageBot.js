const TelegramBot = require('node-telegram-bot-api');
const token = '5476345761:AAHu7pgjWdMFXZF-FvugQI3pM9t12FWI3Rw';
const bot = new TelegramBot(token);
const bot_option = true
const bot_id = -1001775593548


const sendTelegramBotMessage = (message) => {
  if(bot_option) {
    bot.sendMessage(
      bot_id,
      message
      );
  }
}

module.exports = { sendTelegramBotMessage }