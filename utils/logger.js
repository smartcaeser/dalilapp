const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf } = format;

var expressWinston = require('express-winston');

var fs = require('fs');

var path = require('path');

var uuid = require('uuid');

var getNamespace = require('continuation-local-storage').getNamespace;

var createNamespace = require('continuation-local-storage').createNamespace;

var myRequest = createNamespace('my request');

module.exports = function (app) {
    const level = process.env.LOG_LEVEL || 'debug';

    const logDirectory = 'logs';

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    app.use(assignId)

    function assignId(req, res, next) {
        req.id = uuid.v4()
        myRequest.run(function () {
            myRequest.set('requestId', req.id);
            next();
        });
    }
    // const myFormat = printf(({ level, message, label, timestamp }) => {
    //     return `${timestamp} [${label}] ${level}: ${message}`;
    // });

    var expressFormatObject = format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `[${info.timestamp}] [INFO] ` + formatExpressMessage(`${info.message}`))
    );

    var logFormat = format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `[${info.timestamp}] ${info.message}`)
    );

    const logFile = path.join(logDirectory, 'log.log');

    const errorFile = path.join(logDirectory, 'error.log');

    app.use(expressWinston.logger({
        transports: [
            new transports.Console({
                level: level,
                format: expressFormatObject
            }),
            new transports.File({
                format: expressFormatObject,
                filename: logFile
            }),
            new transports.File({
                format: expressFormatObject,
                filename: errorFile,
                level: 'error'
            })
        ],
        format: expressFormatObject,
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}} {{req.id}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));

    const winstonLogger = createLogger({
        transports: [
            new transports.Console({
                level: level,
                format: logFormat
            }),
            new transports.File({
                format: logFormat,
                filename: logFile
            }),
            new transports.File({
                format: logFormat,
                filename: errorFile,
                level: 'error'
            })
        ],
        exitOnError: false, // do not exit on handled exceptions
    });

    function _getCallerFile() {
        try {
            // var execludes = ['BaseService', 'ExceptionHandler'];

            var err = new Error();
            var callerfile;
            var currentfile;

            Error.prepareStackTrace = function (err, stack) { return stack; };

            currentfile = err.stack.shift().getFileName();

            while (err.stack.length) {
                callerfile = err.stack.shift().getFileName();

                if (currentfile !== callerfile && !callerfile.includes('ExceptionHandler.js') && !callerfile.includes('BaseService.js')) return callerfile.slice(callerfile.lastIndexOf('/') + 1);
            }
        } catch (err) { }
        return "unknown";
    }

    function readRequestId() {
        return myRequest && myRequest.get('requestId') ? myRequest.get('requestId') : "unkown";
    }

    // Wrap Winston logger to print reqId in each log
    var formatMessage = function (level, message) {
        var msg = "[" + level + "] [" + _getCallerFile() + "] ";
        return msg + formatExpressMessage(message);
    };

    var formatExpressMessage = function (message) {
        return "[" + readRequestId() + "]: " + message;
    };

    var logger = {
        log: function (level, message) {
            winstonLogger.log(level, formatMessage(level, message));
        },
        error: function (message) {
            console.log(message);
            winstonLogger.error(formatMessage("ERROR", message));
        },
        warn: function (message) {
            winstonLogger.warn(formatMessage("WARN", message));
        },
        verbose: function (message) {
            winstonLogger.verbose(formatMessage("VERBOSE", message));
        },
        info: function (message) {
            console.log(message);
            winstonLogger.info(formatMessage("INFO", message));
        },
        debug: function (message) {
            winstonLogger.debug(formatMessage("DEBUG", message));
        },
        silly: function (message) {
            winstonLogger.silly(formatMessage("SILLY", message));
        }
    };

    module.exports.logger = logger;

    return logger;
};