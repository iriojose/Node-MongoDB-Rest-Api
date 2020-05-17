import dotenv from 'dotenv';
dotenv.config();

export const DATABASE = process.env.DATABASE;
export const URI = process.env.URI;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;

//export const authURL = process.env.AUTH_URL;