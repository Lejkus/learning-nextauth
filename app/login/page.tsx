'use client';
import { ReactionBarSelector } from '@charkour/react-reactions';


import React from 'react'
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function page() {
  return (
    <div className=''>
      <Link className='m-5' href="/">back</Link>
      <button onClick={() => {
        toast.success('Logged in')
      }}>toast</button>
      <button className='m-5 border-2 border-sky-500' onClick={() => {
        signIn('github')
      }}>zaloguj przez git </button>
      
      <ReactionBarSelector iconSize={20} onSelect={(reaction)=>{toast.success(reaction);
      }} />
    </div>
  )
}
