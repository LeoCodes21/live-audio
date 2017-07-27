/*
 * Live-Audio
 * Copyright (c) 2017 heyitsleo <coderleo42@gmail.com>
 * Not licensed.
 */

import * as j5 from 'johnny-five';
import * as logger from '../main/logger';

const board = new j5.Board();

board.on('ready', () => {
    logger.info('Connected to Arduino!');
});