import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AlbumState, AlbumsStore } from './albums.store';
import { Album } from 'src/app/models/album.model';

@Injectable({
    providedIn: 'root'
})
export class AlbumsQuery extends QueryEntity<AlbumState, Album> {
    constructor(protected store: AlbumsStore) {
        super(store);
    }
}