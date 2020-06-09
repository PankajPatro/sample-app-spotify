import * as functions from 'firebase-functions';
import { Firestore, DocumentReference } from '@google-cloud/firestore';
import { storage } from 'firebase-admin';
import { GetSignedUrlConfig, GetFilesOptions } from '@google-cloud/storage';
import admin = require('firebase-admin');


const PROJECTID = 'sample-ify';
const SONGS_COLLECTION = 'songs';
const TAGS_COLLECTION = 'tags';
const ACTORS_COLLECTION = 'actors';
const GENRES_COLLECTION = 'genres';
const ALBUMS_COLLECTION = 'albums';
const PHOTOS_BUCKET = 'SampleImages';
const SONGS_BUCKET = 'SampleSongs';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: PROJECTID,
    storageBucket: 'sample-ify.appspot.com'
});

const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true,
});

const firestorage = storage();

export interface Tag {
    id: string;
    name: string;
}

export interface Genre {
    id: string;
    name: string;
}

export interface Actor {
    id: string;
    name: string;
}

export interface Album {
    id: string;
    name: string;
}

export interface Song {
    id: string;
    title: string;
    actors: string[];
    songUrl: string;
    titleCover: string;
    genres: string[];
    tags: string[];
    album: string;
}

export const getFileUrl = async function (files: any[], fileUrls: string[], index: number, ignoreName: string): Promise<string[]> {
    const options: GetSignedUrlConfig = {
        version: 'v2', // defaults to 'v2' if missing.
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60, // one hour
    };
    if (index === files.length) {
        return fileUrls;
    }
    const file = files[index];
    if (file.name !== ignoreName) {
        const fileUrl = await file.getSignedUrl(options);
        fileUrls.push(fileUrl[0]);
    }
    return await getFileUrl(files, fileUrls, index + 1, ignoreName);
}

export const getSignedImageUrls = async function (files: any[], ignoreName: string) {
    const fileUrls: string[] = [];
    const index = 0;
    return await getFileUrl(files, fileUrls, index, ignoreName);
}

export const getSongUrls = async function (): Promise<string[]> {
    const fileOptions: GetFilesOptions = {
        directory: SONGS_BUCKET
    }
    const ignoreName = `${SONGS_BUCKET}/`;
    const files = await firestorage.bucket().getFiles(fileOptions);
    return await getSignedImageUrls(files[0], ignoreName);
}

export const getImageUrls = async function (): Promise<string[]> {
    const fileOptions: GetFilesOptions = {
        directory: PHOTOS_BUCKET
    }
    const ignoreName = `${PHOTOS_BUCKET}/`;
    const files = await firestorage.bucket().getFiles(fileOptions);
    return await getSignedImageUrls(files[0], ignoreName);
}

const getRandomUrl = function (urls: string[]): string {
    const randomIndex = Math.floor(Math.random() * Math.floor(urls.length));
    return urls[randomIndex];
}

export const allSongs = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        const [songUrls, imageUrls] = await Promise.all([getSongUrls(), getImageUrls()]);
        firestore.collection(SONGS_COLLECTION).onSnapshot((x) => {
            const songs: Song[] = [];
            x.forEach(e => {
                const song: Song = {
                    actors: <string[]>[],
                    genres: <string[]>[],
                    songUrl: getRandomUrl(songUrls),
                    tags: <string[]>[],
                    title: e.data().title,
                    titleCover: getRandomUrl(imageUrls),
                    id: e.id,
                    album: ''
                };
                e.data().genres?.forEach((g: DocumentReference) => {
                    song.genres.push(g.id)
                });
                e.data().actors?.forEach((a: DocumentReference) => {
                    song.actors.push(a.id)
                });
                e.data().tags?.forEach((t: DocumentReference) => {
                    song.tags.push(t.id)
                });
                song.album = e.data().album.id;
                songs.push(song)
            });
            return res.status(200).send(songs);
        });
    }
});

export const allActors = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        firestore.collection(ACTORS_COLLECTION).onSnapshot((x) => {
            const actors: Actor[] = [];
            x.forEach(e => {
                const actor: Actor = {
                    name: e.data().name,
                    id: e.id
                };
                actors.push(actor)
            });
            return res.status(200).send(actors);
        });
    }
});

export const allTags = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        firestore.collection(TAGS_COLLECTION).onSnapshot((x) => {
            const tags: Tag[] = [];
            x.forEach(e => {
                const tag: Tag = {
                    name: e.data().name,
                    id: e.id
                };
                tags.push(tag)
            });
            return res.status(200).send(tags);
        });
    }
});

export const allGenres = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        firestore.collection(GENRES_COLLECTION).onSnapshot((x) => {
            const genres: Genre[] = [];
            x.forEach(e => {
                const genre: Genre = {
                    name: e.data().name,
                    id: e.id
                };
                genres.push(genre)
            });
            return res.status(200).send(genres);
        });
    }
});

export const allAlbums = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        firestore.collection(ALBUMS_COLLECTION).onSnapshot((x) => {
            const albums: Album[] = [];
            x.forEach(e => {
                const album: Album = {
                    name: e.data().name,
                    id: e.id
                };
                albums.push(album)
            });
            return res.status(200).send(albums);
        });
    }
});

