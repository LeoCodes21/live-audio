/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import ArduinoAudioManager from '../main/managers/ArduinoAudioManager';
import * as five from 'johnny-five';
import * as pixel from 'node-pixel';
import * as logger from '../main/logger';
import * as chroma from 'chroma-js';

const fps = 20;

export default function start(audioManager: ArduinoAudioManager, colors): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const board = new five.Board({
            repl: false
        });

        logger.info("Connecting to board...");

        board.on('ready', () => {
            logger.info(`\u2713 Connected to board!`);
            logger.info("Setting up strip...");

            const strip = new pixel.Strip({
                data: 6,
                length: 50,
                board,
                controller: 'FIRMATA'
            });

            strip.on('ready', () => {
                logger.info(`\u2713 Strip ready!`);

                audioManager.analyser.on('averages', ([data, oldData]) => {
                    const newColor = chroma(data);
                    const oldColor = chroma(oldData);
                    const blend = chroma.blend(newColor, oldColor, "darken");

                    strip.color(blend.rgb());
                    strip.show();
                });

                audioManager.on('end', () => {
                    strip.color("#000000");
                    strip.show();
                });

                // dynamicRainbow(fps);
                resolve();
            });

            function dynamicRainbow(delay) {
                console.log('dynamicRainbow');

                var showColor;
                var cwi = 0; // colour wheel index (current position on colour wheel)
                var foo = setInterval(function () {
                    if (++cwi > 255) {
                        cwi = 0;
                    }

                    for (var i = 0; i < strip.length; i++) {
                        showColor = colorWheel(( cwi + i ) & 255);
                        strip.pixel(i).color(showColor);
                    }
                    strip.show();
                }, 1000 / delay);
            }

            // Input a value 0 to 255 to get a color value.
            // The colors are a transition r - g - b - back to r.
            function colorWheel(WheelPos) {
                var r, g, b;
                WheelPos = 255 - WheelPos;

                if (WheelPos < 85) {
                    r = 255 - WheelPos * 3;
                    g = 0;
                    b = WheelPos * 3;
                } else if (WheelPos < 170) {
                    WheelPos -= 85;
                    r = 0;
                    g = WheelPos * 3;
                    b = 255 - WheelPos * 3;
                } else {
                    WheelPos -= 170;
                    r = WheelPos * 3;
                    g = 255 - WheelPos * 3;
                    b = 0;
                }
                // returns a string with the rgb value to be used as the parameter
                return "rgb(" + r + "," + g + "," + b + ")";
            }
        });
    });
}