/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import AudioManager from '../AudioManager';
import AudioAnalyser from "../AudioAnalyser";
import {assertHasValue, runFfmpeg} from "../utils";
import * as logger from '../logger';
import * as ytdl from 'ytdl-core';
import {Readable} from "stream";
import {ChildProcess} from "child_process";
import * as Speaker from 'speaker';
import {EventEmitter} from "events";

export default class ArduinoAudioManager extends EventEmitter implements AudioManager {
    private readonly speaker = new Speaker({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100
    });
    
    constructor(private audioAnalyser: AudioAnalyser) {
        super();
    }
    
    start(url: string): void {
        assertHasValue(url, 'No URL!');

        logger.info(`Starting stream...`);

        const stream = ytdl(url);
        const process = this.startFFmpegProcess(stream);

        this.audioAnalyser.init(process.stdout);

        logger.debug(`Piping to speaker`);
        process.stdout.pipe(this.speaker);
    }

    getName(): string {
        return 'Arduino (johnny-five)';
    }

    private startFFmpegProcess(ytdlStream: Readable) : ChildProcess {
        const process = runFfmpeg(ytdlStream);

        process.on('exit', () => {
            logger.info(`FFmpeg exited`);
            this.speaker.close();
            this.emit("end");
        });
        
        return process;
    }
    
    get analyser() {
        return this.audioAnalyser;
    }
}