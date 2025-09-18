"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Check, HelpCircle, CircleOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout" // 1. Importation du QuizLayout

function Step7Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  // Collecte de tous les paramètres nécessaires
  const gender = searchParams.get("gender") || ""
  const age = searchParams.get("age") || ""
  const tiredness = searchParams.get("tiredness") || ""
  const lastMinute = searchParams.get("lastMinute") || ""
  const distraction = searchParams.get("distraction") || ""

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      // Navigation vers l'étape suivante avec tous les paramètres accumulés
      router.push(
        `/quiz/step-8?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${option}`,
      )
    }, 500)
  }

  // Options pour l'étape 7, avec les icônes
  const options = [
    { text: "Souvent", icon: Check },
    { text: "Parfois", icon: HelpCircle },
    { text: "Rarement", icon: CircleOff },
  ]

  return (
    // 2. Utilisation de QuizLayout pour la cohérence (barre de progression, etc.)
    <QuizLayout step={4} totalSteps={26}>
      
      {/* 3. En-tête copié de l'étape 6 et mis à jour pour l'étape 7 */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link
          href={`/quiz/step-6?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}`}
          className="p-2"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          {/* L'icône centrale peut être la même pour maintenir la cohérence */}
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <span className="text-gray-600 text-sm font-medium">4/26</span> {/* Numéro de l'étape mis à jour */}
      </header>

      {/* 4. 'main' avec la même structure et le même espacement que l'étape 6 */}
      {/* La marge supérieure mt-4 assure que le contenu ne se trouve pas sous l'en-tête fixe */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        
        {/* Bloc de titre suivant le modèle de l'étape 6 */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            À quelle fréquence vous sentez-vous inquiet(e) ou dépassé(e) ?
          </h1>
        </div>
        
        {/* 5. Bloc d'options avec le même style que l'étape 6, adapté pour inclure les icônes */}
        <div className="w-full max-w-md space-y-4">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.text}
                onClick={() => handleOptionSelect(option.text)}
                // Classes de style unifiées avec l'étape 6
                className={`w-full p-4 text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 flex items-center gap-4 ${
                  selectedOption === option.text
                    ? "border-teal-500 bg-white text-gray-800" // Style lorsque sélectionné
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300" // Style par défaut
                }`}
              >
                <Icon
                  className={`w-6 h-6 flex-shrink-0 ${
                    selectedOption === option.text ? "text-teal-500" : "text-gray-400"
                  }`}
                />
                <span>{option.text}</span>
              </button>
            )
          })}
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step7() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center">Chargement...</div>}>
      <Step7Content />
    </Suspense>
  )
}
