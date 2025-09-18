"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Check, HelpCircle, CircleOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"

function Step5Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || ""
  const tiredness = searchParams.get("tiredness") || ""

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    // Avance automatique après la sélection (optionnel)
    setTimeout(() => {
      router.push(`/quiz/step-6?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${option}`)
    }, 500)
  }

  const options = [
    { text: "Souvent", icon: Check },
    { text: "Parfois", icon: HelpCircle },
    { text: "Jamais", icon: CircleOff },
  ]

  return (
    // Utiliser QuizLayout pour la barre de progression, maintenant à l'étape 2/26
    <QuizLayout step={2} totalSteps={26}>
      {/* En-tête personnalisé pour les pages du quiz - modifié pour l'étape 5 */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={`/quiz/step-4?gender=${gender}&age=${age}&tiredness=${tiredness}`} className="p-2">
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
        <span className="text-gray-600 text-sm font-medium">2/26</span>
      </header>
      {/* Ajouter une marge supérieure pour l'en-tête fixe */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Avez-vous souvent tendance à tout remettre
            <br />
            à la dernière minute ?
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

export default function Step5() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Step5Content />
    </Suspense>
  )
}
