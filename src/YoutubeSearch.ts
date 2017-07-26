/// <reference path='types/simple-youtube-api.d.ts' />

import * as YouTube from 'simple-youtube-api';

export default class YoutubeSearch {
    private _client: YouTube;
    
    constructor(key: string) {
        this._client = new YouTube(key);
    }
    
    findVideoByUrl(url: string) {
        return this._client.getVideo(url);
    }
    
    findVideoById(id: string) {
        return this._client.getVideoByID(id);
    }
}