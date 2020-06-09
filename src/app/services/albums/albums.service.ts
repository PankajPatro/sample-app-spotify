import { Injectable } from '@angular/core';
import { AlbumsStore } from './albums.store';
import { AlbumsDataService } from './albums-data.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private albumsStore: AlbumsStore, private albumsDataService: AlbumsDataService) { }

  getAlbums(){
    this.albumsDataService.getAlbums().subscribe(s => {
      this.albumsStore.set(s);
    })
  }
}
