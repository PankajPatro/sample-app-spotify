import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from 'src/app/models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsDataService {
  
  private dataURL: string = "https://us-central1-sample-ify.cloudfunctions.net/allTags";

  getTags() {
    return this.httpClient.get<Tag[]>(this.dataURL);
  }

  constructor(private httpClient: HttpClient) { }
}
