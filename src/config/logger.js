import winston from 'winston';

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'magenta',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white'
  }
};

winston.addColors(customLevelsOptions.colors);

const buildLogger = (env) => {
  const transports = [];

  // Consola
  transports.push(
    new winston.transports.Console({
      level: env === 'production' ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      )
    })
  );

  // Archivo de errores solo en producción
  if (env === 'production') {
    transports.push(
      new winston.transports.File({
        filename: './errors.log',
        level: 'error',
        format: winston.format.simple()
      })
    );
  }

  return winston.createLogger({
    levels: customLevelsOptions.levels,
    transports
  });
};

export default buildLogger;