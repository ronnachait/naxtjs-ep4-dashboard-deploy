"use client"
import React , {useState , useEffect} from 'react'
import AdminNav from '../../../components/AdminNav'
import Container from '../../../components/Container'
import Footer from '../../../components/Footer'
import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


function AdminEditUsersPage({params}) {

  const {data: session} = useSession();
  if(!session) redirect("/login");
  if(!session?.user?.role === "admin") redirect("/welcome");

  const { id } = params;

  const [userOldData , setUserOldData] = useState([]);

  //New user data
  const [newName , setNewName] = useState("");
  const [newEmail , setNewEmail] = useState("");
  const [newPassword , setNewPassword] = useState("");

  const router = useRouter();

  const getUserById = async (id) => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`,{
        method: "GET",
        cache: "no-store"
      })

      if(!res.ok){
        throw new Error("Failed to fetch Users.");
      }   

      const data = await res.json();
      setUserOldData(data.user)

    }catch(error){
      console.log(error)
    }
  }

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`,{
          method: "PUT",
          headers: {
          "Content-Type": "application/josn"
          },
          body: JSON.stringify({newName , newEmail , newPassword})
        })

        if(!res.ok){
          throw new Error("Failed to update user");
        }
        
        router.refresh();
        router.push("/admin/users");


      }catch(error){
        console.log(error)
      }

    }

  useEffect(()=>{
    getUserById(id);
  },[])

  return (
    <Container>
      <AdminNav session={session}/>
      <div className="flex-grow">
        <div div className="container mx-auto shadow-xl my-10 p-10 rounded-xl ">
                <Link href="/admin/users" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'> Go back</Link>
                <hr  className='my-3'/>
                <h3 className='text-xl'>Admin Edit User Post</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder={userOldData?.name} onChange={(e) => setNewName(e.target.value)} value={newName} />
                    <input type="email" className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder={userOldData?.email} onChange={(e) => setNewEmail(e.target.value)}  value={newEmail} />
                    <input type="password" className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder={userOldData?.password} onChange={(e) => setNewPassword(e.target.value)}  value={newPassword} />
                    <button className='bg-green-500 text-white border py-2 px-2 rounded text-lg my-2' type='submit' name="update">Update User</button>
                </form>
            </div>
      </div>
      <Footer/>
    </Container>
  )
}

export default AdminEditUsersPage
