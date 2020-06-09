import { Injectable } from '@angular/core';
import { SongModel } from 'src/app/models/song.model';
import { PlaylistStore } from './playlist.store';
import { PlaylistQuery } from './playlist.query';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  subscription: Subscription;

  stopAll() {
    this.playlistStore.update(e => e.ids, {currentlyPlaying : false});
  }

  constructor(private playlistStore: PlaylistStore, private playlistQuery: PlaylistQuery) { }

  upsertSong(order: number, song: SongModel) {
    const newSong = { ...song, order: order };
    this.playlistStore.upsert(song.id, song);
  }

  clear() {
    this.playlistStore.reset();
  }

}
