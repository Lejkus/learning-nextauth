'use client';


import React from 'react'
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function loginBtn() {
  return (
    <div className=''>
      <Link className='m-5' href="/">back</Link>
      <button onClick={() => {
        signIn('credentials', {
          email: '123@wp.pl',
          password: '1234',
          redirect: false,
        })
      }}>zaloguj </button>
      <button className='m-5 border-2 border-sky-500' onClick={() => {
        signIn('github')
      }}>zaloguj przez git </button>
    </div>
  )
}
