import {
  Component, OnChanges, Input, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';

import { QuotesListVM } from './quotes-list.view-model';

@Component({
  selector: 'quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
  providers: [QuotesListVM],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent implements OnChanges {

  @Input() authorId: number;

  @Input() categoryId: number;

  @Input() quotesBy: 'author' | 'category' | 'all';

  constructor(public vm: QuotesListVM) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['quotesBy']) {
      this.vm.clearQuotesList();
    }

    this.vm.loadQuotesByCriteria(this.quotesBy, this.authorId || this.categoryId);
  }
}