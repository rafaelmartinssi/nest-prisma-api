import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('UserEntity integration tests', () => {
  beforeEach(() => {})

  describe('Constructor method', () => {
    it('Should throw error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        name: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        name: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        email: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw error when creating a user with invalid createdAt', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        password: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        password: 'a'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...userDataBuilder({}),
        createdAt: '2023' as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...userDataBuilder({}),
        createdAt: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should create a user valid', () => {
      expect.assertions(0)
      const props: UserProps = {
        ...userDataBuilder({}),
      }
      new UserEntity(props)
    })
  })

  describe('Update method', () => {
    it('Should throw error when updating a user with invalid name', () => {
      const entity = new UserEntity(userDataBuilder({}))
      expect(() => entity.update(null)).toThrow(EntityValidationError)
      expect(() => entity.update('')).toThrow(EntityValidationError)
      expect(() => entity.update('a'.repeat(256))).toThrow(
        EntityValidationError,
      )
      expect(() => entity.update(10 as any)).toThrow(EntityValidationError)
    })

    it('Should a valid user', () => {
      expect.assertions(0)
      const entity = new UserEntity(userDataBuilder({}))
      entity.update('other name')
    })
  })

  describe('UpdatePassword method', () => {
    it('Should throw error when updating a user with invalid password', () => {
      const entity = new UserEntity(userDataBuilder({}))
      expect(() => entity.updatePassword(null)).toThrow(EntityValidationError)
      expect(() => entity.updatePassword('')).toThrow(EntityValidationError)
      expect(() => entity.updatePassword('a'.repeat(101))).toThrow(
        EntityValidationError,
      )
      expect(() => entity.updatePassword(10 as any)).toThrow(
        EntityValidationError,
      )
    })

    it('Should a valid user', () => {
      expect.assertions(0)
      const entity = new UserEntity(userDataBuilder({}))
      entity.updatePassword('other password')
    })
  })
})
