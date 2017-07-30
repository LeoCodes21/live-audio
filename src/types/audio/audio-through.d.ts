/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */


declare module "audio-through" {
    import {Transform} from 'stream';

    namespace Through {
        type ThroughOptions = {
            format: any;
        };
    }

    class Through extends Transform {
        count: number;
        time: number;
        frame: number;

        inputsCount: number;
        outputsCount: number;

        constructor(fn: Function | Through.ThroughOptions, options?: Through.ThroughOptions);
        
        end(): void;
        doTasks(): this;
        error(error: Error | string): this;
        log(...args: any[]): this;
        process(buffer: Buffer): void;
    }

    export = Through;
}