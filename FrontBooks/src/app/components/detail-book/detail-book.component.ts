import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookService } from 'src/app/services/book.service';
import { Books } from '../interfaces/books.interface';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {

  titulo = 'Detalle del libro';
  listData!: Books;
  id: string | null;
  loading = false;

  constructor( private bookServices: BookService,
    private aRoute: ActivatedRoute ) {
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id);
     }

  ngOnInit(): void {
    this.DetailBook();
  }

  DetailBook(){
    this.bookServices.getBookId(this.id!).subscribe(resp => {
      this.loading = true;
      this.listData = {
        title: resp.title,
        description: resp.description,
        pageCount: resp.pageCount,
        excerpt: resp.excerpt,
        publishDate: resp.publishDate
      }
      console.log(this.listData);
    },(err) => {
      console.info(err);
    });
  }

}
