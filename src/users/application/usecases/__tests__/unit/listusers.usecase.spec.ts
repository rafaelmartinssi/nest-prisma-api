import { ListuserUseCase } from '../../listusers.usecase'
import { UserInMemoryRepository } from '@/users/infra/database/in-memory/repositories/user-in-memory.repository'
import { UserSearchResult } from '@/users/domain/repositories/user.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('ListuserUseCase unit tests', () => {
  let sut: ListuserUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new ListuserUseCase(repository)
  })
  it('toOutputMapper unit tests', async () => {
    let result = new UserSearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: null,
      sortDir: null,
      filter: null,
    })

    let output = sut['toOutput'](result)

    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    })

    const entity = new UserEntity(userDataBuilder({}))
    result = new UserSearchResult({
      items: [entity] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: null,
      sortDir: null,
      filter: null,
    })

    output = sut['toOutput'](result)

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    })
  })
})
