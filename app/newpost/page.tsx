import React, { useState } from 'react'
import { Post } from '@prisma/client';
import getCurrentUser from '../actions/getCurrentUser';

export default async function page() {
  const [d, setfirst] = useState({})
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div>Zaloguj sie aby dodac post</div>
    );
  }
  return (
    <div>page</div>
  )
}
