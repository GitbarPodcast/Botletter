// import airtable from '../../infrastructure/store/airtable';
import dotenv from 'dotenv';
// import request from '../../infrastructure/network/undiciRequest';
// import { Store } from '../../infrastructure/store';
import { setup as telegramSetup } from '../../infrastructure/telegram/telegram';
dotenv.config();

// const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
// const AIRTABLE_BASE = process.env.AIRTABLE_BASE || '';
// const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE || '';

// const store: Store = airtable({
//   apiKey: AIRTABLE_API_KEY,
//   app: AIRTABLE_BASE,
//   table: AIRTABLE_TABLE,
//   request,
// });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const telegramMessageListener = telegramSetup(TELEGRAM_BOT_TOKEN);
telegramMessageListener((message: any) => {
  // HERE THE PROCESS TO STORE THE MESSAGES TO AIRTABLE
  console.error(message);
});
