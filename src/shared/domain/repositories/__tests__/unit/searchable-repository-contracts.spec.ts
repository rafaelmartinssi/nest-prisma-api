import { SearchParams } from '../../searchable-repository-contracts'

describe('Searchable Repository unit tests', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      expect(new SearchParams({ page: null }).page).toBe(1)
      expect(new SearchParams({ page: undefined }).page).toBe(1)
      expect(new SearchParams({ page: '' as any }).page).toBe(1)
      expect(new SearchParams({ page: 'value' as any }).page).toBe(1)
      expect(new SearchParams({ page: 0 }).page).toBe(1)
      expect(new SearchParams({ page: -1 }).page).toBe(1)
      expect(new SearchParams({ page: 1.1 }).page).toBe(1)
      expect(new SearchParams({ page: true as any }).page).toBe(1)
      expect(new SearchParams({ page: {} as any }).page).toBe(1)
      expect(new SearchParams({ page: 1 }).page).toBe(1)

      expect(new SearchParams({ page: 2 }).page).toBe(2)
    })

    it('perPage prop', () => {
      expect(new SearchParams({ perPage: null }).perPage).toBe(15)
      expect(new SearchParams({ perPage: undefined }).perPage).toBe(15)
      expect(new SearchParams({ perPage: '' as any }).perPage).toBe(15)
      expect(new SearchParams({ perPage: 'value' as any }).perPage).toBe(15)
      expect(new SearchParams({ perPage: 0 }).perPage).toBe(15)
      expect(new SearchParams({ perPage: -1 }).perPage).toBe(15)
      expect(new SearchParams({ perPage: 1.1 }).perPage).toBe(15)
      expect(new SearchParams({ perPage: true as any }).perPage).toBe(15)
      expect(new SearchParams({ perPage: {} as any }).perPage).toBe(15)
      expect(new SearchParams({ perPage: 1 }).perPage).toBe(1)

      expect(new SearchParams({ perPage: 25 }).perPage).toBe(25)
    })

    it('sort prop', () => {
      expect(new SearchParams({ sort: null }).sort).toBeNull()
      expect(new SearchParams({ sort: undefined }).sort).toBeNull()
      expect(new SearchParams({ sort: '' }).sort).toBeNull()

      expect(new SearchParams({ sort: 'field' }).sort).toBe('field')
    })

    it('sortDir prop', () => {
      expect(new SearchParams({ sort: null }).sortDir).toBeNull()
      expect(new SearchParams({ sort: undefined }).sortDir).toBeNull()
      expect(new SearchParams({ sort: '' as any }).sortDir).toBeNull()
      expect(
        new SearchParams({
          sort: 'field',
          sortDir: null,
        }).sortDir,
      ).toBe('desc')
      expect(
        new SearchParams({
          sort: 'field',
          sortDir: undefined,
        }).sortDir,
      ).toBe('desc')
      expect(
        new SearchParams({
          sort: 'field',
          sortDir: '' as any,
        }).sortDir,
      ).toBe('desc')
      expect(
        new SearchParams({
          sort: 'field',
          sortDir: 'desc',
        }).sortDir,
      ).toBe('desc')
      expect(
        new SearchParams({
          sort: 'field',
          sortDir: 'DESC' as any,
        }).sortDir,
      ).toBe('desc')
      expect(
        new SearchParams({
          sort: 'field',
          sortDir: 'asc',
        }).sortDir,
      ).toBe('asc')
      expect(
        new SearchParams({
          sort: 'field',
          sortDir: 'ASC' as any,
        }).sortDir,
      ).toBe('asc')
    })

    it('filter prop', () => {
      expect(new SearchParams({ filter: null }).filter).toBeNull()
      expect(new SearchParams({ filter: undefined }).filter).toBeNull()
      expect(new SearchParams({ filter: '' }).filter).toBeNull()

      expect(new SearchParams({ filter: 'field' }).filter).toBe('field')
    })
  })
})
