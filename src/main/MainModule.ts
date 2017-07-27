/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import * as ytdl from 'ytdl-core';
import * as logger from './logger';
import YoutubeSearch from './YoutubeSearch';
import * as chalk from 'chalk';

import SpeakerAudioManager from './managers/SpeakerAudioManager';
import AudioManager from './AudioManager';
import ArduinoAudioManager from "./managers/ArduinoAudioManager";
import AudioAnalyser from "./AudioAnalyser";

export default class MainModule {
    constructor(private googleKey: string, private videoUrl: string, private arduinoEnabled: boolean) {}
    
    start() {
        const audioManager = this.chooseAudioManager();
        const search = new YoutubeSearch(this.googleKey);
        
        logger.info(`Starting Live-Audio...`);
        logger.info(`Video URL: ${chalk.green(this.videoUrl)}`);
        
        search.findVideoByUrl(this.videoUrl).then(video => {
            logger.info(`\u2713 Found video! Title: ${chalk.green(video.title)} / author: ${video.channel.title}`);
            logger.info(`Using audio manager: ${chalk.yellow.bold(audioManager.getName())}`);
            
            audioManager.start(this.videoUrl);
        }).catch(err => {
            logger.error(`\u274c Could not find video.`);
        });
    }
    
    private chooseAudioManager() : AudioManager {
        return this.arduinoEnabled 
            ? new ArduinoAudioManager(new AudioAnalyser)
            : new SpeakerAudioManager(new AudioAnalyser);
    }
}