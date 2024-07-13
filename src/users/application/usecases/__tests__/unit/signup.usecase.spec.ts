import { UserInMemoryRepository } from '@/users/infra/database/in-memory/repositories/user-in-memory.repository'
import { SignupUseCase } from '../../signup.usecase'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/users/infra/provider/hash-provider/bcryptjs-hash.provider'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'

describe('Signup unit tests', () => {
  let sut: SignupUseCase
  let repository: UserRepository
  let provider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    provider = new BcryptjsHashProvider()
    sut = new SignupUseCase(repository, provider)
  })

  it('Should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = userDataBuilder({})
    const result = await sut.execute({
      name: props.name,
      email: props.email,
      password: props.password,
    })
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('Should not be able to register with same email twice', async () => {
    const props = userDataBuilder({ email: 'a@a.com' })
    await sut.execute(props)
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConflictError)
  })

  it('Should throw error when name not provided', async () => {
    const props = Object.assign(userDataBuilder({}), { name: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throw error when email not provided', async () => {
    const props = Object.assign(userDataBuilder({}), { email: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throw error when password not provided', async () => {
    const props = Object.assign(userDataBuilder({}), { password: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
