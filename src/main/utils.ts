/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

const ColorThief = require('color-thief');
const thief = new ColorThief;

import * as chroma from 'chroma-js';
import * as rp from 'request-promise';

import * as fs from 'fs';

export interface Config {
    googleApiKey: string;
}

export function extractColors(id: string) {
    const url = `https://img.youtube.com/vi/${id}/default.jpg`;
    
    return rp(url, { encoding: null })
        .then(r => {
            return thief.getPalette(r, 8, 10, false).map(cArr => {
               return chroma(cArr); 
            });
        });
}

export function ensureValidConfig(path: string) {
    if (!fs.existsSync(path)) {
        console.error(`[L-A] Config file not found.`);
        process.exit(1);
        return;
    }
    
    const config = require(path);
    
    if (!config['googleApiKey']) {
        console.error(`[L-A] Config file has no Google API key.`);
        process.exit(1);
        return;
    }
}

export function loadConfig(path: string) : Config {
    return require(path);
}

export function assertHasValue(val: any, msg?: string) {
    if (typeof val === 'undefined' || val === null) {
        throw new Error(`${msg ? msg : `Value not given`}`);
    }
}