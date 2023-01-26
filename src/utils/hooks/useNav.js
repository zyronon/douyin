import {useRouter} from "vue-router";

export function useNav() {
  const router = useRouter()
  return (path, query = {}) => {
    router.push({path, query})
  }
}

