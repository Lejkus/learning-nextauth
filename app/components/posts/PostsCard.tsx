'use client'

import { SafePost } from '@/app/types/types'
import { ReactionBarSelector } from '@charkour/react-reactions';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import TimeAgo from '../TimeAgo';
import { Reaction, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';




export default function PostsCard({ post, currentUser }: { post: SafePost, currentUser: User | null }) {
  //need to refactor code a little bit 
  const router = useRouter();
  const postReactions = post.reactions

  const [reaction, setReaction] = useState()

  function countReaction(type: string) {
    let likeCount = 0;

    for (let i = 0; i < postReactions.length; i++) {
      if (postReactions[i].ReactionType === type) {
        likeCount++;
      }
    }

    return likeCount;
  }

  const onReaction = (type: string) => {
    axios.post('/api/reaction', { postId: post.id, userId: currentUser.id, reactionType: type })
      .then(() => {
        toast.success(`Added reaction!`);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
  }

  useEffect(() => {
    const reaction = postReactions.find((obj: Reaction) => obj.authorId === currentUser.id && obj.postId === post.id);
    if (reaction) {
      setReaction(reaction.ReactionType)
    }else{
      setReaction(undefined)
    }
  }, [postReactions])




  return (<div className="flex bg-white shadow-lg rounded-lg mx-auto w-full md:max-w-2xl ">
    <div className="flex items-start px-4 py-6 w-full">
      <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post.Author.image} alt="avatar"></img>
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.Author.name} </h2>
          <small className="text-sm text-gray-700"><TimeAgo date={post.createdAt} /></small>
        </div>
        <p className="text-gray-800 text-2xl">{post.topic}</p>
        <p className="mt-3 text-gray-700 text-xl whitespace-pre-line">{post.content}</p>
        <div className="mt-4 flex items-center justify-center">
          <div onClick={() => { onReaction('LIKE') }} className={`flex text-lg transition-all mr-3 p-1 rounded-2xl cursor-pointer hover:scale-110 ${reaction === 'LIKE' ? 'bg-gray-200' : ''} hover:bg-gray-100`}>
            👍
            <span>{countReaction('LIKE')}</span>
          </div>
          <div onClick={() => { onReaction('LOVE') }} className={`flex text-lg transition-all mr-3 p-1 rounded-2xl cursor-pointer hover:scale-110 ${reaction === 'LOVE' ? 'bg-gray-200' : ''} hover:bg-gray-100`}>
            ❤️
            <span>{countReaction('LOVE')}</span>
          </div>
          <div onClick={() => { onReaction('HAHA') }} className={`flex text-lg transition-all mr-3 p-1 rounded-2xl cursor-pointer hover:scale-110 ${reaction === 'HAHA' ? 'bg-gray-200' : ''} hover:bg-gray-100`}>
            😆
            <span>{countReaction('HAHA')}</span>
          </div>
          <div onClick={() => { onReaction('WOW') }} className={`flex text-lg transition-all mr-3 p-1 rounded-2xl cursor-pointer hover:scale-110 ${reaction === 'WOW' ? 'bg-gray-200' : ''} hover:bg-gray-100`}>
            😮
            <span>{countReaction('WOW')}</span>
          </div>
          <div onClick={() => { onReaction('SAD') }} className={`flex text-lg transition-all mr-3 p-1 rounded-2xl cursor-pointer hover:scale-110 ${reaction === 'SAD' ? 'bg-gray-200' : ''} hover:bg-gray-100`}>
            😢
            <span>{countReaction('SAD')}</span>
          </div>
          <div onClick={() => { onReaction('ANGRY') }} className={`flex text-lg transition-all mr-3 p-1 rounded-2xl cursor-pointer hover:scale-110 ${reaction === 'ANGRY' ? 'bg-gray-200' : ''} hover:bg-gray-100`}>
            😡
            <span>{countReaction('ANGRY')}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
