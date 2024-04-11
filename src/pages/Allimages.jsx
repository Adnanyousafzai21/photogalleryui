import React, { useEffect, useState } from 'react'
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
import ProfileTitle from '../components/ProfileTitle';
const Posts = () => {


  
    const [data, setData] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/img/getAllImg`)
            if (response.ok) {
                const postData = await response.json()
                setData(postData.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className='w-[100%] flex flex-wrap gap-4 justify-center items-center m-auto bg-sky-50  '>
            {
                data && data?.map((data) => {
                    return <div className='flex flex-col py-5 rounded  my-2 w-[30%] bg-white' key={data._id}>
                        <div className="flex justify-between items-center px-5">
                            <ProfileTitle classname="" fullname={data?.user?.fullname} time={data?.createdAt} userId={data.user?._id}/>
                           <div>private</div>
                         </div>
                          <div>
                              <img src={data.imageUrl} alt="" className=' h-64 w-full my-3' />
                         </div>
                    </div>
                })
            }
        </div>
    )
}
export default Posts



























            // <div className='w-full '>
            // {
            //     data && data?.map((data) => {
            //         return <div className='flex flex-col py-5 rounded bg-customwhite my-2' key={data._id}>
            //             <div className='w-[50%] m-auto'>
            //                 <img src={data.imageUrl} alt="" className=' h-64 w-full my-3' />
                           
            //             </div>
            //         </div>
            //     })
            // }
            // </div>