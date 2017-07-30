/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import * as fs from 'fs';

export interface Config {
    googleApiKey: string;
}

export function ensureValidConfig(path: string) {
    if (!fs.existsSync(path)) {
        console.error(`[L-A] Config file not found.`);
        process.exit(1);
        return;
    }

    const config = loadConfig(path);

    if (!config.googleApiKey) {
        console.error(`[L-A] Config file has no Google API key.`);
        process.exit(1);
        return;
    }
}

export function loadConfig(path: string) : Config {
    return require(path);
}