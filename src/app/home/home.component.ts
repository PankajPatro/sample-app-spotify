import { Component, OnInit } from '@angular/core';
import { SongsQuery } from '../services/songs/songs.query';
import { SongModel } from '../models/song.model';
import { Observable, Subscription } from 'rxjs';
import { SongsService } from '../services/songs/songs.service';
import { AlbumService } from '../services/albums/albums.service';
import { ActorsService } from '../services/actors/actors.service';
import { TagsService } from '../services/tags/tags.service';
import { GenresService } from '../services/genres/genres.service';
import { PlaylistService } from '../services/playlist/playlist.service';
import { PlaylistQuery } from '../services/playlist/playlist.query';
import { AudioService } from '../services/audio/audio.service';
import { map, take } from 'rxjs/operators';
import { Album } from '../models/album.model';
import { AlbumsQuery } from '../services/albums/albums.query';
import { Order } from '@datorama/akita';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs$: Observable<SongModel[]>;
  isLoading$: Observable<boolean>;
  playlist$: Observable<SongModel[]>;

  order: number;
  audioPlaySubscription: Subscription;
  selectedAlbumId: string;
  albums$: Observable<Album[]>;
  currentSong: SongModel;
  nextSongSubscription: Subscription;

  constructor(private songsQuery: SongsQuery, private tagsService: TagsService
    , private albumsService: AlbumService, private actorsService: ActorsService, private albumsQuery: AlbumsQuery,
    private genresService: GenresService, private songsService: SongsService
    , private playlistService: PlaylistService, private playlistQuery: PlaylistQuery, private audioService: AudioService) {
  }

  ngOnInit() {
    this.order = 1;
    this.isLoading$ = this.songsQuery.selectLoading();
    this.fetchData();
    this.audioPlaySubscription = this.audioService.PlayFinished.subscribe(async (order) => {
      const nextOrder = order + 1;
      this.nextSongSubscription = this.playlistQuery.selectEntity(p => p.order === nextOrder).pipe(take(1), map(s => {
        return s;
      })).subscribe(s => {
        this.playAudio(s);
      });
    });
  }

  fetchData() {
    this.genresService.getGenres();
    this.albumsService.getAlbums();
    this.actorsService.getActors();
    this.tagsService.getTags();
    this.songsService.getSongs();
    this.songs$ = this.songsQuery.selectAllSongs();
    this.playlist$ = this.playlistQuery.selectAll({
      sortBy: 'order',
      sortByOrder: Order.ASC
    });
    this.albums$ = this.albumsQuery.selectAll();
  }

  applyFilter() {
    if (this.selectedAlbumId) {
      this.songs$ = this.songsQuery.selectAllSongsByAlbumId(this.selectedAlbumId);
    }
  }

  clearFilter() {
    this.selectedAlbumId = undefined;
    this.songs$ = this.songsQuery.selectAllSongs();
  }

  addToPlaylist(song: SongModel) {
    const newSong = { ...song, currentlyPlaying: false, order : this.order };
    this.playlistService.upsertSong(newSong);
    if(this.order === 1){
      this.playAudio(newSong);
    }
    this.order = this.order + 1;
  }

  clearAndAddToPlaylist(song: SongModel) {
    this.playlistService.clear();
    this.order = 1;
    this.addToPlaylist(song);
  }

  stopAudio(song: SongModel) {
    const newSong = { ...song, currentlyPlaying: false, order : song.order };
    this.playlistService.upsertSong(newSong);
    this.audioService.stop();
    this.currentSong = undefined;
  }

  playAudio(song: SongModel) {
    this.nextSongSubscription ? this.nextSongSubscription.unsubscribe() : '';
    if(this.currentSong){
      const newSong = { ...this.currentSong, currentlyPlaying: false, order: this.currentSong.order };
      this.playlistService.upsertSong(newSong);
    }
    const newSong = { ...song, currentlyPlaying: true, order: song.order };
    this.playlistService.upsertSong(newSong);
    this.audioService.play(newSong);
    this.currentSong = newSong;
  }

}
