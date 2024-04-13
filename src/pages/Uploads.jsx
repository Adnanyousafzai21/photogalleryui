import React from 'react'
import UploadImage from '../components/UploadimgComponent'
import Allboxes from '../components/Allboxes'

const MyUploads = () => {
    return (
        <div className='bg-slate-100 border px-2 h-screen'>
            <UploadImage />
            <hr className='my-2 border  mt-2' />
            <Allboxes />
        </div>
    )
}

export default MyUploads
