/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

Array.prototype.average = () => {
    return this.reduce((p, c) => p + c, 0) / this.length;
};

Uint8Array.prototype.average = () => {
    return this.reduce((p, c) => p + c, 0) / this.length;
};