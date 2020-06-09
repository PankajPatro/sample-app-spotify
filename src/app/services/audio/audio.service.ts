import { Injectable, EventEmitter } from '@angular/core';
import { PlaylistQuery } from '../playlist/playlist.query';
import { SongModel } from 'src/app/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioObj = new Audio();
  
  PlayFinished : EventEmitter<number> = new EventEmitter();

  constructor(private playlistQuery: PlaylistQuery) { 

  }


  play(song: SongModel) {
    this.audioObj.src = song.songUrl;
    this.audioObj.load();
    this.audioObj.play();
    this.audioObj.onended = (e) => {
      this.PlayFinished.emit(song.order);
    }
  }

  stop(){
    this.audioObj.currentTime = 0;
    this.audioObj.pause();
  }

}
