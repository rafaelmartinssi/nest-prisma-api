import { Entity } from '@/shared/domain/entities/entity'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
}
export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  update(name: string): void {
    this.name = name
  }

  private set name(name: string) {
    this.name = name
  }

  updatePassword(password: string): void {
    this.password = password
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  private set password(password: string) {
    this.password = password
  }

  get createdAt() {
    return this.props.createdAt
  }
}
