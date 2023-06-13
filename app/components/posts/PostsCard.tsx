'use client'

import { SafePost } from '@/app/types/types'
import { ReactionBarSelector } from '@charkour/react-reactions';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import TimeAgo from '../TimeAgo';


export default function PostsCard({ post }: { post: SafePost }) {



  return (<div className="flex bg-white shadow-lg rounded-lg mx-auto w-full md:max-w-2xl ">
    <div className="flex items-start px-4 py-6 w-full">
      <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post.Author.image} alt="avatar"></img>
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.Author.name} </h2>
          <small className="text-sm text-gray-700"><TimeAgo date={post.createdAt} /></small>
        </div>
        <p className="text-gray-800">{post.topic}</p>
        <p className="mt-3 text-gray-700 text-sm whitespace-pre-line">{post.content}</p>
        <div className="mt-4 flex items-center justify-center">
          <div className='mr-5'>
            <ReactionBarSelector iconSize={16} />
          </div>
          <div className="flex mr-2 text-gray-700 text-sm mr-3">
            👍
            <span>12</span>
          </div>
          <div className="flex mr-2 text-gray-700 text-sm mr-3">
            ❤️
            <span>12</span>
          </div>
          <div className="flex mr-2 text-gray-700 text-sm mr-3">
            😆
            <span>12</span>
          </div>
          <div className="flex mr-2 text-gray-700 text-sm mr-3">
            😮
            <span>12</span>
          </div>
          <div className="flex mr-2 text-gray-700 text-sm mr-3">
            😢
            <span>12</span>
          </div>
          <div className="flex mr-2 text-gray-700 text-sm mr-3">
            😡
            <span>12</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
