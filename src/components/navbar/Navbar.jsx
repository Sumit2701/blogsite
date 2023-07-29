'use client'
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import classes from './navbar.module.css';
import personIcon from '../../../public/user.jpg'; // Replace this with an appropriate user icon
import Image from 'next/image';
const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.left}>
          <Link href="/">Sumit Blogsite</Link>
        </h2>
        <div>
        <Link href="/create-blog" className={classes.create}>
                Create New Blog
              </Link>
        </div>
        <ul className={classes.right}>
          {session?.user ? (
            
            <div className={classes.userContainer}>
              
              <Image src={personIcon} alt="User Icon" width="30" height="40" />
              <span className={classes.userName}>{session.user.name}</span>
              <button onClick={signOut} className={classes.logout}>
                Logout
              </button>
              
            </div>
          ) : (
            <>
              <button onClick={signIn} className={classes.login}>
                Log in
              </button>
              <Link href="/register">Register</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
