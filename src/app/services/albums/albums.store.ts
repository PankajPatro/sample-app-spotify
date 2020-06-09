import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Album } from 'src/app/models/album.model';


export interface AlbumState extends EntityState<Album> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'albums' })
export class AlbumsStore extends EntityStore<AlbumState, Album> {
    constructor() {
        super();
    }
}