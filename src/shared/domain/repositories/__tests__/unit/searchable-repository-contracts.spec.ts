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
  })
})
