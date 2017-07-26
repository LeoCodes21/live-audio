/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import * as chroma from 'chroma-js';
import * as rp from 'request-promise';

const ColorThief = require('color-thief');
const thief = new ColorThief;

export default function extract(id: string) {
    const url = `https://img.youtube.com/vi/${id}/default.jpg`;
    
    return rp(url, { encoding: null })
        .then(r => {
            return thief.getPalette(r, 8, 10, false).map(cArr => {
               return chroma(cArr); 
            });
        });
}