import { UserEntity } from '../entities/user.entity'
import {
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts'

export type UserFilter = string

export class UserSearchParams extends SearchParams<UserFilter> {}

export class UserSearchResult extends SearchResult<UserEntity, UserFilter> {}
export interface UserRepository
  extends SearchableRepositoryInterface<
    UserEntity,
    UserFilter,
    UserSearchParams,
    UserSearchResult
  > {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}
