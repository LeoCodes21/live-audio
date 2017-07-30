/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import AudioAnalyser from "./AudioAnalyser";

interface AudioManager {
    start(url: string): void;

    getName(): string;
    
    readonly analyser: AudioAnalyser;
}

declare let AudioManager: {
    new (audioAnalyser: AudioAnalyser): any;
};

export default AudioManager;