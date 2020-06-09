import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from 'src/app/models/tag.model';
import { Album } from 'src/app/models/album.model';
import { Actor } from 'src/app/models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsDataService {
  
  private dataURL: string = "https://us-central1-sample-ify.cloudfunctions.net/allAlbums";

  getAlbums() {
    return this.httpClient.get<Album[]>(this.dataURL);
  }

  constructor(private httpClient: HttpClient) { }
}
