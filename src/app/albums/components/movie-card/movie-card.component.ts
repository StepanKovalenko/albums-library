import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { AlbumsService } from '../../services/albums.service';
import { Subscription } from 'rxjs';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  @Input() movie: Movie;
  @Input() album: Album;
  @Output() initAlbum: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private albumsService: AlbumsService,
  ) { }

  ngOnInit() {
  }

  deleteMovie(): void {
    this.subscription.add(
      this.albumsService.deleteMovie(this.album.id, this.movie.id).subscribe(response => {
        this.initAlbum.emit();
      }, error => {
        console.error(error);
      })
    )
  }
}
