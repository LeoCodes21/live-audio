/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import {EventEmitter} from 'events';
import {Readable} from 'stream';

import * as Analyser from 'audio-analyser';
import {clampNumber, flatMap} from './utils';

const MAX_SAMPLE_SIZE = 15;

export default class AudioAnalyser extends EventEmitter {
    private analyzer: Analyser = new Analyser;

    private started: boolean = false;
    
    private lastSamples: number[][];

    public init(stream: Readable) {
        if (this.started) {
            throw new Error('Analyzer already active');
        }

        stream.pipe(this.analyzer);

        const dataArray = new Uint8Array(this.analyzer.frequencyBinCount);

        this.analyzer.on('data', () => {
            this.analyzer.getByteFrequencyData(dataArray);

            if (!this.lastSamples) {
                this.lastSamples = [];
            }

            if (this.lastSamples.length === MAX_SAMPLE_SIZE) {
                let noZeroes = [];
                
                for (let sample of this.lastSamples) {
                    for (let v of sample) {
                        noZeroes.push(v);
                    }
                }
                
                noZeroes = noZeroes.map(n => Math.round(n))
                    .map(n => clampNumber(n, 0, 255))
                    .filter(v => v > 0);
                const avg = (noZeroes.reduce((p, c) => p + c, 0) / noZeroes.length) || 0;
                
                this.emit('newAverage', avg);
                
                this.lastSamples = [];
            } else {
                this.lastSamples.push(Array.from(dataArray));
            }
            
            //
            // this.emit('newAverage', avg);
        });

        this.started = true;
    }
    
    getAnalyzer(): Analyser {
        return this.analyzer;
    }
}