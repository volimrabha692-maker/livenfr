"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button" // En supposant que vous avez ces composants
import { Input } from "@/components/ui/input"   // En supposant que vous avez ces composants
import { Lock } from "lucide-react"
import { submitEmail } from "./actions" // Importer l'action serveur

export default function Step36() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation de base côté client
    if (!email) {
      setError("Veuillez entrer votre email")
      return
    }
    if (!email.includes("@")) {
      setError("Veuillez entrer un email valide")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // Collecter toutes les données du quiz des paramètres de l'URL dans un objet simple
      const quizData = {
        email,
        ...Object.fromEntries(searchParams.entries()),
      }

      // Appeler l'action serveur avec les données du quiz
      const result = await submitEmail(quizData)

      if (result.success) {
        // En cas de succès, rediriger vers l'étape suivante
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.set("email", email)
        window.location.href = `/quiz/step-37?${currentParams.toString()}`
      } else {
        // Afficher une erreur générique du serveur
        setError(result.message || "Une erreur s'est produite. Veuillez réessayer.")
      }
    } catch (error) {
      // Gérer les erreurs inattendues lors de l'appel de l'action
      setError("Une erreur s'est produite. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Entrez votre email pour</h1>
          <h2 className="text-2xl font-semibold text-gray-900">recevoir votre programme personnel de</h2>
          <h3 className="text-2xl font-semibold text-green-600">Gestion du Bien-être !</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Entrez votre email pour recevoir votre programme"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex items-start space-x-3 text-sm text-gray-600">
            <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Vos données
              seront traitées conformément à notre Politique de confidentialité.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Envoi en cours..." : "Continuer"}
          </Button>
        </form>
      </div>
    </div>
  )
}
