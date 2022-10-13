
const TelegramBot = require('node-telegram-bot-api');
const token = '5476345761:AAHu7pgjWdMFXZF-FvugQI3pM9t12FWI3Rw';
const bot = new TelegramBot(token);
const bot_option = true;

module.exports= { 
	bot
	, bot_option
}
