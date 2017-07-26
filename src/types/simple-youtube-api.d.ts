declare module "simple-youtube-api" {
    class YouTube {
        constructor(key: string);

        Video: YouTube.Video;
        Channel: YouTube.Channel;
        Playlist: YouTube.Playlist;

        request(endpoint: string, qs: object): Promise<object>;

        getVideo(url: string): Promise<YouTube.Video>;

        getVideoByID(id: string): Promise<YouTube.Video>;

        getPlaylist(url: string): Promise<YouTube.Playlist>;

        getPlaylistByID(id: string): Promise<YouTube.Playlist>;

        getChannel(url: string): Promise<YouTube.Channel[]>;

        getChannelByID(id: string): Promise<YouTube.Channel[]>;

        search(query: string, limit?: number, options?: object): Promise<Array<YouTube.Video | YouTube.Playlist | YouTube.Channel | object>>;

        searchVideos(query: string, limit?: number, options?: object): Promise<YouTube.Video[]>;

        searchPlaylists(query: string, limit?: number, options?: object): Promise<YouTube.Playlist[]>;

        searchChannels(query: string, limit?: number, options?: object): Promise<YouTube.Channel[]>;
    }
    
    namespace YouTube {
        class Video {
            constructor(youtube: YouTube, data: object);

            youtube: YouTube;
            type: 'video';
            id: string;
            title: string;
            description: string;
            publishedAt: Date;
            duration?: any;

            url: string;
            shortURL: string;
            durationSeconds: number;

            static extractID(url: string): string;
        }

        class Channel {
            constructor(youtube: YouTube, data: object);

            youtube: YouTube;
            type: 'channel';
            id: string;
            title: string;
            url: string;

            static extractID(url: string): string;
        }

        class Playlist {
            constructor(youtube: YouTube, data: object);

            youtube: YouTube;
            type: 'playlist';
            id: string;
            title: string;
            description: string;
            publishedAt: Date;
            channel: Channel;

            getVideos(limit?: number): Promise<Video[]>;

            static extractID(url: string): string;
        }
    }

    export = YouTube;
}