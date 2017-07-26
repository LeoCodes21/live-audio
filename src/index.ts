import YoutubeSearch from './YoutubeSearch';
import AudioPlayer from './AudioPlayer';
import * as path from 'path';
import * as fs from 'fs';
import extractColors from './ColorExtractor';

const configPath = path.resolve(__dirname, '..', 'config.json');

if (!fs.existsSync(configPath)) {
    console.error('no config');
    process.exit(1);
}

const config = require(configPath);

if (!config.googleApiKey) {
    console.error('no google api key');
    process.exit(1);
}

if (process.argv.length <= 2) {
    console.error('Usage: ./node_modules/.bin/ts-node ./src/index.ts [youtube url]');
    process.exit(1);
}

const url = process.argv[2];
const search = new YoutubeSearch(config.googleApiKey);

console.info(`[L-A] Looking up '${url}'...`);

search.findVideoByUrl(url).then(video => {
    console.info(`[L-A] Found video: ${video.title}`);
    
    extractColors(video.id).then(colors => {
        console.info(`[L-A] Thumbnail colors are`, colors);
        new AudioPlayer(colors).play(url);
    });
}).catch(err => {
    console.error(`[L-A] An error occurred!`);
    console.error(err);
    process.exit(1);
});