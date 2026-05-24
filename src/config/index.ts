import {config} from 'dotenv';

config();

const {PORT, NODE_ENV} = process.env;

export const Configs = {
  PORT,
  NODE_ENV,
};