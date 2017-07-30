/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import * as chroma from 'chroma-js';
import * as rp from 'request-promise';
import * as ColorThief from 'color-thief';

const thief = new ColorThief;

export function extractColors(id: string) {
    const url = `https://img.youtube.com/vi/${id}/default.jpg`;

    return rp(url, { encoding: null })
        .then(r => {
            return thief.getPalette(r, 8, 10, false).map(cArr => {
                return chroma(cArr);
            });
        });
}

export function normalizeArrayColors(colorArray: [number, number, number][]) {
    return colorArray.map(a => chroma(a));
}

export function normalizeChromaColors(colorArray: any[]) : [number, number, number][] {
    return colorArray.map(a => a.rgb());
}

export function assertHasValue(val: any, msg?: string) : void {
    if (typeof val === 'undefined' || val === null) {
        throw new Error(`${msg ? msg : `Value not given`}`);
    }
}

export function range(start: number, count: number) : number[] {
    return Array.apply(0, Array(count))
        .map(function (element, index) {
            return index + start;
        });
}

export function resolveAfter(millis: number) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
       setTimeout(() => resolve(), millis); 
    });
}

export function arrayAverage(array: number[]): number {
    return array.reduce((p, c) => p + c, 0);
}

export function clampNumber(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}