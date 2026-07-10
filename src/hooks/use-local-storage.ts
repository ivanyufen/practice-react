import { useCallback, useEffect, useState } from 'react'

const UseLocalStorage = (name: string, initialValue: any) => {
  const [data, setData] = useState(initialValue)

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem(name)

    if (!dataFromLocalStorage) {
      localStorage.setItem(name, JSON.stringify(initialValue))
    } else {
      setData(JSON.parse(dataFromLocalStorage))
    }
  }, [])

  const setToLocalStorage = useCallback((newData: any) => {
    localStorage.setItem(name, JSON.stringify(newData))
    setData(newData)
  }, [])

  return [data, setToLocalStorage]
}

export default UseLocalStorage
