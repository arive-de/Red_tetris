import { useState, useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const useDataApi = (initialUrl, initialData, type) => {

  const source = axios.CancelToken.source()
  const [url, setUrl] = useState(initialUrl)
  const dispatchStore = useDispatch();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const result = await axios.get(url, {
          cancelToken: source.token,
        })

        dispatchStore({ type, payload: result.data.data })
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchData()

    return () => {
      source.cancel('get request cancelled');
    }
  }, [url])

  return [setUrl]
}

export default useDataApi
