import React, { useEffect } from 'react'
import { fetchEvents } from '../../redux/events/action'
import { useDispatch } from 'react-redux'

const EventsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])
  return (
    <div>EventsPage</div>
  )
}

export default EventsPage