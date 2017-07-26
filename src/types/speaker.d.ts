/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

declare module "speaker" {
    import {Writable} from "stream";

    class Speaker extends Writable {
        samplesPerFrame: number;
        audio_handle: number;
        
        constructor(opts?: Speaker.SpeakerOptions);
        
        open() : number;
        
        close() : void;
    }

    namespace Speaker {
        const api_version: string;
        const description: string;
        const module_name: string;
        
        interface SpeakerOptions {
            // Buffer settings
            lowWaterMark?: number;
            highWaterMark?: number;
            
            // PCM settings
            channels?: number;
            bitDepth?: number;
            sampleRate?: number;
            float?: boolean;
            signed?: boolean;
            samplesPerFrame?: number;
            endianness?: 'BE' | 'LE';
        }
    }

    export = Speaker;

    // class Speaker {
    //    
    // }
    //
    // export let api_version: string;
    // export default Speaker;
}