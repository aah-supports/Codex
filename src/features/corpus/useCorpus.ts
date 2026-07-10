import { useQuery } from '@tanstack/react-query'
import { getCorpusIndex } from '../../content/api'

export function useCorpusIndex() {
  return useQuery({
    queryKey: ['corpus-index'],
    queryFn: getCorpusIndex,
  })
}
