import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Hero Section */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-8">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            FitAI
          </h1>
          <p className="text-2xl mb-4 leading-relaxed drop-shadow-md text-slate-200">
            Treinos e dietas personalizadas com IA
          </p>
          <p className="text-lg mb-8 drop-shadow-md text-slate-300">
            Responda um quiz rápido e receba um plano personalizado para alcançar seus objetivos de saúde e fitness.
          </p>
          <Link href="/quiz">
            <button className="btn-primary text-xl font-bold shadow-2xl">
              Iniciar Meu Plano
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}