import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';


export interface TagState extends EntityState<Tag> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'tags' })
export class TagsStore extends EntityStore<TagState, Tag> {
    constructor() {
        super();
    }
}