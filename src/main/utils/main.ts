/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */
import {Readable} from "stream";
import {ChildProcess, spawn} from "child_process";

export function runFfmpeg(inputStream: Readable) : ChildProcess {
    const process = spawn('ffmpeg', [
        '-i', '-', // stdin input
        '-f', 's16le', // signed 16-bit little-endian PCM
        '-ac', '2', // 2 channels
        '-ar', '44100', // 44,100 kHZ
        '-map', 'a', // audio only,
        '-progress', 'pipe:2', // pipe progress info to stderr
        '-' // output to stdout 
    ]);

    inputStream.pipe(process.stdin);

    process.stdout.on('data', chunk => {});
    process.stderr.on('data', chunk => {});

    return process;
}