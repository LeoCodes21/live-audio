/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import * as chroma from 'chroma-js';
import * as rp from 'request-promise';
import * as ColorThief from 'color-thief';
import * as chalk from "chalk";

const thief = new ColorThief;
const dummyColor = chroma(0, 0, 0);

export type ChromaColor = typeof dummyColor;
export type AverageType = 'HIGH' | 'MEDIUM' | 'LOW';
export type ColorResults = {
    palette: ChromaColor[];
    dominant: ChromaColor;
};

export function extractColors(id: string) {
    const url = `https://img.youtube.com/vi/${id}/default.jpg`;

    return rp(url, { encoding: null })
        .then((r) : ColorResults => {
            return {
                palette: thief.getPalette(r, 8, 10, false).map(cArr => {
                    return chroma(cArr);
                }),
                dominant: chroma(thief.getColor(r, 10))
            }
        });
}

export function normalizeArrayColors(colorArray: [number, number, number][]) : ChromaColor[] {
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
    return new Promise<void>(resolve => {
       setTimeout(() => resolve(), millis); 
    });
}

export function arrayAverage(array: number[]): number {
    return array.reduce((p, c) => p + c, 0);
}

export function clampNumber(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}

export function averageType(average: number): AverageType {
    if (average >= 50)
        return 'HIGH';
    else if (average >= 30)
        return 'MEDIUM';
    else
        return 'LOW';
}

export function averageColor(type: AverageType): string {
    switch (type) {
        case 'HIGH':
            return chalk.green('HIGH');
        case 'MEDIUM':
            return chalk.yellow('MEDIUM');
        case 'LOW':
            return chalk.red('LOW');
    }
}

export function cloneColor(color: ChromaColor): ChromaColor {
    return chroma(color.rgb());
}

export function flatMap<T, U>(array: T[], mapFunc: (x: T) => U[]) : U[] {
    return array.reduce((cumulus: U[], next: T) => [...mapFunc(next), ...cumulus], <U[]> []);
}