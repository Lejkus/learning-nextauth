import Link from 'next/link';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import PostsCard from './components/posts/PostsCard';
import getPosts from './actions/getPosts';

const Home = async () => {
  const currentUser = await getCurrentUser()
  const posts = await getPosts()

  if (!posts) {
    return (
      <ClientOnly>
        No posts
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <center>
        <div className='flex justify-center flex-col w-4/6 p-5'>
          <Link href='/newpost' className='w-full'>
            <button className='btn border border-indigo-500 px-4 font-semibold cursor-pointer w-full text-gray-200 ml-2 bg-indigo-500 p-3 text-lg'>Add new joke😆</button>
          </Link>
          ...or just scroll
        </div>
        <div className='grid grid-cols-1 gap-3 max-w-screen-2xl'>
          {posts.map((post) => (
            <PostsCard key={post.id} post={post} currentUser={currentUser} />
          ))}
        </div>
      </center>
    </ClientOnly>
  )
}

export default Home;
