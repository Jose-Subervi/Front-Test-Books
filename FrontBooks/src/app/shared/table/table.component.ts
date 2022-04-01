import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Books } from '../../components/interfaces/books.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() listTable: Books[] = [];

  @Output() onId = new EventEmitter<number>();

  pages: number = 1;
  dataset: any[] = ['1','2','3','4','5','6','7','8','9','10'];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  deleteBook(id: number){
    this.bookService.deleteBook(id).subscribe(resp => {
      this.onId.emit(id);
    });
  }


}
