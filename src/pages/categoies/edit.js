import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/fetch'

const CategoriesEdit = () => {
  const getDatas = async () => {
    const res = await getData('/cms/categories')
    console.log(res)
  }

  useEffect(() => {
    getDatas()
  })
  return (
    <div>CategoriesEdit</div>
  )
}

export default CategoriesEdit