import { Injectable } from '@angular/core';
import { SongsStore } from './songs.store';
import { SongsDataService } from './songs-data.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private songsStore: SongsStore, private songsDataService: SongsDataService) { }

  getSongs(){
    this.songsDataService.getSongs().subscribe(s => {
      this.songsStore.set(s);
    })
  }
}
