/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import ArduinoAudioManager from '../main/managers/ArduinoAudioManager';
import { normalizeArrayColors, ChromaColor } from '../main/utils';
import ArduinoController from './controller';

export default class ArduinoModule {
    private colors: ChromaColor[];
    
    constructor(private audioManager: ArduinoAudioManager, colors: [number, number, number][], private dominantColor: ChromaColor) {
        this.colors = normalizeArrayColors(colors);
    }
    
    start() : Promise<void> {
        return new ArduinoController(this.audioManager, this.colors, this.dominantColor)
            .start();
    }
}