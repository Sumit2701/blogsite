'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'
import classes from './createBlog.module.css'

const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState("Nature")
    const [imageUrl, setImageUrl] = useState('')

    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>
            Access Denied, Please login
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if( !title || !category || !desc){
            toast.error("All fields are required")
            return
        }

        try {
          
          
          const res = await fetch(`http://localhost:3000/api/blog`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}` 
            },
            method: 'POST',
            body: JSON.stringify({title,desc,category,imageUrl,authorId: session?.user?._id})

          })
          

          if(!res.ok){
            throw new Error("Error occured")
          }

          const blog = await res.json()

          router.push(`/`)
        } catch (error) {
            console.log(error)
        }
    }

   

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder='Description...' onChange={(e) => setDesc(e.target.value)}
                    className={classes.descriptionBox} />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Nature">Nature</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Ocean">Ocean</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Forest">Forest</option>
                    </select>
                    <input type="text" placeholder='ImageUrl...' onChange={(e) => setImageUrl(e.target.value)} />
                  <button className={classes.createBlog}>Create</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog