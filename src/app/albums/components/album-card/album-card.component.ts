import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Album } from '../../interfaces/album';
import { AlbumsService } from '../../services/albums.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  @Input() album: Album;
  @Output() getAlbums: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private albumsService: AlbumsService,
  ) { }

  ngOnInit() {
  }

  deleteAlbum(): void {
    this.subscription.add(
      this.albumsService.deleteAlbum(this.album.id).subscribe(response => {
        this.getAlbums.emit();
      }, error => {
        console.error(error);
      })
    )
  }
}
