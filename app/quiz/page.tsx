'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Calendar, Circle, Clock, Star, Heart, Loader2 } from 'lucide-react'

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

export default function Quiz() {
  const [data, setData] = useState<QuizData>({
    objetivo: '',
    idade: 0,
    peso: 0,
    altura: 0,
    tempo: 0,
    dias: 0,
    nivel: '',
    restricoes: ''
  })

  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: name === 'idade' || name === 'peso' || name === 'altura' || name === 'tempo' || name === 'dias' ? Number(value) : value }))
  }

  const handleSubmit = () => {
    localStorage.setItem('quizData', JSON.stringify(data))
    router.push('/results')
  }

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1)
    } else if (currentStep === 7) {
      setCurrentStep(8)
    } else {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (currentStep === 8) {
      const timer = setTimeout(() => {
        handleSubmit()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="fade-in text-center">
            <Users className="quiz-icon" />
            <h2 className="quiz-subtitle">Qual é o seu objetivo?</h2>
            <select name="objetivo" value={data.objetivo} onChange={handleChange} required className="input w-full text-center">
              <option value="">Selecione seu objetivo</option>
              <option value="emagrecer">Emagrecer</option>
              <option value="ganhar-massa">Ganhar Massa</option>
              <option value="definir">Definir</option>
            </select>
          </div>
        )
      case 1:
        return (
          <div className="fade-in text-center">
            <Calendar className="quiz-icon" />
            <h2 className="quiz-subtitle">Qual é a sua idade?</h2>
            <input type="number" name="idade" value={data.idade} onChange={handleChange} required className="input w-full text-center" placeholder="Ex: 25" />
          </div>
        )
      case 2:
        return (
          <div className="fade-in text-center">
            <Circle className="quiz-icon" />
            <h2 className="quiz-subtitle">Qual é o seu peso?</h2>
            <input type="number" name="peso" value={data.peso} onChange={handleChange} required className="input w-full text-center" placeholder="Ex: 70 kg" />
          </div>
        )
      case 3:
        return (
          <div className="fade-in text-center">
            <Circle className="quiz-icon" />
            <h2 className="quiz-subtitle">Qual é a sua altura?</h2>
            <input type="number" name="altura" value={data.altura} onChange={handleChange} required className="input w-full text-center" placeholder="Ex: 170 cm" />
          </div>
        )
      case 4:
        return (
          <div className="fade-in text-center">
            <Clock className="quiz-icon" />
            <h2 className="quiz-subtitle">Tempo disponível por dia para treinos?</h2>
            <input type="number" name="tempo" value={data.tempo} onChange={handleChange} required className="input w-full text-center" placeholder="Ex: 60 minutos" />
          </div>
        )
      case 5:
        return (
          <div className="fade-in text-center">
            <Clock className="quiz-icon" />
            <h2 className="quiz-subtitle">Quantos dias por semana você pode treinar?</h2>
            <input type="number" name="dias" value={data.dias} onChange={handleChange} min="1" max="7" required className="input w-full text-center" placeholder="Ex: 5" />
          </div>
        )
      case 6:
        return (
          <div className="fade-in text-center">
            <Star className="quiz-icon" />
            <h2 className="quiz-subtitle">Qual é o seu nível de experiência?</h2>
            <select name="nivel" value={data.nivel} onChange={handleChange} required className="input w-full text-center">
              <option value="">Selecione seu nível</option>
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>
        )
      case 7:
        return (
          <div className="fade-in text-center">
            <Heart className="quiz-icon" />
            <h2 className="quiz-subtitle">Restrições ou preferências alimentares</h2>
            <textarea name="restricoes" value={data.restricoes} onChange={handleChange} className="input w-full h-32 resize-none text-center" placeholder="Ex: vegetariano, alergia a glúten, etc." />
          </div>
        )
      case 8:
        return (
          <div className="fade-in text-center">
            <Loader2 className="quiz-icon animate-spin" />
            <h2 className="quiz-subtitle">Estamos criando seu plano ideal...</h2>
            <p className="text-slate-400 mt-4">Analisando suas respostas e gerando recomendações personalizadas.</p>
          </div>
        )
      default:
        return null
    }
  }

  const getProgress = () => {
    if (currentStep <= 7) {
      return (currentStep / 7) * 100
    }
    return 100
  }

  const isDisabled = () => {
    switch (currentStep) {
      case 0: return !data.objetivo
      case 1: return !data.idade
      case 2: return !data.peso
      case 3: return !data.altura
      case 4: return !data.tempo
      case 5: return !data.dias
      case 6: return !data.nivel
      case 7: return false
      default: return true
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="quiz-title">
          Seu Quiz Personalizado
        </h1>
        
        {/* Barra de progresso */}
        <div className="w-full bg-slate-700/50 rounded-full h-3 mb-10 overflow-hidden">
          <div 
            className="progress-bar h-3 rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
        
        <div className="card">
          {renderStep()}
        </div>
        
        {currentStep !== 8 && (
          <div className="text-center mt-10">
            <button 
              onClick={nextStep} 
              className="btn-primary text-xl font-bold"
              disabled={isDisabled()}
            >
              {currentStep === 7 ? 'Gerar Meu Plano' : 'Continuar'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}