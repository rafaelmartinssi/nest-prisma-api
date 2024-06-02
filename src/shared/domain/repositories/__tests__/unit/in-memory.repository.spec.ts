import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

type StupEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StupEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should insert a new entity', async () => {
    const entity = new StubEntity({
      name: 'Value',
      price: 10,
    })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({
      name: 'Value',
      price: 10,
    })
    await sut.insert(entity)
    const result = await sut.findById(entity.id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should return all entities', async () => {
    const entity = new StubEntity({
      name: 'Value',
      price: 10,
    })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })

  it('Should throw error on update when entity not found', async () => {
    const entity = new StubEntity({
      name: 'Value',
      price: 10,
    })
    expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should update an entity', async () => {
    const entity = new StubEntity({
      name: 'Value',
      price: 10,
    })
    await sut.insert(entity)
    const updatedEntity = new StubEntity(
      {
        name: 'Updated value',
        price: 50,
      },
      entity.id,
    )
    await sut.update(updatedEntity)
    expect(updatedEntity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found on delete', async () => {
    expect(sut.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delete an entity', async () => {
    const entity = new StubEntity({
      name: 'Value',
      price: 10,
    })
    await sut.insert(entity)

    await sut.delete(entity.id)
    expect(sut.items).toHaveLength(0)
  })
})
