import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from 'src/app/models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenresDataService {
  
  private dataURL: string = "https://us-central1-sample-ify.cloudfunctions.net/allGenres";

  getGenres() {
    return this.httpClient.get<Genre[]>(this.dataURL);
  }

  constructor(private httpClient: HttpClient) { }
}
