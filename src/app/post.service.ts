import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/107403796';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/?fields=slug,categories,post_thumbnail,title,date&number=50&page=1`)
      .pipe(
        tap(response => console.log('API Response:', response))
      );
  }


  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getPost(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/slug:${slug}?fields=featured_image,title,author,content,date`);
  }

  getPostsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/?category=${category}&fields=slug,categories,post_thumbnail,title,date&number=20&page=1`)
      .pipe(
        tap(response => console.log('API Response for Category:', response))
      );
  }
}
