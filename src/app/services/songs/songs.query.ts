import { QueryEntity, combineQueries } from '@datorama/akita';
import { SongState, SongsStore } from './songs.store';
import { Song, SongModel } from 'src/app/models/song.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenresQuery } from '../genres/genres.query';
import { ActorsQuery } from '../actors/actors.query';
import { AlbumsQuery } from '../albums/albums.query';
import { TagsQuery } from '../tags/tags.query';
import { Album } from 'src/app/models/album.model';

@Injectable({
    providedIn: 'root'
})
export class SongsQuery extends QueryEntity<SongState, Song> {
    
    selectAllSongs() : Observable<SongModel[]> {
        return combineQueries([
            this.selectAll(), 
            this.tagsQuery.selectAll({ asObject: true }), 
            this.genresQuery.selectAll({ asObject: true }),
            this.albumsQuery.selectAll({ asObject: true }),
            this.actorsQuery.selectAll({ asObject: true })])
         .pipe(
           map(([songs, tags, genres, albums, actors]) => {
             return songs.map(song => {
              return {
                ...songs,
                id: song.id,
                title: song.title,
                titleCover: song.titleCover,
                tagsExpanded : song.tags.map(tagId => tags[tagId]),
                albumExpanded : albums[song.album],
                actorsExpanded : song.actors.map(actorId => actors[actorId]),
                genresExpanded : song.genres.map(genreId => genres[genreId]),
                songUrl: song.songUrl,
                actors: song.actors,
                tags: song.tags,
                album: song.album,
                genres: song.genres
              };
            });
          })
        );
    }

    selectAllSongsByAlbumId(albumId : string) : Observable<SongModel[]> {
        return combineQueries([
            this.selectAll({filterBy : s => s.album === albumId}), 
            this.tagsQuery.selectAll({ asObject: true }), 
            this.genresQuery.selectAll({ asObject: true }),
            this.albumsQuery.selectAll({ asObject: true }),
            this.actorsQuery.selectAll({ asObject: true })])
         .pipe(
           map(([songs, tags, genres, albums, actors]) => {
             return songs.map(song => {
              return {
                ...songs,
                id: song.id,
                title: song.title,
                titleCover: song.titleCover,
                tagsExpanded : song.tags.map(tagId => tags[tagId]),
                albumExpanded : albums[song.album],
                actorsExpanded : song.actors.map(actorId => actors[actorId]),
                genresExpanded : song.genres.map(genreId => genres[genreId]),
                songUrl: song.songUrl,
                actors: song.actors,
                tags: song.tags,
                album: song.album,
                genres: song.genres
              };
            });
          })
        );
    }

    constructor(protected store: SongsStore, private genresQuery: GenresQuery
        ,private actorsQuery: ActorsQuery, private albumsQuery: AlbumsQuery
        ,private tagsQuery: TagsQuery) {
        super(store);
    }
}