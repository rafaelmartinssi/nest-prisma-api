import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'
import { UserEntity } from '@/users/domain/entities/user.entity'
import {
  UserFilter,
  UserRepository,
} from '@/users/domain/repositories/user.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository
{
  sortableFields: string[] = ['name', 'createdAt']

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError('Entity not found')
    }
    return entity
  }
  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError('Entity alredy exists')
    }
  }

  protected async applyFilter(
    items: UserEntity[],
    filter: UserFilter,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items
    }

    return items.filter(item =>
      item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    )
  }

  protected async applySort(
    items: UserEntity[],
    sort: string,
    sortDir: SortDirection | null,
  ): Promise<UserEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir)
  }
}
