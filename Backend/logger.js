const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const connection_url =
  'mongodb+srv://justastit92:Gc32jYS7qxKzv3g@cluster0.nkbaf.mongodb.net/youtubeDB?retryWrites=true&w=majority';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      level: 'error',
      collection: 'activity',
      options: { useUnifiedTopology: true },
      db: connection_url,
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
