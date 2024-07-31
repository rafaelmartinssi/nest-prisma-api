import { UserEntity } from '@/users/domain/entities/user.entity'
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserOutputMapper } from '../output-user'

describe('UserOutputMapper unit tests', () => {
  it('Should convert a outputuser', async () => {
    const entity = new UserEntity(userDataBuilder({}))
    const sut = UserOutputMapper.toOutput(entity)
    expect(sut).toStrictEqual(entity.toJSON())
  })
})
