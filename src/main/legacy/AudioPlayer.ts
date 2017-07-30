/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

/// <reference path='../../types/audio/speaker.d.ts' />
/// <reference path='../../types/audio/audio-analyser.d.ts' />

import * as ytdl from 'ytdl-core';
import * as child_process from 'child_process';
import * as Speaker from 'speaker';
import * as Analyser from 'audio-analyser';
import * as path from "path";

export default class AudioPlayer {
    // any[] because chroma.js doesn't export anything except ChromaStatic
    constructor(private colors: any[]) { }
    
    /**
     * Play a song.
     *
     * @param {string} url
     */
    play(url: string) {
        const speaker = new Speaker({
            channels: 2, // 2 channels
            bitDepth: 16, // 16-bit samples
            sampleRate: 44100 // 44,100 Hz sample rate
        }), analyser = new Analyser, ytdlStream = ytdl(url);
        
        analyser.fftSize = 256;
        
        ytdlStream.setMaxListeners(9001); // bad hack to avoid warnings
        
        const ffmpegProcess = child_process.spawn('ffmpeg', [
            '-i', '-', // input from stdin
            '-f', 's16le', // signed 16-bit little-endian PCM
            '-ac', '2', // 2 channels
            '-ar', '44100', // 44,100 Hz
            '-map', 'a', // audio only
            '-' // output to stdout
        ]);
        
        const canvasProcess = child_process.fork(path.resolve(__dirname, 'CanvasProcess.ts'));
        
        ytdlStream.pipe(ffmpegProcess.stdin);
        
        const ffmpegOut = ffmpegProcess.stdout;
        const ffmpegErr = ffmpegProcess.stderr;
        
        ffmpegOut.on('data', chunk => {}); // yet another bad hack
        ffmpegErr.on('data', chunk => {}); // yet another bad hack
        ffmpegOut.setMaxListeners(9001); // another bad hack
        
        ffmpegOut.pipe(analyser);
        ffmpegOut.pipe(speaker);

        const dataArray = new Float32Array(analyser.frequencyBinCount);
        
        canvasProcess.send({ type: 'setColors', colors: this.colors });
        
        analyser.on('data', () => {
           // console.log('Analyser has data');
           analyser.getFloatFrequencyData(dataArray);
           canvasProcess.send({
               type: 'audioFreq',
               frequencies: dataArray
           });
        });
    }
}