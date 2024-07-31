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
  it('toOutputMapper method', () => {
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

  it('Should return the users ordered by createdAt', async () => {
    const createdAt = new Date()
    const items = [
      new UserEntity(
        userDataBuilder({
          createdAt,
        }),
      ),
      new UserEntity(
        userDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
    ]

    repository.items = items

    const output = await sut.execute({})

    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJSON()),
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    })
  })

  it('Should return the users using pagination, sort and filter', async () => {
    const items = [
      new UserEntity(userDataBuilder({ name: 'a' })),
      new UserEntity(userDataBuilder({ name: 'AA' })),
      new UserEntity(userDataBuilder({ name: 'Aa' })),
      new UserEntity(userDataBuilder({ name: 'b' })),
      new UserEntity(userDataBuilder({ name: 'c' })),
    ]

    repository.items = items

    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    })

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    })

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    })

    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    })

    output = await sut.execute({
      page: 1,
      perPage: 3,
      sort: 'name',
      sortDir: 'desc',
      filter: 'a',
    })

    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 3,
    })
  })
})
