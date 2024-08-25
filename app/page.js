import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-surfing bg-opacity-90 text-white text-center">
        <h1 className="text-black text-5xl font-bold mb-4">Ride the Waves</h1>
        <p className="text-black text-xl mb-8">Find the perfect surfboard for your next adventure.</p>
        <div className="space-x-4">
          <Link className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-md text-lg font-semibold" href="/surfboards">
           
              Browse Surfboards
           
          </Link>
          {/* <Link className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-md text-lg font-semibold" href="/login">
           
              Login
           
          </Link> */}
        </div>
      </div>
    </Layout>
  );
}
