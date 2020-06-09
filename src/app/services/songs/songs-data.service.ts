import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from 'src/app/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongsDataService {
  
  private dataURL: string = "https://us-central1-sample-ify.cloudfunctions.net/allSongs";

  getSongs() {
    return this.httpClient.get<Song[]>(this.dataURL);
  }

  constructor(private httpClient: HttpClient) { }
}
