import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';

export interface GenreState extends EntityState<Genre> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'genres' })
export class GenresStore extends EntityStore<GenreState, Genre> {
    constructor() {
        super();
    }
}