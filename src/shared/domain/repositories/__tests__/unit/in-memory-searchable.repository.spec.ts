import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository'
import {
  SearchParams,
  SearchResult,
} from '../../searchable-repository-contracts'

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
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])

      itemsSorted = await sut['applySort'](items, 'name', 'desc')
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])
    })
  })

  describe('applyPaginate method', () => {
    it('Should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 10 }),
        new StubEntity({ name: 'b', price: 10 }),
        new StubEntity({ name: 'c', price: 10 }),
        new StubEntity({ name: 'd', price: 10 }),
        new StubEntity({ name: 'e', price: 10 }),
        new StubEntity({ name: 'f', price: 10 }),
        new StubEntity({ name: 'g', price: 10 }),
      ]

      let itemsPaginate = await sut['applyPaginate'](items, 1, 3)
      expect(itemsPaginate).toStrictEqual([items[0], items[1], items[2]])

      itemsPaginate = await sut['applyPaginate'](items, 2, 3)
      expect(itemsPaginate).toStrictEqual([items[3], items[4], items[5]])

      itemsPaginate = await sut['applyPaginate'](items, 3, 3)
      expect(itemsPaginate).toStrictEqual([items[6]])

      itemsPaginate = await sut['applyPaginate'](items, 4, 3)
      expect(itemsPaginate).toStrictEqual([])
    })
  })

  describe('search method', () => {
    it('Should apply only paginate when the other params are null', async () => {
      const entity = new StubEntity({ name: 'test', price: 10 })
      const items = Array(16).fill(entity)

      sut.items = items

      const params = await sut.search(new SearchParams())
      console.log(params)
      expect(params).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          currentPage: 1,
          perPage: 15,
          sort: null,
          sortDir: null,
          filter: null,
        }),
      )
    })

    it('Should apply paginate and filter', async () => {
      const items = [
        new StubEntity({ name: 'TEST', price: 10 }),
        new StubEntity({ name: 'test', price: 10 }),
        new StubEntity({ name: 'fake', price: 10 }),
        new StubEntity({ name: 'TeSt', price: 10 }),
        new StubEntity({ name: 'TeST', price: 10 }),
        new StubEntity({ name: 'fake', price: 10 }),
      ]

      sut.items = items

      let params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 3,
          filter: 'TEST',
        }),
      )

      expect(params).toStrictEqual(
        new SearchResult({
          items: [items[0], items[1], items[3]],
          total: 4,
          currentPage: 1,
          perPage: 3,
          sort: null,
          sortDir: null,
          filter: 'TEST',
        }),
      )

      params = await sut.search(
        new SearchParams({
          page: 2,
          perPage: 3,
          filter: 'TEST',
        }),
      )

      expect(params).toStrictEqual(
        new SearchResult({
          items: [items[4]],
          total: 4,
          currentPage: 2,
          perPage: 3,
          sort: null,
          sortDir: null,
          filter: 'TEST',
        }),
      )
    })
  })
})
