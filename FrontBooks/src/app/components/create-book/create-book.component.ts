import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Books } from '../interfaces/books.interface';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  titulo: string = 'Agregar Libro';
  createBook: FormGroup;
  submitted = false;
  id: string | null;
  loading = true;

  constructor(private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
    ) {
    this.createBook = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      pageCount: ['', Validators.required],
      excerpt: ['', Validators.required],
      publishDate: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.editBook();
  }

  editBook(){
    if(this.id != null){
      this.loading = false;
      this.titulo = 'Editar Libro';
      this.bookService.getBookId(this.id).subscribe(resp => {
        this.loading = true;
        this.createBook.setValue({
          titulo: resp.title,
          descripcion: resp.description,
          pageCount: resp.pageCount,
          excerpt: resp.excerpt,
          publishDate: resp.publishDate
      });
      },(err) => {
        console.info(err);
      });
    }
  }

  agregarBook(){
    this.submitted = true;

    const book: Books = {
      title: this.createBook.value.titulo,
      description: this.createBook.value.descripcion,
      excerpt: this.createBook.value.excerpt,
      pageCount: this.createBook.value.pageCount,
      publishDate: this.createBook.value.publishDate
    }

    this.bookService.addBook(book).subscribe(resp =>
      console.log(resp),(err) => {
        console.info(err);
      });
      this.toastr.success('Se ha guardado con exito!', 'El libro se ha guardado con exito!');
      this.router.navigate(['/list-books']);

  }

}
