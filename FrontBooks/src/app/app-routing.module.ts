import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListBooksComponent } from './components/list-books/list-books.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { DetailBookComponent } from './components/detail-book/detail-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-books', pathMatch:'full' },
  { path: 'list-books', component: ListBooksComponent },
  { path: 'create-books', component: CreateBookComponent },
  { path: 'detail-books/:id', component: DetailBookComponent },
  { path: 'edit-books/:id', component: CreateBookComponent },
  { path: '**', redirectTo: 'list-books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
