"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Check, CircleOff, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"

function Step17Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  // Récupère les paramètres de l'URL
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || ""
  const tiredness = searchParams.get("tiredness") || ""
  const lastMinute = searchParams.get("lastMinute") || ""
  const distraction = searchParams.get("distraction") || ""
  const worried = searchParams.get("worried") || ""
  const moodSwings = searchParams.get("moodSwings") || ""
  const harmony = searchParams.get("harmony") || ""
  const emotions = searchParams.get("emotions") || ""
  const overwhelmed = searchParams.get("overwhelmed") || ""
  const decision = searchParams.get("decision") || ""
  const ambitions = searchParams.get("ambitions") || ""
  const compliments = searchParams.get("compliments") || ""
  const insecure = searchParams.get("insecure") || ""
  const overthinkPartner = searchParams.get("overthinkPartner") || ""

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      router.push(
        `/quiz/step-18?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}&emotions=${emotions}&overwhelmed=${overwhelmed}&decision=${decision}&ambitions=${ambitions}&compliments=${compliments}&insecure=${insecure}&overthinkPartner=${overthinkPartner}&prioritizeOthers=${option}`,
      )
    }, 300)
  }

  const options = [
    { text: "Souvent", icon: Check },
    { text: "Parfois", icon: HelpCircle },
    { text: "Jamais", icon: CircleOff },
  ]

  return (
    // Utiliser QuizLayout pour la barre de progression, maintenant à l'étape 14/26
    <QuizLayout step={14} totalSteps={26}>
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link
          href={`/quiz/step-16?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}&emotions=${emotions}&overwhelmed=${overwhelmed}&decision=${decision}&ambitions=${ambitions}&compliments=${compliments}&insecure=${insecure}&overthinkPartner=${overthinkPartner}`}
          className="p-2"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">{/* L'icône centrale peut être ajoutée ici si nécessaire */}</div>
        <span className="text-gray-600 text-sm font-medium">14/26</span>
      </header>
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Donnez-vous souvent la priorité aux besoins des autres
            <br />
            et sacrifiez-vous les vôtres ?
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

export default function Step17() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Step17Content />
    </Suspense>
  )
}
