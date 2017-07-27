/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

declare module "iso8601-duration" {
    namespace IsoDuration {
        export type ParsedResult = {
            years: number;
            months: number;
            days: number;
            hours: number;
            minutes: number;
            seconds: number;
        }

        /** 
         * Parse PnYnMnDTnHnMnS format to object
         * 
         * @param {string} durationString - PnYnMnDTnHnMnS formatted string
         * @return {Object} - With a property for each part of the pattern
         */
        export function parse(durationString: string): ParsedResult;

        /**
         * Convert ISO8601 duration object to seconds
         *
         * @param {Object} duration - The duration object
         * @param {Date=} startDate - The starting point for calculating the duration
         * @return {Number}
         */
        export function toSeconds(duration: ParsedResult, startDate: Date): number;

        /**
         * The ISO8601 regex for matching / testing durations
         */
        export const pattern: RegExp;
    }

    export = IsoDuration;
}