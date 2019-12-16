import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlbumsComponent } from './pages/albums/albums.component';
import { AlbumDetailsComponent } from './pages/album-details/album-details.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  declarations: [
    AlbumsComponent, 
    AlbumDetailsComponent, 
    AddAlbumComponent, 
    AlbumCardComponent, 
    AddMovieComponent, 
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  entryComponents: [
    AddAlbumComponent,
    AddMovieComponent
  ]
})
export class AlbumsModule { }
