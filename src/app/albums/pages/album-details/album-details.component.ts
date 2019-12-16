import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from '../../interfaces/album';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddMovieComponent } from 'src/app/albums/components/add-movie/add-movie.component';
import { MatDialog } from '@angular/material';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  private album: Album;
  private movies: Movie[];

  constructor(
    private albumsService: AlbumsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.route.params.subscribe(params => { 
      this.getAlbum(params.id);
      this.getMovies(params.id);
    });
  }

  getAlbum(albumId: string): void {
    this.subscription.add(
      this.albumsService.getAlbum(albumId).subscribe(album => {
        this.album = album;
      })
    );
  }

  getMovies(albumId: string): void {
    this.subscription.add(
      this.albumsService.getMovies(albumId).subscribe(movies => {
        this.movies = movies;
      })
    );
  }

  openMovieDialog(): void {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '500px',
      data: { albumId: this.album.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.init();
    });
  }
}
