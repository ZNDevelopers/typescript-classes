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
 * TypeScript Logger Class
 * @abstract Creates custom loggers to log to the console.
 *
 */
/**
 * LogLevel class
 * @abstract Log levels for Logger class
 */
var LogLevel = (function () {
    /**
     * @constructor LogLevel constructor. So that the static methods can
     * be like a struct.
     *
     * @param {number} level The level, can be any number that is not used yet
     */
    function LogLevel(level) {
        this._level = level;
    }
    // The below `public static` properties are similar to a struct,
    // but there is no structs in TypeScript so these are what I came
    // up with.
    LogLevel.INFO = new LogLevel(1);
    LogLevel.WARN = new LogLevel(2);
    LogLevel.ERROR = new LogLevel(3);
    LogLevel.SEVERE = new LogLevel(4);
    return LogLevel;
}());
/**
 * Logger class
 * @abstract The main logger class. Has different levels to log with,
 * as well as a main log function (requires a LogLevel parameter)
 */
var Logger = (function () {
    function Logger(consoleInstance, canUseColors, colorsObject) {
        // No console class yet, so the console instance is a type any
        this._consoleInstance = { log: function () { } };
        // If we can use colors in the console, this will be true.
        this._canUseColors = false;
        // If we can use colors, the below will be an object where
        // properties of the color names are set to values that change
        // the color in the console to be the wanted color.
        // Format: `colorMessage:string = _colorObject[color](message)`
        this._colorObject = {};
        this._consoleInstance = consoleInstance;
        if (canUseColors) {
            this._canUseColors = true;
            this._colorObject = colorsObject;
        }
    }
    /**
     * Logs to the console, using the provided Console.
     *
     * @param {LogLevel} level The level to log using
     * @param {string} message The message to log
     */
    Logger.prototype.log = function (level, message) {
        var thisVar = this;
        var prefix = (level == LogLevel.INFO ? "INFO" :
            level == LogLevel.WARN ? "WARN" :
                level == LogLevel.ERROR ? "ERROR" :
                    level == LogLevel.SEVERE ? "SEVERE" :
                        "INFO");
        if (this._canUseColors) {
            var colorFunction = function (color, message) {
                return this._colorObject[color](message);
            };
            var color = (level == LogLevel.INFO ? "green" :
                level == LogLevel.WARN ? "yellow" :
                    level == LogLevel.ERROR ? "red" :
                        level == LogLevel.SEVERE ? "bgRed" :
                            "white");
            this._consoleInstance.log("%s [%s] " + "%s"[color], new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), prefix, message);
        }
        else {
            this._consoleInstance.log("%s [%s] %s", new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), prefix, message);
        }
    };
    /**
     * Logs info to the provided console.
     *
     * @param {string} message The message to log
     */
    Logger.prototype.info = function (message) {
        this.log(LogLevel.INFO, message);
    };
    /**
     * Logs a warn message to the provided console.
     *
     * @param {string} message The message to log
     */
    Logger.prototype.warn = function (message) {
        this.log(LogLevel.WARN, message);
    };
    /**
     * Logs an error to the provided console.
     *
     * @param {string} message The message to log
     */
    Logger.prototype.error = function (message) {
        this.log(LogLevel.ERROR, message);
    };
    /**
     * Logs a severe error to the provided console.
     *
     * @param {string} message The message to log
     */
    Logger.prototype.severe = function (message) {
        this.log(LogLevel.SEVERE, message);
    };
    return Logger;
}());
