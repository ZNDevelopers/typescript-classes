/// <reference path="logger.ts" />
// We need the above line so that TypeScript knows we are using the logger
// class.
/**
 * Copyright (c) 2016, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */
/**
 * TypeScript "Useful Classes"
 * ===========================
 *
 * TypeScript Logger Class Example
 * @abstract Example for the TypeScript Logger Class
 *
 */
// Set up logger. If we are on a browser or in a Node environment, we can just
// use `console` as our console instance.
var logger = new Logger(console);
// We can use the default method `logger.log` and supply a log method, using
// the `LogLevel` 'struct':
logger.log(LogLevel.INFO, "This is a formatted info message.");
// We can also use the built-in methods:
logger.warn("The above log wasn't using built in messages! Come on, they are so much shorter and easier!");
// Running `logger.js` and `example.js` (the compiled version of the .ts files) will log to your console:
// 16:38:36 [INFO] This is a formatted info message.
// 16:38:36 [WARN] The above log wasn't using built in messages! Come on, they are so much shorter and easier! 
