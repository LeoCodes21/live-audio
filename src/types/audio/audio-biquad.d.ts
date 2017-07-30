/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

declare module "audio-biquad" {
    import * as Through from "audio-through";
    
    namespace Biquad {
        type FilterType = 'lowpass' 
            | 'highpass'
            | 'bandpass'
            | 'lowshelf'
            | 'highshelf'
            | 'peaking'
            | 'notch'
            | 'allpass';
        type BiquadOptions = {
            frequency: number;
            detune: number;
            Q: number;
            type: Biquad.FilterType;
        };
    }
    
    class Biquad extends Through {
        frequency: number;
        detune: number;
        Q: number;
        gain: number;
        type: Biquad.FilterType;
        
        constructor(options: Biquad.BiquadOptions);
        
        update(): void;
        process(buffer: Buffer): void;
        setNormalizedCoefficients(b0: number, b1: number, b2: number, a0: number, a1: number, a2: number);
        
        // Filter parameters
        setLowpassParams(cutoff: number, resonance: number): void;
        setHighpassParams(cutoff: number, resonance: number): void;
        setLowShelfParams(frequency: number, Q: number, dbGain: number): void;
        setHighShelfParams(frequency: number, Q: number, dbGain: number): void;
        setPeakingParams(frequency: number, Q: number, dbGain: number): void;
        setAllpassParams(frequency: number, Q: number): void;
        setNotchParams(frequency: number, Q: number): void;
        setBandpassParams(frequency: number, Q: number): void;
    }
    
    export = Biquad;
}