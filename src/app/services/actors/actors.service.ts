import { Injectable } from '@angular/core';
import { ActorsStore } from './actors.store';
import { ActorsDataService } from './actors-data.service';


@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private actorsStore: ActorsStore, private actorssDataService: ActorsDataService) { }

  getActors(){
    this.actorssDataService.getActors().subscribe(s => {
      this.actorsStore.set(s);
    })
  }
}
