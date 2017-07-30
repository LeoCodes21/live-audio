/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */


declare module "node-pixel" {
    import { Board } from "johnny-five";
    import { EventEmitter } from "events";
    import * as Firmata from "firmata";
    
    namespace NodePixel {
        const SHIFT_FORWARD = 0x20,
            SHIFT_BACKWARD = 0x00;
        
        type StripOptions = {
            data?: number;
            length?: number;
            board?: Board;
            controller: 'FIRMATA' | 'I2CBACKPACK';
            firmata?: Firmata;
            lengths?: [ [number, number] ] | [number];
            gamma?: number;
            stripShape?: [ { pin: number, length: number} | number ];
        };
        
        type PixelOptions = {
            addr: number;
            firmata?: Firmata;
            port?: number;
            controller: 'FIRMATA' | 'I2CBACKPACK';
            i2c_address?: string;
            strip: Strip;
        };
        
        type PixelColorOptions = {
            sendmsg?: Function;
        };
        
        export class Pixel {
            constructor(options: PixelOptions);
            
            address: number;
            
            // off() = clear()
            off() : void;
            clear() : void;
            
            // colour() = color()
            colour(color: number | string | [number, number, number], options?: PixelColorOptions);
            color(color: number | string | [number, number, number], options?: PixelColorOptions);

            show() : void;
        }
        
        export class Strip extends EventEmitter {
            
            constructor(options: StripOptions);
            
            readonly length: number;
            readonly gamma: number;
            readonly gtable: [number];
            
            on(event: 'ready', listener: () => void): this;
            
            pixel(addr: number): Pixel;

            // colour() = color()
            colour(color: number | string | [number, number, number], options?: PixelColorOptions);
            color(color: number | string | [number, number, number], options?: PixelColorOptions);
            
            // off() = clear()
            off();
            clear();
            
            shift(amt: number, direction: 0x20 | 0x00, wrap: boolean);
            
            show() : void;
        }
    }
    
    export = NodePixel;
}