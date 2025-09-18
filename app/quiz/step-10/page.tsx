"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { ArrowLeft, ThumbsDown, ThumbsUp, HelpCircle, XCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout" // 1. Importation du layout standard

function Step10Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Rassemble tous les paramètres de l'URL pour les transmettre proprement
  const urlParams = {
    gender: searchParams.get("gender") || "",
    age: searchParams.get("age") || "",
    tiredness: searchParams.get("tiredness") || "",
    lastMinute: searchParams.get("lastMinute") || "",
    distraction: searchParams.get("distraction") || "",
    worried: searchParams.get("worried") || "",
    moodSwings: searchParams.get("moodSwings") || "",
    harmony: searchParams.get("harmony") || "",
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      // Ajoute le nouveau paramètre et navigue vers l'étape suivante
      const nextParams = new URLSearchParams({
        ...urlParams,
        emotions: option,
      })
      router.push(`/quiz/step-11?${nextParams.toString()}`)
    }, 500)
  }

  const options = [
    { value: "strongly-disagree", icon: ThumbsDown, label: "Pas du tout d'accord", iconModifier: XCircle },
    { value: "disagree", icon: ThumbsDown, label: "" },
    { value: "neutral", icon: HelpCircle, label: "" },
    { value: "agree", icon: ThumbsUp, label: "" },
    { value: "strongly-agree", icon: ThumbsUp, label: "Tout à fait d'accord", iconModifier: Sparkles },
  ]

  // Construit le lien de "retour" dynamiquement
  const backLinkHref = `/quiz/step-9?${new URLSearchParams(urlParams).toString()}`

  return (
    // 2. Utilisation de QuizLayout pour maintenir la cohérence du design
    <QuizLayout step={7} totalSteps={26}>
      
      {/* 3. En-tête standardisé, identique à celui des étapes précédentes */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={backLinkHref} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          {/* L'icône centrale standard peut être insérée ici si désiré */}
        </div>
        <span className="text-gray-600 text-sm font-medium">7/26</span> {/* Étape mise à jour */}
      </header>

      {/* 4. 'main' avec la structure et l'espacement standardisés */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        
        {/* Titre avec un style standardisé */}
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Il m'est difficile d'exprimer mes émotions
          </h1>
          <p className="text-gray-600">Êtes-vous d'accord avec l'affirmation suivante ?</p>
        </div>
        
        {/* 5. L'échelle d'évaluation unique de la page, maintenant dans le layout standard */}
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            {options.map((option) => {
              const Icon = option.icon
              const IconModifier = option.iconModifier
              const isSelected = selectedOption === option.value

              return (
                <div key={option.value} className="flex flex-col items-center gap-2 flex-1 text-center">
                  <button
                    onClick={() => handleOptionSelect(option.value)}
                    className={`flex items-center justify-center rounded-xl border-2 transition-all duration-200 w-14 h-14 sm:w-16 sm:h-16 relative ${
                      isSelected
                        ? "border-teal-500 bg-white scale-105"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                    />
                    {IconModifier && (
                      <IconModifier
                        className={`absolute ${
                          option.value === "strongly-disagree" ? "top-1 left-1" : "bottom-1 right-1"
                        } w-4 h-4 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                      />
                    )}
                  </button>
                  {option.label && (
                    <span className="text-xs sm:text-sm font-medium text-gray-600 min-h-[40px] flex items-center leading-tight">
                      {option.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step10() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center text-gray-500">Chargement...</div>
      }
    >
      <Step10Content />
    </Suspense>
  )
}
