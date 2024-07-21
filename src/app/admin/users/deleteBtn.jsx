"use client"
import React from 'react'

function deleteBtn({ id }) {

    const headelDelete = async () => {
        const confirmed = confirm("Are you sure?");

        if(confirmed){
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers?id=${id}`,{
                method: "DELETE"
            })

            if(res.ok){
                window.location.reload();
            }
        }
    }
  return (
    <a onClick={headelDelete} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>
        Delete
    </a>
  )
}

export default deleteBtn
