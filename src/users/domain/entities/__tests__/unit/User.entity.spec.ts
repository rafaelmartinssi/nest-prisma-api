import { UserEntity, UserProps } from '../../user.entity'
import { userDataBuilder } from '../../../testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  UserEntity.validate = jest.fn()
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = userDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Setter name field', () => {
    sut.props['name'] = 'other name'
    expect(sut.props.name).toEqual('other name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Getter password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Setter password field', () => {
    sut.props['password'] = 'other password'
    expect(sut.props.password).toEqual('other password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Should update name field', () => {
    sut.update('other name')
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.name).toEqual('other name')
  })

  it('Should update password field', () => {
    sut.updatePassword('other password')
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.password).toEqual('other password')
  })
})
