import React from 'react'
import UploadImage from './UploadimgComponent'
import Allboxes from './Allboxes'

const MyProfile = () => {
    return (
        <div className='bg-slate-100 border px-2'>
            <UploadImage />
            <hr className='border  my-4' />
            <Allboxes />
        </div>
    )
}

export default MyProfile
