import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { fetchTalents } from '../../redux/talents/action'

const TalentsPage = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.talents)

  useEffect(() => {
    dispatch(fetchTalents())
  }, [dispatch])
  return (
    <div>TalentPage</div>
  )
}

export default TalentsPage