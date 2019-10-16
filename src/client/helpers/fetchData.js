import { useState, useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import dataFetchReducer from '../reducers/fetchData.js'

const useDataApi = (initialUrl, initialData, type) => {

  const [url, setUrl] = useState(initialUrl)
  const dispatchStore = useDispatch();
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
  })

  console.log('isCalled')

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const result = await axios(url)

        console.log('result: ', result.data.data)
        dispatch({ type: 'FETCH_SUCCESS' })
        dispatchStore({ type, payload: result.data.data })
      }
        catch (error) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
    }

    fetchData()
  }, [url])

  return [state, setUrl]
}

export default useDataApi
