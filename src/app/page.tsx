import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dark-blue">
      <div className="text-white text-7xl font-anek-latin font-bold -mt-8" style={{ textShadow: '3px 3px 0 black' }}>
        MagistrAI
      </div>
      <div className="text-white text-2xl italic font-anek-latin mt-4">
        ~ latin markup tool ~
      </div>
      <div className="mt-16 flex space-x-8">
        <Link href="/about" className="px-6 py-3 text-2xl text-white rounded-lg focus:outline-none border border-white transition-transform transform hover:scale-105" style={{ textShadow: '1px 1px 0 black' }}>
          About
        </Link>
        <Link href="/prose-analysis" className="px-6 py-3 text-2xl text-white rounded-lg focus:outline-none border border-white transition-transform transform hover:scale-105" style={{ textShadow: '1px 1px 0 black' }}>
          Prose Analysis
        </Link>
      </div>
    </main>
  );
}