import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlbumsService } from '../../services/albums.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import uuid from 'uuid/v4';

export interface DialogData {
  albumId: string;
}

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  
  private subscription: Subscription = new Subscription();
  private movieForm: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    link: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private albumsService: AlbumsService,
    public dialogRef: MatDialogRef<AddMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required]
    });
  }

  submitMovieForm(): void {
    if (this.movieForm.invalid) return;

    this.subscription.add(
      this.albumsService.addMovie(this.data.albumId,
      {
        id: uuid(),
        title: this.movieForm.value.title, 
        description: this.movieForm.value.description,
        link: this.movieForm.value.link
      }).subscribe(response => {
        this.dialogRef.close();
      }, error => {
        console.error(error);
      })
    )
  }
}
