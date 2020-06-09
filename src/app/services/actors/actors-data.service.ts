import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from 'src/app/models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsDataService {
  
  private dataURL: string = "https://us-central1-sample-ify.cloudfunctions.net/allActors";

  getActors() {
    return this.httpClient.get<Actor[]>(this.dataURL);
  }

  constructor(private httpClient: HttpClient) { }
}
