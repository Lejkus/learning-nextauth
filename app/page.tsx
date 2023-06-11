
import Link from 'next/link';
import getCurrentUser from './actions/getCurrentUser';

const Home = async () => {
  const currentUser = await getCurrentUser()
  
  if(!currentUser){
    return (
      <main className="">
        <Link href="/login">Zaloguj sie aby zobaczyć coctaile</Link>
      </main>
    )
  }

  return (
    <main className="">
      <h1>Cotaile</h1>
    </main>
  )
}

export default Home;
