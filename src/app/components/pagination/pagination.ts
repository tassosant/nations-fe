import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.css',
  templateUrl: './pagination.html',
})
export class Pagination {
  @Input() page = 0;
  @Input() totalElements = 0;
  @Input() totalPages = 0;
  @Output() pageChange = new EventEmitter<number>();

  get displayPage(): number {
    return this.totalPages === 0 ? 0 : this.page + 1;
  }

  get hasPrevious(): boolean {
    return this.page > 0;
  }

  get hasNext(): boolean {
    return this.page + 1 < this.totalPages;
  }

  previous(): void {
    if (this.hasPrevious) {
      this.pageChange.emit(this.page - 1);
    }
  }

  next(): void {
    if (this.hasNext) {
      this.pageChange.emit(this.page + 1);
    }
  }
}
