/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import {writeFileSync} from "fs";
import * as chroma from 'chroma-js';

let colors = [];
const bufferLength = 512; // frequencyBinCount

const Canvas = require('canvas');
const canvas = new Canvas(640, 100);
const ctx = canvas.getContext('2d');
const leftpad = require('leftpad');

const WIDTH = canvas.width, HEIGHT = canvas.height;

ctx.clearRect(0, 0, WIDTH, HEIGHT);

let frame = 1;

process.on('message', (msg) => {
    if (msg.type === 'audioFreq') {
        let frequencies = Object.keys(msg.frequencies).map(k => msg.frequencies[k]);

        // console.log('Frequencies: ', frequencies);

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        let barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        // console.log(`bar width = `, barWidth);

        for (let i = 0; i < bufferLength; i++) {
            barHeight = (frequencies[i] + 140) * 2;

            const rawColor = colors[i % colors.length];
            const color = chroma(rawColor[0], rawColor[1], rawColor[2], rawColor[3]);
            
            ctx.fillStyle = `rgb(${color.rgb().join(',')}`;
            // ctx.fillStyle = `rgb(${Math.floor(barHeight + 100)},50,50)`;
            ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }

        writeFileSync(`frames/${leftpad(frame++, 5)}.png`, canvas.toBuffer());
    } else if (msg.type === 'setColors') {
        let normalizedColors = msg.colors.map(e => {
            const rgb = e._rgb;
            
            return [rgb[0], rgb[1], rgb[2], rgb[3]];
        });
        
        console.log(`[CVP] Setting colors to`, normalizedColors);
        
        colors = normalizedColors;
    }
});