import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { GenreState, GenresStore } from './genres.store';
import { Genre } from 'src/app/models/genre.model';


@Injectable({
    providedIn: 'root'
})
export class GenresQuery extends QueryEntity<GenreState, Genre> {
    constructor(protected store: GenresStore) {
        super(store);
    }
}