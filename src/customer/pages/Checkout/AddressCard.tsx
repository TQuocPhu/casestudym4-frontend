import { Radio } from '@mui/material'
import React from 'react'
import { Address } from '../../../types/UserTypes';

interface AddressCardProps {
  address: Address;
  selectedValue: number | null;
  onChange: (id: number) => void;
}

const AddressCard = ({ address, selectedValue, onChange }: AddressCardProps) => {
  // const handleChange = (event: any) => {
  //   console.log(event.target.value);
  // }
  return (
    // <div className='p-5 border rounded-md flex items-center'>
    //   <div>
    //     <Radio
    //       checked={true}
    //       onChange={handleChange}
    //       value=""
    //       name='radio-button'
    //     />
    //   </div>

    //   <div className='space-y-3 pt-3'>
    //     <h1>TQP</h1>
    //     <p className='w-[320px]'>
    //       <strong>Địa chỉ: </strong> Trà Vinh, Vĩnh Long, Việt Nam
    //     </p>

    //     <p>
    //       <strong>Số điện thoại: </strong> 0998765234
    //     </p>
    //   </div>
    // </div>

    <div className={`p-5 border rounded-md flex items-center cursor-pointer ${selectedValue === address.id ? 'border-primary-color bg-blue-50' : ''}`}
      onClick={() => address.id && onChange(address.id)}>
      <div>
        <Radio
          checked={selectedValue === address.id}
          value={address.id}
          name='address-radio'
        />
      </div>

      <div className='space-y-1 pt-1'>
        <h1 className='font-bold'>{address.name}</h1>
        <p className='text-sm italic'>
          {address.address}, {address.locality}, {address.city}
        </p>
        <p className='text-sm'>
          <strong>Số điện thoại: </strong> {address.mobile}
        </p>
      </div>
    </div>
  )
}

export default AddressCard
