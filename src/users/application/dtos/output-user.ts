import { UserEntity } from '@/users/domain/entities/user.entity'

export type OutputUser = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export class UserOutputMapper {
  static toOutput(entity: UserEntity): OutputUser {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      createdAt: entity.createdAt,
    }
  }
}
