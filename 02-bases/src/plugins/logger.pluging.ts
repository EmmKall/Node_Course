//const winston = require('winston');
//const { combine, timestamp, json } = winston.format;
import winston, { format } from 'winston';
const { combine, timestamp, json } = format; 

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ]
})

if(process.env.NODE_ENV !== 'production')
{
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export const  buildLogger = (service:string) => {
    return {
        log: (message:string) => {
            logger.log('info', {message, service, /* at: new Date().toISOString(), */ })
        },
        error: (message:string) => {
            logger.error('err', { message, service, /* at: new Date().toISOString(), */ })
        }
    }
}
