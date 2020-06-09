import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { Song } from 'src/app/models/song.model';
import { Injectable } from '@angular/core';

export interface SongState extends EntityState<Song> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'songs' })
export class SongsStore extends EntityStore<SongState, Song> {
    constructor() {
        super();
    }
}