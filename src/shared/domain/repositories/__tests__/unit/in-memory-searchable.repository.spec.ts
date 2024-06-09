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
    it('Should no filter items when filter param is null', async () => {
      const items = [
        new StubEntity({
          name: 'Name Value',
          price: 10,
        }),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const itemsFiltered = await sut['applyFilter'](items, null)
      expect(itemsFiltered).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('Should filter items using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'TEST', price: 10 }),
        new StubEntity({ name: 'test', price: 10 }),
        new StubEntity({ name: 'fake', price: 10 }),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      let itemsFiltered = await sut['applyFilter'](items, 'TEST')
      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)

      itemsFiltered = await sut['applyFilter'](items, 'test')
      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(2)

      itemsFiltered = await sut['applyFilter'](items, 'no-filter')
      expect(itemsFiltered).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
    })
  })

  describe('applySort method', () => {
    it('Should no sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 10 }),
        new StubEntity({ name: 'c', price: 10 }),
        new StubEntity({ name: 'a', price: 10 }),
      ]

      let itemsSorted = await sut['applySort'](items, null, null)
      expect(itemsSorted).toStrictEqual(items)

      itemsSorted = await sut['applySort'](items, 'price', 'asc')
      expect(itemsSorted).toStrictEqual(items)
    })

    it('Should sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 10 }),
        new StubEntity({ name: 'c', price: 10 }),
        new StubEntity({ name: 'a', price: 10 }),
      ]

      let itemsSorted = await sut['applySort'](items, 'name', 'asc')
      console.log(itemsSorted)
      console.log(items)
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])

      itemsSorted = await sut['applySort'](items, 'name', 'desc')
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])
    })
  })

  describe('applyPaginate method', () => {})

  describe('search method', () => {})
})
