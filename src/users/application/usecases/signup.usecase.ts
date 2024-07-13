import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repositories/user.repository'

export type InputSignup = {
  name: string
  email: string
  password: string
}

export type OutputSignup = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export class SignupUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute(input: InputSignup): Promise<OutputSignup> {
    const { name, email, password } = input

    if (!name || !email || !password) {
      throw new BadRequestError('Input data not provided')
    }

    await this.userRepository.emailExists(email)

    const hashPassword = await this.hashProvider.generateHash(password)

    Object.assign(input, { password: hashPassword })

    const user = new UserEntity(input)

    await this.userRepository.insert(user)

    return user
  }
}
