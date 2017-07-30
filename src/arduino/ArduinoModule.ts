/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import ArduinoAudioManager from "../main/managers/ArduinoAudioManager";
import { default as startBot } from './bot';
import { normalizeArrayColors } from "../main/utils/helpers";

export default class ArduinoModule {
    private colors;
    private mainColor;
    
    constructor(private audioManager: ArduinoAudioManager, colors: [number, number, number][]) {
        this.colors = normalizeArrayColors(colors);
        this.mainColor = this.colors[0];
    }
    
    start() : Promise<void> {
        return startBot(this.audioManager, this.colors);
    }
}