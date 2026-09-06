import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {PageRequest} from '../../models/PageRequest';
import {PageInfo} from '../../models/PageInfo';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.css',
  templateUrl: './pagination.html',
})
export class Pagination implements OnChanges {
  @Input({required: true}) pageInfo!: PageInfo;
  @Output() onPageRequest = new EventEmitter<PageRequest>();

  pageRequest: PageRequest = {page: 1, size: 10};
  visiblePages: number[] = [];
  showLeadingEllipsis = false;
  showTrailingEllipsis = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageInfo']) {
      this.syncPagerState();
    }
  }

  navigateToNextPage(): void {
    if (this.pageRequest.page >= this.pageInfo.totalPages) {
      return;
    }

    this.navigateToPage(this.pageRequest.page + 1);
  }

  navigateToPreviousPage(): void {
    if (this.pageRequest.page <= 1) {
      return;
    }

    this.navigateToPage(this.pageRequest.page - 1);
  }

  navigateToPage(page: number): void {
    if (page === this.pageInfo.page || page < 1 || page > this.pageInfo.totalPages) {
      return;
    }

    this.pageRequest = {
      ...this.pageRequest,
      page,
    };
    this.emitPageRequest();
  }

  onChange(event: Event): void {
    const size = Number.parseInt((event.target as HTMLSelectElement).value, 10);

    if (Number.isNaN(size) || size === this.pageRequest.size) {
      return;
    }

    this.pageRequest = {
      page: 1,
      size,
    };
    this.emitPageRequest();
  }

  private syncPagerState(): void {
    this.pageRequest = {
      page: this.pageInfo.page,
      size: this.pageInfo.size,
    };

    if (this.pageInfo.totalPages < 1) {
      this.visiblePages = [];
      this.showLeadingEllipsis = false;
      this.showTrailingEllipsis = false;
      return;
    }

    const visibleCount = Math.min(5, this.pageInfo.totalPages);
    const start = Math.max(1, Math.min(this.pageInfo.page - 2, this.pageInfo.totalPages - visibleCount + 1));
    const end = start + visibleCount - 1;

    this.visiblePages = this.buildRange(start, end);
    this.showLeadingEllipsis = start > 1;
    this.showTrailingEllipsis = end < this.pageInfo.totalPages;
  }

  private buildRange(start: number, end: number): number[] {
    return Array.from({length: end - start + 1}, (_, index) => start + index);
  }

  private emitPageRequest(): void {
    this.onPageRequest.emit({...this.pageRequest});
  }
}
