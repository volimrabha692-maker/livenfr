"use client"

import { Suspense, useEffect, useState } from "react"
import { ArrowLeft, BatteryCharging, Calendar, Zap, Info } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"
import Image from "next/image"

function Step33Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()
  const [animatedLevel, setAnimatedLevel] = useState(0)

  // Récupère le genre pour l'image de profil
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || "18-24"

  const getProfileImage = (gender: string, age: string) => {
    let ageRangeSuffix = ""

    if (age === "18-24") {
      ageRangeSuffix = "18-24"
    } else if (age === "25-34") {
      ageRangeSuffix = "25-34"
    } else if (age === "35-44" || age === "45-54") {
      ageRangeSuffix = "35-54"
    } else if (age === "55-64") {
      ageRangeSuffix = "55-65"
    } else if (age === "65") {
      ageRangeSuffix = "65"
    }

    if (gender === "female") {
      return `/images/female-${ageRangeSuffix}-bad.avif`
    } else {
      return `/images/male-${ageRangeSuffix}-bad.avif`
    }
  }

  // Système de notation amélioré basé sur les réponses réelles du quiz
  const calculateWellbeingProfile = () => {
    let score = 0
    let mainDifficulty = "Faible énergie"
    let challengingPeriod = "Quelques mois"
    let trigger = "Raison personnelle"
    let energyLevel = "Moyen"

    // Collecter toutes les réponses des searchParams
    const allParams = Object.fromEntries(searchParams.entries())
    console.log("Toutes les réponses du quiz :", allParams) // Pour le débogage

    // Mapper les réponses indiquant des problèmes élevés
    const highStressIndicators = [
      "very-stressed", "extremely-stressed", "always-stressed", "severe-stress", "very-anxious",
      "extremely-anxious", "panic-attacks", "constant-worry", "very-tired", "exhausted", "no-energy",
      "chronic-fatigue", "very-sad", "depressed", "hopeless", "suicidal-thoughts", "never-sleep",
      "insomnia", "sleep-disorders", "nightmares", "very-angry", "rage", "irritable", "aggressive",
      "overwhelmed", "burnout", "breakdown", "crisis", "isolated", "lonely", "no-support",
      "relationship-problems", "financial-stress", "job-stress", "health-problems", "family-issues",
    ]

    // Mapper les réponses indiquant des problèmes moyens
    const mediumStressIndicators = [
      "stressed", "somewhat-stressed", "moderate-stress", "occasional-stress", "anxious", "worried",
      "nervous", "tense", "tired", "low-energy", "fatigue", "drained", "sad", "down", "moody",
      "emotional", "sleep-issues", "restless-sleep", "wake-up-tired", "irritated", "frustrated",
      "impatient", "pressure", "demanding", "challenging", "relationship-tension", "work-pressure",
      "some-support",
    ]

    // Mapper les réponses indiquant des problèmes faibles
    const lowStressIndicators = [
      "calm", "relaxed", "peaceful", "content", "happy", "positive", "optimistic", "good-mood",
      "energetic", "rested", "refreshed", "active", "good-sleep", "restful-sleep", "sleep-well",
      "patient", "understanding", "balanced", "manageable", "under-control", "stable",
      "good-relationships", "supportive", "connected",
    ]

    // Analyser chaque réponse
    Object.values(allParams).forEach((response) => {
      if (!response || response === "gender" || response === "age") return

      const responseStr = response.toString().toLowerCase()

      if (highStressIndicators.some((indicator) => responseStr.includes(indicator))) {
        score += 20
      } else if (mediumStressIndicators.some((indicator) => responseStr.includes(indicator))) {
        score += 12
      } else if (lowStressIndicators.some((indicator) => responseStr.includes(indicator))) {
        score += 3
      } else {
        score += 6
      }
    })

    // Ajuster le score en fonction du nombre de réponses pour éviter les biais
    const responseCount = Object.keys(allParams).length - 2 // Exclure gender et age
    if (responseCount > 0) {
      score = Math.round((score / responseCount) * 10) // Normaliser sur une échelle de 0 à 100
    }

    // Ajouter des facteurs spécifiques basés sur des combinaisons
    const hasAnxiety = Object.values(allParams).some((v) => v.toString().toLowerCase().includes("anxious") || v.toString().toLowerCase().includes("worry") || v.toString().toLowerCase().includes("panic"))
    const hasSleepIssues = Object.values(allParams).some((v) => v.toString().toLowerCase().includes("sleep") || v.toString().toLowerCase().includes("insomnia") || v.toString().toLowerCase().includes("tired"))
    const hasRelationshipIssues = Object.values(allParams).some((v) => v.toString().toLowerCase().includes("relationship") || v.toString().toLowerCase().includes("family") || v.toString().toLowerCase().includes("isolated"))
    const hasWorkStress = Object.values(allParams).some((v) => v.toString().toLowerCase().includes("work") || v.toString().toLowerCase().includes("job") || v.toString().toLowerCase().includes("career"))

    // Bonus de score pour les combinaisons problématiques
    if (hasAnxiety && hasSleepIssues) score += 15
    if (hasRelationshipIssues && hasAnxiety) score += 10
    if (hasWorkStress && hasSleepIssues) score += 12

    console.log("Score calculé :", score) // Pour le débogage

    // Déterminer le profil en fonction du score ajusté
    if (score >= 70) {
      mainDifficulty = hasAnxiety ? "Anxiété" : hasSleepIssues ? "Troubles du sommeil" : "Irritabilité"
      challengingPeriod = "Quelques semaines"
      trigger = hasRelationshipIssues ? "Famille ou relations" : hasWorkStress ? "Pression professionnelle" : "Raison personnelle"
      energyLevel = "Faible"
      return {
        level: "High",
        percentage: 85,
        score: score,
        mainDifficulty,
        challengingPeriod,
        trigger,
        energyLevel,
        message: "Cela signifie que vous pouvez ressentir une inquiétude accrue, un sentiment de pression, une baisse d'énergie et des perturbations de votre sommeil.",
      }
    } else if (score >= 35) {
      mainDifficulty = hasAnxiety && hasSleepIssues ? "Combiné" : hasAnxiety ? "Rumination mentale" : "Gestion du stress"
      challengingPeriod = hasWorkStress ? "Quelques mois" : "Quelques années"
      trigger = hasRelationshipIssues ? "Famille ou relations" : "Raison personnelle"
      energyLevel = hasSleepIssues ? "Faible" : "Moyen"
      return {
        level: "Medium",
        percentage: 60,
        score: score,
        mainDifficulty,
        challengingPeriod,
        trigger,
        energyLevel,
        message: "Cela signifie que vous pouvez occasionnellement vous sentir inquiet(e), ressentir une certaine pression, remarquer une légère baisse d'énergie et avoir de légères perturbations de votre sommeil.",
      }
    } else {
      mainDifficulty = "Rumination mentale"
      challengingPeriod = "Toute la vie"
      trigger = "Raison personnelle"
      energyLevel = "Moyen"
      return {
        level: "Normal",
        percentage: 35,
        score: score,
        mainDifficulty,
        challengingPeriod,
        trigger,
        energyLevel,
        message: "Cela signifie que vous pourriez rarement vous sentir un peu inquiet(e), rencontrer une légère pression, maintenir une énergie stable et profiter de habitudes de sommeil généralement constantes.",
      }
    }
  }

  const wellbeingProfile = calculateWellbeingProfile()
  const profileImage = getProfileImage(gender, age)

  // Animation du thermomètre
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(wellbeingProfile.percentage)
    }, 500)
    return () => clearTimeout(timer)
  }, [wellbeingProfile.percentage])

  const handleContinue = () => {
    router.push(`/quiz/step-34?${query}`)
  }

  const getLevelColors = (level: string) => {
    switch (level) {
      case "High": return { bg: "bg-red-50 border-red-200", text: "text-red-600", dot: "bg-red-500" }
      case "Medium": return { bg: "bg-orange-50 border-orange-200", text: "text-orange-600", dot: "bg-orange-500" }
      case "Normal": return { bg: "bg-green-50 border-green-200", text: "text-green-600", dot: "bg-green-500" }
      default: return { bg: "bg-blue-50 border-blue-200", text: "text-blue-600", dot: "bg-blue-500" }
    }
  }

  const levelTranslations: { [key: string]: string } = {
    High: "ÉLEVÉ",
    Medium: "MOYEN",
    Normal: "NORMAL",
  }
  
  const colors = getLevelColors(wellbeingProfile.level)

  return (
    <QuizLayout step={26} totalSteps={26}>
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={`/quiz/step-32?${query}`} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2"></div>
        <span className="text-gray-600 text-sm font-medium">26/26</span>
      </header>
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Résumé de votre profil de bien-être</h1>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Niveau des effets négatifs</h2>
          <div className="relative w-full h-48 mb-4">
            <Image
              src={profileImage || "/placeholder.svg"}
              alt="Personnage de profil"
              width={200}
              height={200}
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full object-contain"
              priority
            />

            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-200 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-blue-300"></div>
              <div className="flex-1 bg-green-400"></div>
              <div className="flex-1 bg-orange-400"></div>
              <div className="flex-1 bg-red-500"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-6 bg-transparent rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-800 bg-opacity-30 rounded-full transition-all duration-2000 ease-out"
                style={{ width: `${animatedLevel}%`, transitionDuration: "2000ms" }}
              ></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 px-2 mt-8">
              <span>Faible</span>
              <span>Normal</span>
              <span>Moyen</span>
              <span>Élevé</span>
            </div>

            <div
              className="absolute bottom-8 w-20 h-8 bg-gray-800 text-white text-xs font-medium rounded-md flex items-center justify-center transition-all duration-2000 ease-out"
              style={{ left: `${Math.max(10, Math.min(animatedLevel - 10, 80))}%`, transitionDuration: "2000ms" }}
            >
              Votre niveau
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>

            <div
              className={`absolute bottom-5 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-2000 ease-out ${colors.dot}`}
              style={{ left: `${Math.max(2, Math.min(animatedLevel - 2, 94))}%`, transitionDuration: "2000ms" }}
            ></div>
          </div>

          <div className={`flex items-start p-3 rounded-lg border ${colors.bg} text-sm`}>
            <Info className={`w-5 h-5 mr-3 ${colors.text}`} />
            <div>
              <p className={`font-semibold ${colors.text}`}>
                NIVEAU {levelTranslations[wellbeingProfile.level]} (Score: {wellbeingProfile.score})
              </p>
              <p className="text-gray-700">{wellbeingProfile.message}</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <BatteryCharging className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Difficulté principale</p>
            <p className="text-base font-semibold text-gray-900">{wellbeingProfile.mainDifficulty}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <Calendar className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Période difficile</p>
            <p className="text-base font-semibold text-gray-900">{wellbeingProfile.challengingPeriod}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <Zap className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Déclencheur</p>
            <p className="text-base font-semibold text-gray-900">{wellbeingProfile.trigger}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <BatteryCharging className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Niveau d'énergie</p>
            <p className="text-base font-semibold text-gray-900">{wellbeingProfile.energyLevel}</p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-8 rounded-full text-lg transition-colors"
        >
          Continuer
        </button>
      </main>
    </QuizLayout>
  )
}

export default function Step33() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Step33Content />
    </Suspense>
  )
}
