'use client';

import { User } from '@prisma/client';
import React, { useState, useCallback } from 'react'
import Picker from 'emoji-picker-react';
import Link from 'next/link';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function NewPostClient({ currentUser }: { currentUser: User }) {
  const router = useRouter();

  const [newPost, setNewPost] = useState({ topic: '', content: '' })
  const [isOpen, SetIsOpen] = useState(false)

  // @ts-ignore
  const onEmojiClick = useCallback((event) => {
    console.log(event.emoji)
    SetIsOpen(false)
    setNewPost({ ...newPost, content: newPost.content + event.emoji })
  }, [newPost]);

  const onSubmit = () => {
    axios.post('/api/post', newPost)
      .then(() => {
        toast.success('Post created!');
        router.refresh();
        // reset();
        // setStep(STEPS.CATEGORY)
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        router.push('/');
      })
  }


  return (<div>

    <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Joke</div>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      <input onChange={(e) => { setNewPost({ ...newPost, topic: e.currentTarget.value }) }} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="What is the joke about" type="text"></input>
      <textarea value={newPost.content} onChange={(e) => { setNewPost({ ...newPost, content: e.currentTarget.value }) }} className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Tell everyone a joke"></textarea>

      <div className="icons flex text-gray-500 m-2">
        <svg onClick={() => { SetIsOpen(!isOpen) }} className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {isOpen ? <div className='absolute'><p></p><Picker onEmojiClick={onEmojiClick} /></div> : <></>}
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
        <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
      </div>

      <div className="buttons flex">
        <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"><Link href="/">Cancel</Link></div>
        <div onClick={onSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
      </div>

    </div>
  </div>
  )
}
