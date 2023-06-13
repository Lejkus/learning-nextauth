import React, { useState } from 'react'
import { Post } from '@prisma/client';
import getCurrentUser from '../actions/getCurrentUser';
import NewPostClient from './NewPostClient';
import ClientOnly from '../components/ClientOnly';

export default async function NewPostPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div>Zaloguj sie aby dodac post</div>
    );
  }
  return (
    <div>
      <ClientOnly>
        <NewPostClient currentUser={currentUser} />
      </ClientOnly>
    </div>
  )
}
