import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Books } from '../components/interfaces/books.interface';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string = 'https://localhost:7081/api/Books';

  constructor( private httpClient: HttpClient ) { }

  searchBook(): Observable<Books[]> {

    const url = `${this.apiUrl}/GetBooks`;

    return this.httpClient.get<Books[]>( url );
  }

  addBook(book: Books): Observable<Books[]> {

    const url = `${this.apiUrl}/Books`;

    return this.httpClient.post<Books[]>(url, book);
  }

  deleteBook(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;

    return this.httpClient.delete(url);
  }

  getBookId( id: string ): Observable<Books> {

    return this.httpClient.get<Books>(`${this.apiUrl}/${id}`)
  }

}
