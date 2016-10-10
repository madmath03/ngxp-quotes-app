import { QuoteService } from './quotes.service';
import { Pagination } from '../shared/models';
import { Subject } from 'rxjs/Subject';

export class QuotesListCommonVM {

  pagination: Pagination = new Pagination();

  protected lstQuotes: any[] = [];

  quotes$: Subject<any[]> = new Subject<any[]>();

  constructor(protected quotesService: QuoteService) {

  }

  getQuotes(): Promise<any> {
    return this.quotesService.get(this.pagination);
  }

  getQuotesByCategoryId(categoryId: number) {
    return this.quotesService.getByCategoryId(categoryId);
  }

  getQuotesByAuthorId(authorId: number) {
    return this.quotesService.getByAuthorId(authorId);
  }

  getMaxPageNumber() {
    return Math.ceil(this.pagination.count / this.pagination.size);
  }

  loadQuotes() {
    this.getQuotes().then((result) => {
      Array.prototype.push.apply(this.lstQuotes, result.lstQuotes);
      this.pagination.count = result.count;
      this.quotes$.next(this.lstQuotes);
    });
    return this.quotes$;
  }

  loadNextPage() {
    this.pagination.page += 1;
    return this.loadQuotes();
  }

  loadQuotesByAuthorId(authorId: number) {
    this.lstQuotes.length = 0;
    this.getQuotesByAuthorId(authorId).then((lstQuotes) => {
      Array.prototype.push.apply(this.lstQuotes, lstQuotes);
      this.quotes$.next(this.lstQuotes);
    });
    return this.quotes$;
  }

  loadQuotesByCategoryId(categoryId: number) {
    this.lstQuotes.length = 0;
    this.getQuotesByCategoryId(categoryId).then((lstQuotes) => {
      Array.prototype.push.apply(this.lstQuotes, lstQuotes);
      this.quotes$.next(this.lstQuotes);
    });
    return this.quotes$;
  }

  loadQuotesByCriteria(quotesBy: 'category' | 'author' | 'all', id?: number): Subject<any>{
    let subject;
    if (quotesBy === 'all') {
      subject = this.loadQuotes();
    } else if (quotesBy === 'author' && id) {
      subject = this.loadQuotesByAuthorId(+id);
    } else if (quotesBy === 'category' && id) {
      subject = this.loadQuotesByCategoryId(+id);
    }
    return subject;
  }
}