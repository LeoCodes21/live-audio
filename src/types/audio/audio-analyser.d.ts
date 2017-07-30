/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */


declare module "audio-analyser" {
    import {Writable} from "stream";

    class Analyser extends Writable {
        minDecibels: number;
        maxDecibels: number;
        fftSize: number;
        smoothingTimeConstant: number;
        frequencyBinCount: number;
        throttle: number;
        bufferSize: number;
        channel: number;

        applyWindow: Function;

        getFloatFrequencyData(arr: Float32Array);

        getByteFrequencyData(arr: Uint8Array);

        getFloatTimeDomainData(arr: Float32Array);

        getByteTimeDomainData(arr: Uint8Array);

        getFrequencyData(size?: number): number[];

        getTimeData(size?: number): number[];
    }

    namespace Analyser {

    }

    export = Analyser;
}