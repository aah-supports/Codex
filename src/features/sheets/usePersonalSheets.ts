import { useQuery } from '@tanstack/react-query'
import { getPersonalSheetIndex } from '../../content/api'

export function usePersonalSheetIndex() {
  return useQuery({
    queryKey: ['personal-sheet-index'],
    queryFn: getPersonalSheetIndex,
  })
}
