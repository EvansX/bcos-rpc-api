const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const common = require('../utils/common')
const customFormat = format.printf((info) => {
  let { message } = info;
  if (typeof message === 'object') {
    let cache = [];
    message = JSON.stringify(message, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          try {
            return JSON.parse(JSON.stringify(value));
          } catch (error) {
            return undefined;
          }
        }
        cache.push(value);
      }
      return value;
    });
    cache = [];
  }
  let errInfo = info.level == 'error' ? JSON.stringify(info) : '';
  let clientIp = info.clientIp == undefined ? '':info.clientIp;
  return `[${info.timestamp}] [${info.level}] [${info.service}_${info.module}] : ${clientIp} ${message} ${errInfo}`;
})

const logger = {}

const allTransportFile = new transports.DailyRotateFile({
  name: 'full',
  filename: __dirname + '/logs/all.log',
  json: true,
  level: 'debug',
  datePattern: 'YYYY-MM-DD', // debug.log.2017-09-20
  prepend: false,
});

const dbTransportFile = new transports.File({
  name: 'full',
  filename: __dirname + '/logs/db.log',
  json: true,
  level: 'info',
  maxsize: 2 * 1024 * 1024 * 10  // 20MB
});

const handleTransportFile = new transports.File({
  name: 'full',
  filename: __dirname + '/logs/handle.log',
  json: true,
  level: 'info',
  maxsize: 2 * 1024 * 1024 * 10  // 20MB
});

const errorTransportFile = new transports.File({
  name: 'full',
  filename: __dirname + '/logs/error.log',
  json: true,
  level: 'info',
  maxsize: 2 * 1024 * 1024 * 10  // 20MB
});

const debugLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'debug', module: '' },
  transports: [
    allTransportFile
  ]
});

const dbLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'db', module: '' },
  transports: [
    allTransportFile,
    dbTransportFile
  ]
});

const handleLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'handle', module: '',clientIp:'' },
  transports: [
    allTransportFile,
    handleTransportFile
  ]
});

const errotLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'error', module: '' },
  transports: [
    allTransportFile,
    errorTransportFile
  ]
});


logger.dbLogger = dbLogger;
logger.debugLogger = debugLogger;
logger.errotLogger = errotLogger;
logger.handleLogger = handleLogger;


if (process.env.NODE_ENV !== 'production') {
  Object.keys(logger).forEach((item) => {
    logger[item].add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        customFormat
      )
    }));
  })
}


logger.logerMiddleware = (req, res, next) => {
  // timestamp level service_module clientIp url params body query statusCode userAgent
  if (req.method == 'GET')
    handleLogger.log(`info`, `${req.method} ${req.url} ${JSON.stringify(req.params)} ${JSON.stringify(req.query)} ${res.statusCode} ${req.headers["user-agent"]}`, { module: 'request',clientIp:common.getClientIp(req) });
  else
    handleLogger.log(`info`, `${req.method} ${req.url} ${JSON.stringify(req.body)} ${res.statusCode} ${req.headers["user-agent"]}`, { module: 'request',clientIp:common.getClientIp(req) });
  next()
}


module.exports = logger