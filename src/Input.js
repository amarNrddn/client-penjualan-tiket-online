import React from 'react'
import { useState } from 'react'
import { Button } from './sButton'
import { Cinput } from './componets/Cinput'

const Input = () => {
  const [nama, setNama] = useState('')
  const [tanggalLahir, setNamaTanggalLahir] = useState('')
  const [usia, setUsia] = useState('')
  const [error, setError] = useState('')

  const hendeleUsia = () => {
    if (nama === '') {
      setError('Harap nama harus di isi')
    } else {
      setError("")
    }
    setUsia(2023 - tanggalLahir)
    if (usia === '') {
      setError('Harap usia harus di isi')
    } else {
      setError("")
    }
    setUsia(2023 - tanggalLahir)
  }


  return (
    <div>
      masukan nama : <Cinput type="text" value={nama} onChange={(e) => setNama(e.target.value)}></Cinput>
      <br />
      <br />
      masukan tanggal lahir : <Cinput type="nuber" value={tanggalLahir} onChange={(e) => setNamaTanggalLahir(e.target.value)}></Cinput>
      <h3>{usia}</h3>
      <p style={{ color: 'red' }}>{error}</p>
      <Button onClick={hendeleUsia}>Generate Usia</Button>

    </div>
  )
}

export default Input