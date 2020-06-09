import { Tag } from './tag.model';
import { Album } from './album.model';
import { Genre } from './genre.model';
import { Actor } from './actor.model';

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

export interface SongModel extends Song{
    actorsExpanded: Actor[];
    genresExpanded: Genre[];
    tagsExpanded: Tag[];
    albumExpanded: Album;
    currentlyPlaying? : boolean;
    order? : number;
}