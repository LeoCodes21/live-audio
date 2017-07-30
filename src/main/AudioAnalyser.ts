/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import {EventEmitter} from "events";

import * as Analyser from 'audio-analyser';
import {Readable} from "stream";

export default class AudioAnalyser extends EventEmitter {
    private analyzer: Analyser = new Analyser;

    private started: boolean = false;

    private lastAverages: [number, number, number] = [0, 0, 0];
    
    public init(stream: Readable) {
        if (this.started) {
            throw new Error('Analyzer already active');
        }

        stream.pipe(this.analyzer);

        const dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
        
        this.analyzer.on('data', () => {
            this.analyzer.getByteFrequencyData(dataArray);
        });
        
        this.started = true;
    }
}