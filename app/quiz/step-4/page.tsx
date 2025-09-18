"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Check, HelpCircle, CircleOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout" // Importer QuizLayout

function Step4Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || ""

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    // Avance automatique après la sélection (optionnel)
    setTimeout(() => {
      router.push(`/quiz/step-5?gender=${gender}&age=${age}&tiredness=${option}`)
    }, 500)
  }

  const options = [
    { text: "Souvent", icon: Check },
    { text: "Parfois", icon: HelpCircle },
    { text: "Rarement", icon: CircleOff },
  ]

  return (
    // Utiliser QuizLayout pour la barre de progression
    <QuizLayout step={1} totalSteps={26}>
      {/* En-tête personnalisé pour les pages du quiz - modifié pour l'étape 4 */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={`/quiz/step-3?gender=${gender}&age=${age}`} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <span className="text-gray-600 text-sm font-medium">1/26</span>
      </header>
      {/* Ajouter une marge supérieure pour l'en-tête fixe */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            À quelle fréquence vous sentez-vous fatigué(e) ou manquez-vous d'énergie,
            <br />
            même après vous être reposé(e) ?
          </h1>
        </div>
        <div className="w-full max-w-md space-y-4">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.text}
                onClick={() => handleOptionSelect(option.text)}
                className={`w-full p-4 text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 flex items-center gap-4 ${
                  selectedOption === option.text
                    ? "border-teal-500 bg-white text-gray-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-6 h-6 ${selectedOption === option.text ? "text-teal-500" : "text-gray-400"}`} />
                <span>{option.text}</span>
              </button>
            )
          })}
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step4() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Step4Content />
    </Suspense>
  )
}
