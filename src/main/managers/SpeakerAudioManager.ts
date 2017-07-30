/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import AudioManager from '../AudioManager';
import * as ytdl from 'ytdl-core';
import * as Speaker from 'speaker';
import * as logger from '../logger';
import {assertHasValue, runFfmpeg} from '../utils';
import {Readable} from 'stream';
import AudioAnalyser from '../AudioAnalyser';
import {ChildProcess} from "child_process";

export default class SpeakerAudioManager implements AudioManager {
    private readonly speaker = new Speaker({
       channels: 2,
       bitDepth: 16,
       sampleRate: 44100 
    });
    
    constructor(private audioAnalyser: AudioAnalyser) {}
    
    start(url: string) {
        assertHasValue(url, 'No URL!');
        
        logger.info(`Starting stream...`);
        
        const stream = ytdl(url);
        const process = this.startFFmpegProcess(stream);

        this.audioAnalyser.init(process.stdout);
    }

    getName(): string {
        return 'Main (Speaker)';
    }
    
    private startFFmpegProcess(ytdlStream: Readable) : ChildProcess {
        const process = runFfmpeg(ytdlStream);
        
        process.stdout.pipe(this.speaker);
        
        process.on('exit', () => {
           this.speaker.close(); 
        });
        
        return process;
    }

    get analyser() {
        return this.audioAnalyser;
    }
}