import { UserRepository } from '@/users/domain/repositories/user.repository'
import { OutputUser } from '../dtos/OutputUser'

export type InputGetuser = {
  id: string
}

export class GetuserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputGetuser): Promise<OutputUser> {
    const user = await this.userRepository.findById(input.id)
    return user
  }
}
