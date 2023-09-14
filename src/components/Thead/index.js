import React from 'react'

const Thead = ({text}) => {
  return (
    <thead className='thead-dark'> 
        <tr>
            {text.map((title, index) => {
                return <th key={index}>{title}</th>
            })}
        </tr>
    </thead>
  )
}

export default Thead