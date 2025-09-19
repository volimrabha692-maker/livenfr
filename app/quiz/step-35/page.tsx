"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

// Composant Pop-up
const PopupModal = ({ isOpen, question, onAnswer, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arrière-plan avec flou */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Fenêtre modale */}
      <div className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Pour continuer, veuillez préciser</p>
          <h3 className="text-xl font-bold text-gray-900 mb-8 leading-tight">{question}</h3>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onAnswer("no")}
              variant="outline"
              className="px-8 py-3 rounded-full bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 font-medium min-w-[100px]"
            >
              Non
            </Button>
            <Button
              onClick={() => onAnswer("yes")}
              variant="outline"
              className="px-8 py-3 rounded-full bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 font-medium min-w-[100px]"
            >
              Oui
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Step35() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // États pour les barres de progression
  const [goalsProgress, setGoalsProgress] = useState(0)
  const [growthProgress, setGrowthProgress] = useState(0)
  const [contentProgress, setContentProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0) // 0: objectifs, 1: croissance, 2: contenu

  // États pour les pop-ups
  const [showPopup, setShowPopup] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [popupAnswered, setPopupAnswered] = useState({
    goals: false,
    growth: false,
    content: false,
  })

  // Questions des pop-ups
  const questions = {
    goals: "Avez-vous tendance à finir ce que vous commencez ?",
    growth: "Connaissez-vous la tenue d'un journal pour l'auto-réflexion ?",
    content: "Voulez-vous apprendre à développer des habitudes solides ?",
  }

  // Charger l'état des pop-ups depuis sessionStorage
  useEffect(() => {
    const savedState = sessionStorage.getItem("popupAnswered")
    if (savedState) {
      setPopupAnswered(JSON.parse(savedState))
    }
  }, [])

  // Sauvegarder l'état des pop-ups dans sessionStorage
  const savePopupState = (newState) => {
    setPopupAnswered(newState)
    sessionStorage.setItem("popupAnswered", JSON.stringify(newState))
  }

  // Fonction pour afficher le pop-up
  const showPopupForStep = (step) => {
    const stepNames = ["goals", "growth", "content"]
    const stepName = stepNames[step]

    if (!popupAnswered[stepName]) {
      setCurrentQuestion(questions[stepName])
      setShowPopup(true)
      console.log(`Affichage du pop-up pour ${stepName}: ${questions[stepName]}`)
    }
  }

  // Fonction pour gérer la réponse du pop-up
  const handlePopupAnswer = (answer) => {
    const stepNames = ["goals", "growth", "content"]
    const stepName = stepNames[currentStep]

    console.log(`L'utilisateur a répondu "${answer}" pour ${stepName}`)

    const newState = {
      ...popupAnswered,
      [stepName]: true,
    }
    savePopupState(newState)
    setShowPopup(false)
  }

  // Effet pour contrôler la progression des barres
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep === 0) {
        // Chargement des Objectifs
        setGoalsProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)

          // Afficher le pop-up à 50%
          if (newProgress === 50) {
            showPopupForStep(0)
          }

          // Quand Objectifs atteint 100%, commencer Domaines de croissance
          if (newProgress === 100) {
            setTimeout(() => setCurrentStep(1), 500)
          }

          return newProgress
        })
      } else if (currentStep === 1) {
        // Chargement des Domaines de croissance
        setGrowthProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)

          // Afficher le pop-up à 50%
          if (newProgress === 50) {
            showPopupForStep(1)
          }

          // Quand Domaines de croissance atteint 100%, commencer Contenu
          if (newProgress === 100) {
            setTimeout(() => setCurrentStep(2), 500)
          }

          return newProgress
        })
      } else if (currentStep === 2) {
        // Chargement du Contenu
        setContentProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)

          // Afficher le pop-up à 50%
          if (newProgress === 50) {
            showPopupForStep(2)
          }

          // Quand Contenu atteint 100%, rediriger
          if (newProgress === 100) {
            setTimeout(() => {
              const params = new URLSearchParams(searchParams.toString())
              router.push(`/quiz/step-36?${params.toString()}`)
            }, 1000)
          }

          return newProgress
        })
      }
    }, 50) // Mise à jour toutes les 50ms pour plus de fluidité

    return () => clearInterval(interval)
  }, [currentStep, router, searchParams, popupAnswered])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Création de votre programme personnalisé</h1>
            <p className="text-gray-600">
              Nous analysons vos réponses pour créer le parcours de bien-être idéal pour vous
            </p>
          </div>

          <div className="space-y-8">
            {/* Progression des Objectifs */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Objectifs</span>
                <span className="text-sm text-gray-500">{goalsProgress}%</span>
              </div>
              <Progress value={goalsProgress} className="h-3 bg-gray-200" />
            </div>

            {/* Progression des Domaines de croissance */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Domaines de croissance</span>
                <span className="text-sm text-gray-500">{growthProgress}%</span>
              </div>
              <Progress value={growthProgress} className="h-3 bg-gray-200" />
            </div>

            {/* Progression du Contenu */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Contenu</span>
                <span className="text-sm text-gray-500">{contentProgress}%</span>
              </div>
              <Progress value={contentProgress} className="h-3 bg-gray-200" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span>Analyse de votre profil bien-être...</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fenêtre modale Pop-up */}
      <PopupModal
        isOpen={showPopup}
        question={currentQuestion}
        onAnswer={handlePopupAnswer}
        onClose={() => setShowPopup(false)}
      />

      {/* CSS personnalisé pour les animations */}
      <style jsx>{`
        @keyframes zoom-in-95 {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .zoom-in-95 {
          animation-name: zoom-in-95;
        }
        
        .duration-300 {
          animation-duration: 300ms;
        }
      `}</style>
    </div>
  )
}
