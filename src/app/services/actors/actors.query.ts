import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ActorState, ActorsStore } from './actors.store';
import { Actor } from 'src/app/models/actor.model';

@Injectable({
    providedIn: 'root'
})
export class ActorsQuery extends QueryEntity<ActorState, Actor> {
    constructor(protected store: ActorsStore) {
        super(store);
    }
}