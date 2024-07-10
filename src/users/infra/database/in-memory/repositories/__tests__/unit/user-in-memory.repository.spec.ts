import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserInMemoryRepository } from '../../user-in-memory.repository'
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository

  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  it('Should throw error when not found', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should find a entity by email', async () => {
    const entity = new UserEntity(userDataBuilder({}))
    sut.insert(entity)
    const result = await sut.findByEmail(entity.email)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should throw error when found a entity', async () => {
    const entity = new UserEntity(userDataBuilder({}))
    sut.insert(entity)
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Entity alredy exists'),
    )
  })

  it('Should not throw error when found a entity', async () => {
    expect.assertions(0)
    await sut.emailExists('a@a.com')
  })
})
