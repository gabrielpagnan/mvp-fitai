'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Dumbbell, Utensils } from 'lucide-react'

interface QuizData {
  objetivo: string
  idade: number
  peso: number
  altura: number
  tempo: number
  dias: number
  nivel: string
  restricoes: string
}

function generateWorkout(data: QuizData): string {
  const { objetivo, tempo, dias, nivel } = data
  let workout = ''

  if (objetivo === 'emagrecer') {
    workout = 'Foco em cardio e exercícios de queima calórica.'
  } else if (objetivo === 'ganhar-massa') {
    workout = 'Foco em treinamento de força e pesos.'
  } else {
    workout = 'Foco em definição muscular com mix de cardio e força.'
  }

  workout += `\nDias por semana: ${dias}\nTempo por sessão: ${tempo} minutos\nNível: ${nivel}\n\nExercícios sugeridos:\n- Agachamento: 3 séries de 10-15 reps\n- Flexão: 3 séries de 8-12 reps\n- Corrida: 20-30 minutos\n- Abdominal: 3 séries de 15 reps`

  return workout
}

function generateDiet(data: QuizData): string {
  const { objetivo, restricoes } = data
  let diet = 'Refeições práticas e baratas:\n\nCafé da manhã: Aveia com frutas\nAlmoço: Arroz, feijão, carne magra e salada\nJantar: Peixe grelhado com vegetais\nLanches: Iogurte natural e frutas'

  if (restricoes) {
    diet += `\n\nConsiderando suas restrições: ${restricoes} - Ajuste conforme necessário.`
  }

  if (objetivo === 'emagrecer') {
    diet += '\nFoco em déficit calórico.'
  } else if (objetivo === 'ganhar-massa') {
    diet += '\nFoco em superávit calórico com proteínas.'
  }

  return diet
}

export default function Results() {
  const [data, setData] = useState<QuizData | null>(null)
  const [workout, setWorkout] = useState('')
  const [diet, setDiet] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('quizData')
    if (stored) {
      const parsed: QuizData = JSON.parse(stored)
      setData(parsed)
      setWorkout(generateWorkout(parsed))
      setDiet(generateDiet(parsed))
    }
  }, [])

  if (!data) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Carregando...</div>

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          Seu Plano Personalizado
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center">
              <Dumbbell className="mr-2" /> Treino
            </h2>
            <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed">{workout}</pre>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center">
              <Utensils className="mr-2" /> Dieta
            </h2>
            <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed">{diet}</pre>
          </div>
        </div>
        <div className="text-center">
          <Link href="/quiz">
            <button className="btn-secondary text-xl">
              Gerar Novamente
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}