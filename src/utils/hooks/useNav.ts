import { useRouter } from 'vue-router'
import { cloneDeep } from '@/utils'
import { useBaseStore } from '@/store/pinia'

export function useNav() {
  const router = useRouter()
  const store = useBaseStore()

  return (path, query = {}, data?: any) => {
    if (data) {
      store.routeData = cloneDeep(data)
    }
    router.push({ path, query })
  }
}
