import airtable from './infrastructure/store/airtable';
import request from './infrastructure/network/undiciRequest';
import dotenv from 'dotenv';
dotenv.config();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE = process.env.AIRTABLE_BASE || '';
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE || '';

const persister = airtable({ apiKey: AIRTABLE_API_KEY, app: AIRTABLE_BASE, table: AIRTABLE_TABLE, request });
// persister.getById('rect1IVvO6eksccOk').then(console.log).catch(console.error);
