import { Service } from 'typedi';
import logger from '../initializers/logger';
import winston from 'winston';

@Service()
export class LogService {
  getLogger(): winston.Logger {
    return logger;
  }
}
