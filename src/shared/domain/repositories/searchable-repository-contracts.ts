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

export type SearchResultProps<E extends Entity, Filter> = {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: string | null
  filter: Filter | null
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

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly currentPage: number
  readonly perPage: number
  readonly lastPage: number
  readonly sort: string | null
  readonly sortDir: string | null
  readonly filter: Filter | null

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.lastPage = Math.ceil(this.total / this.perPage)
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
    }
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>
}
