'use client'
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react'
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

export default function Navbar({ currentUser }: { currentUser: User | null }) {

    const name = useMemo(() => {
        if (currentUser) {
            return currentUser.name;
        }

    }, [currentUser]);

    if (currentUser) {
        return <div className='flex justify-around w-full bg-slate-400' >
            Navbar
            <h1>{name}<img className='rounded-full h-10' src={currentUser?.image || ''}></img></h1>
            <button className='m-50' onClick={() => {
                signOut()
            }}>wyloguj</button>
        </div>
    }

    return (
        <div className='flex justify-around w-full bg-slate-400'>Navbar  <Link href="/login">Login</Link></div>
    )
}
