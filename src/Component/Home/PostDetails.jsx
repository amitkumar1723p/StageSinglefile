import React from 'react'
// import 'tailwindcss/tailwind.css'; 

export default function PostDetails() {

const posts = [
    {
        id:1,
        imgUrl:'/img/postDetailsImg/buiding-1.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:2,
        imgUrl:'/img/postDetailsImg/buiding-2.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:3,
        imgUrl:'/img/postDetailsImg/building-3.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:4,
        imgUrl:'/img/postDetailsImg/About-img.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:5,
        imgUrl:'/img/postDetailsImg/buiding-4.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:6,
        imgUrl:'/img/postDetailsImg/About-img.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:7,
        imgUrl:'/img/postDetailsImg/building-5.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:8,
        imgUrl:'/img/postDetailsImg/buiding-6.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    {
        id:9,
        imgUrl:'/img/postDetailsImg/buiding-2.jpg',
        price:'2.5 CR',
        projectName:'DLF THE PRIMUS',
        location:'DLF Phase 1, Gurugram',
    },
    
]

  return (
    <div className='w-[80%] max-w-[1300px] mx-auto my-5 flex flex-col gap-3  border-solid border-black      sm:w-[90%]'>
      <div className='outline border-1 border-solid bg-red-600'> Search and filter area</div>

      <div className='w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {posts.map(posts =>(
            <div className='w-full  max-w-[420px] h-80 mx-auto rounded-[8px]  bg-cover bg-center'  style={{ backgroundImage:`url(${posts.imgUrl})` }}>
               <div className='h-[100%] w-full rounded-[8px] bg-black/40  flex  items-end'>
               <div className='w-full  !p-3 flex flex-col gap-2' >
                    <div className='w-full h-[50%] border-b-2 border-[#FFD700] py-[5px] flex flex-col gap-[5px]'>
                        <div className='w-full h-[50%] text-[#FFD700]'>₹ {posts.price}</div>
                        <div className='w-full h-[50%] font-bold text-white text-[18px] '>{posts.projectName}</div>
                    </div>
                    <div className='w-full h-[50%] flex flex-col gap-[5px]'>
                        <div className='w-full h-[50%] text-white font-extralight text-[14px]'>{posts.location}</div>
                        <div className='w-full h-[50%] '>
                            <button className='w-full flex justify-center item-center py-1  border-1 border-[#FFD700] rounded-[8px]  text-white transition duration-200  hover:shadow-[0px_0px_10px_#ffd90072] active:bg-[#ffe34689]'>View More <img src="/img/postDetailsImg/solar_arrow-right-up-outline.svg" alt="" /></button>
                        </div>
                    </div>
                </div>
               </div>
               
                
               
            </div>
        ))}
      
    </div>
</div>
  )
}
