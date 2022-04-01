import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { BookService } from 'src/app/services/book.service';
import { Books } from '../interfaces/books.interface';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  listTable: Books[] = [];
  loading = false;

  constructor( private bookServices: BookService,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.bookServices.searchBook()
    .subscribe( resp => {
      this.loading = true;
      console.log(resp);
      this.listTable = resp;

    }, (err) => {
      console.info(err);
      this.listTable = [];
    });

  }

  deleteBook(id: number){
    console.log(id);
    this.listTable = this.listTable.filter(x => x.id != id);
    this.toastr.error('Este libro se ha eliminado con exito!');
    console.log(this.listTable);
  }
}
