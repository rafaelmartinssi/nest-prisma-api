import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

export type SortDirection = 'asc' | 'desc'

export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export class SearchParams {
  protected _page: number
  protected _perPage = 15
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = props.page
    this.perPage = props.perPage
    this.sort = props.sort
    this.sortDir = props.sortDir
    this.filter = props.filter
  }

  get page() {
    return this._page
  }
  private set page(page: number) {
    let _page = +page
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1
    }
    this._page = _page
  }

  get perPage() {
    return this._perPage
  }
  private set perPage(perPage: number) {
    let _perPage = perPage === (true as any) ? this._perPage : +perPage
    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ) {
      _perPage = this._perPage
    }
    this._perPage = _perPage
  }

  get sort() {
    return this._sort
  }
  private set sort(sort: string | null) {
    this._sort =
      sort === null || sort === undefined || sort === '' ? null : String(sort)
  }

  get sortDir() {
    return this._sortDir
  }
  private set sortDir(sortDir: string | null) {
    if (!this.sort) {
      this._sortDir = null
      return
    }
    const dir = String(sortDir).toLocaleLowerCase()
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir
  }

  get filter() {
    return this._filter
  }
  private set filter(filter: string | null) {
    this._filter =
      filter === null || filter === undefined || filter === ''
        ? null
        : String(filter)
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchParams,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>
}