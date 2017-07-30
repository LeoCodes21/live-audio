/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import {EventEmitter} from "events";

import * as Analyser from 'audio-analyser';
import * as Biquad from 'audio-biquad';
import {Readable} from "stream";
import * as chalk from 'chalk';
import * as logger from './logger';

export default class AudioAnalyser extends EventEmitter {
    private analyzer: Analyser = new Analyser;

    private started: boolean = false;

    private lastAverages: [number, number, number] = [0, 0, 0];
    
    public init(stream: Readable) {
        if (this.started) {
            throw new Error('Analyzer already active');
        }

        stream.pipe(this.analyzer);
            // .pipe(new Biquad({
            //     type: 'lowpass',
            //     frequency: 150,
            //     Q: 1,
            //     detune: 0
            // }));

        const dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
        
        this.analyzer.on('data', () => {
            // logger.info('The analyzer has data!');
            this.analyzer.getByteFrequencyData(dataArray);

            this.emit('hasData', dataArray);

            //
            // const joined = Array(dataArray).map(v => {
            //     return chalk.cyan(`${v}`);
            // }).join(chalk.gray(', '));
            //
            // logger.info(`Analyzer frequencies: ${joined}`);
            //
            const first = dataArray.slice(0, 86);
            const second = dataArray.slice(86, 172);
            const third = dataArray.slice(172, 256);
            
            const [firstAvg, secondAvg, thirdAvg] = [
                (first.reduce((p, c) => p + c, 0) / first.length) * 0.6,
                (second.reduce((p, c) => p + c, 0) / second.length) * 0.4,
                (third.reduce((p, c) => p + c, 0) / third.length) * 0.2
            ];
            
            const old = this.lastAverages;
            
            this.lastAverages = [Math.round(firstAvg), Math.round(secondAvg), Math.round(thirdAvg)];
            
            let diffs = [0, 0, 0];
            
            for (let i = 0; i < old.length; i++) {
                diffs[i] = this.lastAverages[i] - old[i];
                
                if (Math.abs(diffs[i]) > 30) {
                    if (diffs[i] < 0) {
                        this.lastAverages[i] -= 30;
                    } else {
                        this.lastAverages[i] += 30;
                    }
                }
            }
            
            this.emit('averages', [this.lastAverages, old]);
            
            // this.emit('averages', [firstAvg, secondAvg, thirdAvg]);
        });
        
        this.started = true;
    }
}