import { SearchResult } from '@/shared/domain/repositories/searchable-repository-contracts'
import { OutputMapper } from '../pagination-output'

describe('OutputMapper unit tests', () => {
  it('Should convert a outputuser', async () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: '',
      sortDir: '',
      filter: 'fake',
    })

    const sut = OutputMapper.toOutput(result.items, result)
    expect(sut).toStrictEqual({
      items: ['fake'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    })
  })
})
