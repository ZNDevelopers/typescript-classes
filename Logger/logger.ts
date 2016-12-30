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
class LogLevel {
    // The below `public static` properties are similar to a struct,
    // but there is no structs in TypeScript so these are what I came
    // up with.
    public static INFO:LogLevel = new LogLevel(1);
    public static WARN:LogLevel = new LogLevel(2);
    public static ERROR:LogLevel = new LogLevel(3);
    public static SEVERE:LogLevel = new LogLevel(4);

    // Stores the inputted level from the above properties so that each
    // instance of LogLevel is different.
    private _level:number;

    /**
     * @constructor LogLevel constructor. So that the static methods can
     * be like a struct.
     *
     * @param {number} level The level, can be any number that is not used yet
     */
    constructor(level:number) {
        this._level = level;
    }
}

/**
 * Logger class
 * @abstract The main logger class. Has different levels to log with,
 * as well as a main log function (requires a LogLevel parameter)
 */
class Logger {

    // No console class yet, so the console instance is a type any
    private _consoleInstance:any = {log: function(){}};

    // If we can use colors in the console, this will be true.
    private _canUseColors:boolean = false;

    // If we can use colors, the below will be an object where
    // properties of the color names are set to values that change
    // the color in the console to be the wanted color.
    // Format: `colorMessage:string = _colorObject[color](message)`
    private _colorObject:Object = {};

    /**
     * @constructor Logger constructor. Takes in the console to use,
     * as we currently don't know if the class is used in CommonJS
     * or a browser etc.
     *
     * @param consoleInstance The console instance to use when logging
     */
    constructor(consoleInstance:any);
    constructor(consoleInstance:any, canUseColors?:boolean, colorsObject?:Object) {
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
    public log(level:LogLevel, message:string):void {
        let thisVar = this;

        let prefix:string = (
            level == LogLevel.INFO ? "INFO" :
                level == LogLevel.WARN ? "WARN" :
                    level == LogLevel.ERROR ? "ERROR" :
                        level == LogLevel.SEVERE ? "SEVERE" :
                            "INFO"
        );

        if (this._canUseColors) {
            let colorFunction = function(color:string, message:string) {
                return this._colorObject[color](message);
            };

            let color:string = (
                level == LogLevel.INFO ? "green" :
                    level == LogLevel.WARN ? "yellow" :
                        level == LogLevel.ERROR ? "red" :
                            level == LogLevel.SEVERE ? "bgRed" :
                                "white"
            );

            this._consoleInstance.log("%s [%s] " + "%s"[color], `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, prefix, message);
        } else {
            this._consoleInstance.log("%s [%s] %s", `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, prefix, message);
        }
    }

    /**
     * Logs info to the provided console.
     *
     * @param {string} message The message to log
     */
    public info(message:string):void {
        this.log(LogLevel.INFO, message);
    }

    /**
     * Logs a warn message to the provided console.
     *
     * @param {string} message The message to log
     */
    public warn(message:string):void {
        this.log(LogLevel.WARN, message);
    }

    /**
     * Logs an error to the provided console.
     *
     * @param {string} message The message to log
     */
    public error(message:string):void {
        this.log(LogLevel.ERROR, message);
    }

    /**
     * Logs a severe error to the provided console.
     *
     * @param {string} message The message to log
     */
    public severe(message:string):void {
        this.log(LogLevel.SEVERE, message);
    }

}