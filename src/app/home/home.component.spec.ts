import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { SongsQuery } from '../services/songs/songs.query';
import { TagsService } from '../services/tags/tags.service';
import { AlbumService } from '../services/albums/albums.service';
import { ActorsService } from '../services/actors/actors.service';
import { AlbumsQuery } from '../services/albums/albums.query';
import { GenresService } from '../services/genres/genres.service';
import { SongsService } from '../services/songs/songs.service';
import { PlaylistService } from '../services/playlist/playlist.service';
import { PlaylistQuery } from '../services/playlist/playlist.query';
import { AudioService } from '../services/audio/audio.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[MatSidenavModule, BrowserAnimationsModule, MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatListModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,MatMenuModule],
      providers: [SongsQuery, TagsService, AlbumService, ActorsService, AlbumsQuery, GenresService, SongsService, PlaylistService, PlaylistQuery, AudioService, HttpClientModule , HttpClient,  HttpHandler, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Songs Label', () => {
    const value = fixture.debugElement
      .query(By.css('h3.playlist-title')).nativeElement.innerText;
      expect(value).toContain('Songs');
  });
});
