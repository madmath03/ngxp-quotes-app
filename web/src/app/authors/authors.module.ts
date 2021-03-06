import { NgModule } from '@angular/core';

import { AuthorService } from '../../x-shared/app/authors';
import { AuthorsListComponent } from './authors-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [AuthorsListComponent],
  providers: [AuthorService],
  exports: [AuthorsListComponent]
})
export class AuthorsModule { }
