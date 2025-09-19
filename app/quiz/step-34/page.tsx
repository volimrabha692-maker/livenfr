"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Step34() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // L'état initial reste le même (toutes les barres à hauteur 0)
  const [animatedBars, setAnimatedBars] = useState([0, 0, 0, 0])

  // Obtenir le mois actuel et les 3 prochains mois
  const getMonthsSequence = () => {
    const now = new Date()
    const months = []
    for (let i = 0; i < 4; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1)
      months.push({
        name: date.toLocaleDateString("fr-FR", { month: "long" }),
        year: date.getFullYear(),
      })
    }
    return months
  }

  // Calculer la date cible (dans 3 mois)
  const getTargetDate = () => {
    const now = new Date()
    const target = new Date(now.getFullYear(), now.getMonth() + 3, 1)
    return target.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
  }

  // Animer les barres au montage du composant
  useEffect(() => {
    // Nous définissons simplement l'état final. L'animation échelonnée sera contrôlée par le CSS.
    const timer = setTimeout(() => {
      setAnimatedBars([30, 50, 70, 90])
    }, 100) // Un petit délai pour s'assurer que le rendu initial avec une hauteur de 0 a bien lieu

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/quiz/step-35?${params.toString()}`)
  }

  const months = getMonthsSequence()
  const barColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"]
  // NOUVEAU : Tableau de classes de délai pour l'animation séquentielle
  const delayClasses = ["delay-0", "delay-200", "delay-400", "delay-600"]

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4 max-w-md">
          Un programme conçu pour soutenir votre parcours de bien-être
        </h1>

        <p className="text-gray-600 text-center mb-2 max-w-md">
          D'après vos réponses, nous prévoyons que vous améliorerez votre bien-être d'ici
        </p>

        <p className="text-xl font-semibold text-gray-800 mb-12">{getTargetDate()}</p>

        <div className="w-full max-w-md mb-8">
          <div className="flex items-end justify-center space-x-4 h-48 mb-4">
            {animatedBars.map((height, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full">
                {/* Étiquette d'objectif pour la dernière barre (index 3) */}
                {index === 3 && (
                  <div className="mb-2 relative">
                    <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-md font-medium">Objectif</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-green-500"></div>
                  </div>
                )}
                
                {/* Séparateur pour connecter l'indicateur d'objectif à la barre */}
                 {index === 3 && (
                    <div className="w-4 h-4 bg-transparent border-2 border-green-500 rounded-full mb-[-8px] z-10 bg-[#f5f3f0]"></div>
                 )}

                {/* Barre */}
                <div
                  // CHANGEMENT : Ajoute la classe de délai et ajuste la durée
                  className={`w-12 ${barColors[index]} rounded-lg transition-all duration-1000 ease-out shadow-sm ${delayClasses[index]}`}
                  style={{
                    height: `${height}%`,
                  }}
                ></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            {months.map((month, index) => (
              <div key={index} className="w-12 text-center">
                <span className="text-xs text-gray-600 font-medium block">{month.name.substring(0,3)}</span>
                {index === 0 && <span className="text-xs text-gray-400">(Maint.)</span>}
                {index === 3 && <span className="text-xs text-green-600 font-medium">(Objectif)</span>}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Le graphique est une illustration non personnalisée et les résultats peuvent varier
          </p>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-medium transition-colors duration-200"
        >
          Continuer
        </Button>
      </main>
    </div>
  )
}
