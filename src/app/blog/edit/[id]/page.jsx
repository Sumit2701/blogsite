'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import classes from './edit.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const Edit = (ctx) => {
  
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("Nature")
    const [imageUrl, setImageURL] = useState("")
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`)

            const blog = await res.json()

            setTitle(blog.title)
            setDesc(blog.desc)
            setCategory(blog.category)
            setImageURL(blog.imageUrl)
        }
        fetchBlog()
    }, [])

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>
            Access Denied, Login required
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(title === '' || category === '' || desc === ''){
            toast.error("All fields are required")
            return
        }

       
            
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method: "PUT",
                body: JSON.stringify(body)
            })

            if(!res.ok){
                throw new Error("Error has occured")
            }

            const blog = await res.json()

            router.push(`/blog/${blog?._id}`)
      
        }


   


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <input value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={desc} placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Nature">Nature</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Ocean">Ocean</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Forest">Forest</option>
                    </select>
                    <input value={imageUrl} type="text" placeholder='Title...' onChange={(e) => setImageURL(e.target.value)} />
                    <button className={classes.createBlog}>Edit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit