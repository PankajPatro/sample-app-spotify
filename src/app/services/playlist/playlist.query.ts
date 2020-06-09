import { QueryEntity } from '@datorama/akita';
import { SongModelState, PlaylistStore } from './playlist.store';
import { SongModel } from 'src/app/models/song.model';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class PlaylistQuery extends QueryEntity<SongModelState, SongModel> {
    
    constructor(protected store: PlaylistStore) {
        super(store);
    }
}