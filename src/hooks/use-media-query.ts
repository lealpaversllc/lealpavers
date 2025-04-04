// use-media-query.ts
import { useEffect, useState } from 'react'

const useMediaQuery = () => {
  const [windowSize, setWindowSize] = useState<[number, number] | undefined>()

  useEffect(() => {
    const handler = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    handler() // chama logo de início pra setar o valor correto

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return windowSize
}

export default useMediaQuery
