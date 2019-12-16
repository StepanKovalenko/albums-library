import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlbumsService } from '../../services/albums.service';
import { MatDialogRef } from '@angular/material';
import uuid from 'uuid/v4';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  private albumForm: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private albumsService: AlbumsService,
    public dialogRef: MatDialogRef<AddAlbumComponent>,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.albumForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submitAlbumForm(): void {
    if (this.albumForm.invalid) return;

    this.subscription.add(
      this.albumsService.addAlbum({
        id: uuid(),
        title: this.albumForm.value.title, 
        description: this.albumForm.value.description
      }).subscribe(response => {
        this.dialogRef.close();
      }, error => {
        console.error(error);
      })
    )
  }
}
