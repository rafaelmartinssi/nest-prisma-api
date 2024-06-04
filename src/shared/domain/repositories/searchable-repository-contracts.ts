import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

export interface SearchableRepositoryInterface<
  E extends Entity,
  SeachInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SeachInput): Promise<SearchOutput>
}
