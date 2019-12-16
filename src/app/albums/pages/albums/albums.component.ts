import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlbumsService } from 'src/app/albums/services/albums.service';
import { Album } from '../../interfaces/album';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddAlbumComponent } from 'src/app/albums/components/add-album/add-album.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  private albums: Album[];

  constructor(
    private albumsService: AlbumsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): void {
    this.subscription.add(
      this.albumsService.getAlbums().subscribe(albums => {
        this.albums = albums;
      })
    );
  }

  openAlbumDialog(): void {
    const dialogRef = this.dialog.open(AddAlbumComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAlbums();
    });
  }
}
