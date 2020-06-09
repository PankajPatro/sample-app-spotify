import { Injectable } from '@angular/core';
import { GenresStore } from './genres.store';
import { GenresDataService } from './genres-data.service';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private genresStore: GenresStore, private genresDataService: GenresDataService) { }

  getGenres(){
    this.genresDataService.getGenres().subscribe(s => {
      this.genresStore.set(s);
    })
  }
}
