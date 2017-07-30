/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

declare module "color-thief" {
    namespace ColorThief {
        export type Image = Buffer | string;    
        export type Color = [number, number, number];
    }
    
    class ColorThief {
        getColor(sourceImage: ColorThief.Image, quality: boolean | number, allowWhite?: boolean) : ColorThief.Color;
        
        getPalette(sourceImage: ColorThief.Image, colorCount?: number, quality?: number, allowWhite?: boolean) : ColorThief.Color[];
        
        getPaletteFromPixels(pixels: number[], pixelCount: number, colorCount: number, quality: number, allowWhite?: boolean);
    }
    
    export = ColorThief;
}