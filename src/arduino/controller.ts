/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */
import * as five from 'johnny-five';
import * as pixel from 'node-pixel';
import * as chroma from 'chroma-js';
import scaleNumber = require('scale-number-range');

import * as logger from '../main/logger';
import ArduinoAudioManager from '../main/managers/ArduinoAudioManager';
import {resolveAfter, ChromaColor, averageType, averageColor, cloneColor} from '../main/utils';

export default class ArduinoController {
    private board: five.Board;
    private strip: pixel.Strip;
    private averages: number[] = [];

    constructor(private audioManager: ArduinoAudioManager, private colors: ChromaColor[], private dominantColor: ChromaColor) {
        this.board = new five.Board({repl: false});
    }

    start(): Promise<void> {
        return new Promise<void>(resolve => {
            logger.debug(`all colors: ${this.colors.map(c => `${c.name()} - ${c.rgb()} / ${c.hex()}`).join('; ')}`);
            
            const primaryColor = this.dominantColor;
            // const primaryColor = this.colors[this.colors.length - 1];

            logger.debug(`primary color = ${primaryColor.name()} (${primaryColor.rgb()})`);
            logger.info(`Connecting to board...`);

            this.board.on('ready', () => {
                logger.info(`\u2713 Connected to board!`);
                logger.info(`Connecting to LED strip...`);

                this.strip = new pixel.Strip({
                    controller: 'FIRMATA',
                    board: this.board,
                    length: 175,
                    data: 6
                });

                this.strip.on('ready', async () => {
                    logger.info(`\u2713 Connected to LED strip!`);

                    this.strip.color("#000000");
                    this.strip.show();

                    await resolveAfter(500);

                    this.audioManager.analyser.on('newAverage', (average: number) => {
                        // logger.debug(`New average: ${average} | ${averageColor(averageType(average))}`); 

                        let scaledAvg = scaleNumber(average, 0, 72, 0, 1);
                        scaledAvg *= .45; // give it a bit more
                        logger.debug(`Average (original/scaled) - ${average} / ${scaledAvg}`);
                        
                        const clonedColor = cloneColor(primaryColor).luminance(scaledAvg);

                        for (let i = 0; i < this.strip.length; i++) {
                            this.strip.pixel(i).color(clonedColor.rgb());
                        }

                        this.strip.show();
                        
                        // logger.debug(`Running average: ${runningAvg} | Scaled average: ${scaledAvg} | Adjusted RGB: ${cloneColor(primaryColor).luminance(scaledAvg).rgb()}`);
                    });
                    
                    this.audioManager.on('ended', () => {
                        this.strip.color("#000000");
                        this.strip.show();
                        
                        process.exit(0);
                    });

                    resolve();
                });
            });
        });
    }
}