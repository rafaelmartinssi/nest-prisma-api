import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository'

type StupEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StupEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name']

  protected async applyFilter(
    items: StubEntity[],
    filter: string,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items
    }

    return items.filter(item =>
      item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    )
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository()
  })

  describe('applyFilter method', () => {
    it('Should insert a new entity', async () => {
      const entity = new StubEntity({
        name: 'Value',
        price: 10,
      })
      await sut.insert(entity)
      expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
    })
  })

  describe('applySort method', () => {})

  describe('applyPaginate method', () => {})

  describe('search method', () => {})
})
