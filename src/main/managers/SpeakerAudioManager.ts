/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import AudioManager from '../AudioManager';
import * as ytdl from 'ytdl-core';
import * as Speaker from 'speaker';
import * as logger from '../logger';
import {assertHasValue} from '../utils';

import * as child_process from 'child_process';
import {Readable} from "stream";
import AudioAnalyser from "../AudioAnalyser";

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
        
        this.startFFmpegProcess(stream);
    }

    getName(): string {
        return 'Main (Speaker)';
    }
    
    private startFFmpegProcess(ytdlStream: Readable) {
        const process = child_process.spawn('ffmpeg', [
            '-i', '-', // stdin input
            '-f', 's16le', // signed 16-bit little-endian PCM
            '-ac', '2', // 2 channels
            '-ar', '44100', // 44,100 kHZ
            '-map', 'a', // audio only
            '-' // output to stdout
        ]);
        
        ytdlStream.pipe(process.stdin);
        
        process.stdout.on('data', chunk => {});
        process.stderr.on('data', chunk => {});
        
        process.stdout.pipe(this.speaker);
        
        process.on('exit', () => {
           this.speaker.close(); 
        });
    }
}