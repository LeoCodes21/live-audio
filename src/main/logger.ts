/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

/// <reference path='../types/fancy-log.d.ts' />

import * as fancyLog from 'fancy-log';
import * as chalk from 'chalk';

export function info(msg: chalk.ChalkChain | string) : void {
    fancyLog.info(`${chalk.bgGreen.black('[info]')} ${msg}`);
}

export function warn(msg: chalk.ChalkChain | string) : void {
    fancyLog.warn(`${chalk.bgYellow.black('[warn]')} ${msg}`);
}

export function error(msg: chalk.ChalkChain | string) : void {
    fancyLog.error(`${chalk.bgRed.black('[error]')} ${msg}`);
}