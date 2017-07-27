/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

declare module "fancy-log" {
    namespace FancyLog {
        function info(...args: any[]): void;
        
        function dir(...args: any[]): void;
        
        function warn(...args: any[]): void;
        
        function error(...args: any[]): void;
    }
    
    function FancyLog(...args: any[]);

    export = FancyLog;
}