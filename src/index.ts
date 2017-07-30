/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import * as path from 'path';
import * as yargs from 'yargs';
import * as utils from './main/utils';
import * as logger from './main/logger';

import MainModule from "./main/MainModule";
import ArduinoModule from "./arduino/ArduinoModule";

const configPath = path.resolve(__dirname, '..', 'config.json');

utils.ensureValidConfig(configPath);

const options = yargs
    .usage("Usage: $0 <url> [--arduino]")
    .command("url", "YouTube video URL", {})
    .required(1, "URL is required")
    .option("arduino", {describe: "Enable Arduino functionality", type: "boolean"})
    .help("?")
    .alias("?", "help")
    .epilog("Copyright 2017 heyitsleo")
    .argv;

// Get the URL from the first parameter
const url = options._[0];

const arduinoEnabled = options.arduino || false;

new MainModule(
    utils.loadConfig(configPath).googleApiKey, url,
    arduinoEnabled
).start();