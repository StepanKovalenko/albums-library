import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Album } from '../interfaces/album';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(environment.apiUrl + 'albums');
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.http.get<Album>(environment.apiUrl + `albums/${albumId}`);
  }

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(environment.apiUrl + 'albums', album);
  }

  deleteAlbum(albumId: string): Observable<Album> {
    return this.http.delete<Album>(environment.apiUrl + `albums/${albumId}`);
  }

  getMovies(albumId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.apiUrl + `albums/${albumId}/movies`);
  }

  addMovie(albumId: string, movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(environment.apiUrl + `albums/${albumId}/movies`, movie);
  }

  deleteMovie(albumId: string, movieId: string): Observable<Movie> {
    return this.http.delete<Movie>(environment.apiUrl + `movies/${movieId}?albumId=${albumId}`);
  }
}
