/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

declare module "scale-number-range" {
    function scaleNumberRange(number: number, oldMin: number, oldMax: number, newMin: number, newMax: number): number;
    
    export = scaleNumberRange;
}