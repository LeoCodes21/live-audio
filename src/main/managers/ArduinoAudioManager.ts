/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import AudioManager from '../AudioManager';
import AudioAnalyser from "../AudioAnalyser";

export default class ArduinoAudioManager implements AudioManager {
    constructor(private audioAnalyser: AudioAnalyser) {}
    
    start(url: string): void {
    }

    getName(): string {
        return 'Arduino (johnny-five)';
    }
}