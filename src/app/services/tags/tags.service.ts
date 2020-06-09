import { Injectable } from '@angular/core';
import { TagsStore } from './tags.store';
import { TagsDataService } from './tags-data.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private tagsStore: TagsStore, private tagsDataService: TagsDataService) { }

  getTags(){
    this.tagsDataService.getTags().subscribe(s => {
      this.tagsStore.set(s);
    })
  }
}
