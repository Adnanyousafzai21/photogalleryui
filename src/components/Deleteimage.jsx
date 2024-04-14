import axios from 'axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { MdDeleteOutline } from 'react-icons/md'
import { context } from '../contextapi/context'

const Deleteimage = ({ imageId }) => {

    const {setdeleteimag}=useContext(context)
    const token = localStorage.getItem("token")
    console.log("image id ", imageId)

    const handelDelete = async () => {
        const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/img/deleteimageById/${imageId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.status===201){
            setdeleteimag(prev=>!prev)
            toast.success(response.data.message)
        }
    }

    return (
        <div>
            <MdDeleteOutline title='Want to delete' onClick={handelDelete} className='text-[#FFFFFF]  text-xl   hover:text-red-500 duration-500' />

        </div>
    )
}

export default Deleteimage
