import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TagState, TagsStore } from './tags.store';
import { Tag } from 'src/app/models/tag.model';

@Injectable({
    providedIn: 'root'
})
export class TagsQuery extends QueryEntity<TagState, Tag> {
    constructor(protected store: TagsStore) {
        super(store);
    }
}