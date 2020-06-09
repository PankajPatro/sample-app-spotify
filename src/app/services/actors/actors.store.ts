import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { Song } from 'src/app/models/song.model';
import { Injectable } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { Album } from 'src/app/models/album.model';
import { Actor } from 'src/app/models/actor.model';


export interface ActorState extends EntityState<Actor> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'actors' })
export class ActorsStore extends EntityStore<ActorState, Actor> {
    constructor() {
        super();
    }
}