import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageRequest} from '../../models/PageRequest';
import {PageInfo} from '../../models/PageInfo';

type PageItem = number | 'dots';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.css',
  templateUrl: './pagination.html',
})
export class Pagination {
  @Input({required: true}) pageInfo!: PageInfo;
  @Output() onPageRequest = new EventEmitter<PageRequest>();

  get pages(): PageItem[] {
    const totalPages = Math.max(0, this.pageInfo?.totalPages ?? 0);
    const currentPage = this.pageInfo?.page ?? 1;

    if (totalPages <= 9) {
      return this.buildRange(1, totalPages);
    }

    const pages: PageItem[] = [1];
    const middlePages = 7;
    let start = currentPage - 3;
    let end = currentPage + 3;

    if (start < 2) {
      end += 2 - start;
      start = 2;
    }

    if (end > totalPages - 1) {
      start -= end - (totalPages - 1);
      end = totalPages - 1;
    }

    start = Math.max(2, start);
    end = Math.min(totalPages - 1, end);

    if (start === 3) {
      pages.push(2);
    } else if (start > 3) {
      pages.push('dots');
    }

    pages.push(...this.buildRange(start, middlePages));

    if (end === totalPages - 2) {
      pages.push(totalPages - 1);
    } else if (end < totalPages - 2) {
      pages.push('dots');
    }

    pages.push(totalPages);

    return pages;
  }

  navigateToNextPage(): void {
    this.navigateToPage(this.pageInfo.page + 1);
  }

  navigateToPreviousPage(): void {
    this.navigateToPage(this.pageInfo.page - 1);
  }

  navigateToPage(page: number): void {
    if (page === this.pageInfo.page || page < 1 || page > this.pageInfo.totalPages) {
      return;
    }

    this.emitPageRequest(page, this.pageInfo.size);
  }

  onChange(event: Event): void {
    const size = Number.parseInt((event.target as HTMLSelectElement).value, 10);

    if (Number.isNaN(size) || size === this.pageInfo.size) {
      return;
    }

    this.emitPageRequest(1, size);
  }

  private emitPageRequest(page: number, size: number): void {
    this.onPageRequest.emit({page, size});
  }

  private buildRange(start: number, count: number): number[] {
    return Array.from({length: count}, (_, index) => start + index);
  }
}
