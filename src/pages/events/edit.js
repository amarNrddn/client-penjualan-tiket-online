import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../../utils/fetch'

const PageEditEvents = () => {
    const {id} = useParams()

    const fetchOneEvents = async() => {
        const res = await getData(`/cms/events/${id}`)
    }

    useEffect(() => {
        fetchOneEvents()
    },[])
  return (
    <div>PageEditEvents</div>
  )
}

export default PageEditEvents