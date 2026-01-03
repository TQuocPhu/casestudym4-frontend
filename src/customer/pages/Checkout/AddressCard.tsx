import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
  const handleChange = (event: any) => {
    console.log(event.target.value);
  }
  return (
    <div className='p-5 border rounded-md flex items-center'>
      <div>
        <Radio
          checked={true}
          onChange={handleChange}
          value=""
          name='radio-button'
        />
      </div>

      <div className='space-y-3 pt-3'>
        <h1>TQP</h1>
        <p className='w-[320px]'>
          <strong>Địa chỉ: </strong> Trà Vinh, Vĩnh Long, Việt Nam
        </p>

        <p>
          <strong>Số điện thoại: </strong> 0998765234
        </p>
      </div>
    </div>
  )
}

export default AddressCard
