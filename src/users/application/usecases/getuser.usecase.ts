import { UserRepository } from '@/users/domain/repositories/user.repository'
import { OutputUser } from '../dtos/output-user'
import { UseCase } from '@/shared/application/usecases/use-cases'

export type InputGetuser = {
  id: string
}

export class GetuserUseCase implements UseCase<InputGetuser, OutputUser> {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputGetuser): Promise<OutputUser> {
    const user = await this.userRepository.findById(input.id)
    return user
  }
}
