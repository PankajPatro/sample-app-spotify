import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { SongModel } from 'src/app/models/song.model';
import { Injectable } from '@angular/core';

export interface SongModelState extends EntityState<SongModel> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'playlist', resettable : true })
export class PlaylistStore extends EntityStore<SongModelState, SongModel> {
    constructor() {
        super();
    }
}