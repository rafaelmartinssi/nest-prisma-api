import {
  UserRepository,
  UserSearchParams,
  UserSearchResult,
} from '@/users/domain/repositories/user.repository'
import { OutputUser, UserOutputMapper } from '../dtos/OutputUser'
import { UseCase } from '@/shared/application/usecases/use-cases'
import { SearchInput } from '@/shared/application/dtos/search-input'
import {
  OutputMapper,
  PaginationOutput,
} from '@/shared/application/dtos/pagination-output'

export class ListuserUseCase
  implements UseCase<SearchInput, PaginationOutput<OutputUser>>
{
  constructor(private userRepository: UserRepository) {}

  async execute(input: SearchInput): Promise<PaginationOutput<OutputUser>> {
    const params = new UserSearchParams(input)
    const searchResult = await this.userRepository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(
    searchResult: UserSearchResult,
  ): PaginationOutput<OutputUser> {
    const items = searchResult.items.map(item =>
      UserOutputMapper.toOutput(item),
    )
    return OutputMapper.toOutput(items, searchResult)
  }
}
