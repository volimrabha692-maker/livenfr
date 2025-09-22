"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, XCircle, Info, ChevronRight, Clock } from "lucide-react"
import Image from "next/image"

// --- Icônes SVG ---
const LivenLogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="black" />
    <path d="M12.875 22V10H15.125V22H12.875ZM17.125 22V10H19.375V22H17.125Z" fill="white" />
  </svg>
)

const GuaranteeSeal = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 64C32 64 64 54 64 32V10L32 0L0 10V32C0 54 32 64 32 64Z" fill="#2DD4BF" />
    <path d="M22 32.5L28.5 39L44 23.5" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)


// --- Composants Auxiliaires ---

// Composant de compte à rebours, spécifique à l'Étape 40
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes en secondes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex items-center justify-center space-x-2 text-red-600 font-bold">
      <Clock className="w-5 h-5" />
      <span className="text-lg">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}

// Composants visuels standardisés, importés de l'Étape 39
const StatBar = ({ label, value, level, isGood = false }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1 sm:mb-2 text-xs sm:text-sm">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="font-medium text-gray-500">{level}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${isGood ? "bg-teal-500" : "bg-gray-400"}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
)

const BeforeAfterComparison = ({ gender, age }) => {
  const getProfileImage = (gender, age, state) => {
    let ageRangeSuffix = ""
    if (age === "18-24") ageRangeSuffix = "18-24"
    else if (age === "25-34") ageRangeSuffix = "25-34"
    else if (age === "35-44" || age === "45-54") ageRangeSuffix = "35-54"
    else if (age === "55-64") ageRangeSuffix = "55-65"
    else if (age === "65") ageRangeSuffix = "65"
    else ageRangeSuffix = "25-34" // fallback

    const suffix = state === "bad" ? "bad" : "good"
    return `/images/${gender}-${ageRangeSuffix}-${suffix}.avif`
  }

  const badImage = getProfileImage(gender, age, "bad")
  const goodImage = getProfileImage(gender, age, "good")

  return (
    <div className="relative max-w-4xl mx-auto mb-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-8 relative">
        <Card className="p-3 sm:p-4 md:p-6 bg-white shadow-lg flex flex-col">
          <div className="text-center mb-4 sm:mb-8 md:mb-12 flex-grow">
            <Badge variant="outline" className="mb-2 sm:mb-4 bg-gray-100 text-gray-600 border-gray-300 text-xs sm:text-sm">
              Maintenant
            </Badge>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mx-auto">
              <Image
                src={badImage || "/placeholder.svg"}
                alt="Personne avant Liven"
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 192px"
                className="rounded-lg object-contain"
              />
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <StatBar label="Niveau d'énergie" value={25} level="Faible" isGood={false} />
            <StatBar label="Niveau de bien-être" value={30} level="Faible" isGood={false} />
            <StatBar label="Niveau d'estime de soi" value={20} level="Faible" isGood={false} />
          </div>
        </Card>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
          <div className="bg-white rounded-full p-3 shadow-lg border-2 border-gray-200">
            <ChevronRight className="w-6 h-6 text-teal-500" />
          </div>
        </div>

        <Card className="p-3 sm:p-4 md:p-6 bg-white shadow-lg border-2 border-teal-200 flex flex-col">
          <div className="text-center mb-4 sm:mb-8 md:mb-12 flex-grow">
            <Badge className="mb-2 sm:mb-4 bg-teal-500 text-white text-xs sm:text-sm">Votre Objectif</Badge>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mx-auto">
              <Image
                src={goodImage || "/placeholder.svg"}
                alt="Personne après Liven"
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 192px"
                className="rounded-lg object-contain"
              />
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <StatBar label="Niveau d'énergie" value={90} level="Élevé" isGood={true} />
            <StatBar label="Niveau de bien-être" value={95} level="Fort" isGood={true} />
            <StatBar label="Niveau d'estime de soi" value={85} level="Élevée" isGood={true} />
          </div>
        </Card>
      </div>
    </div>
  )
}

const PricingOption = ({
  id,
  label,
  price,
  originalPrice,
  perDay,
  isPopular,
  selectedPlan,
  setSelectedPlan,
  discount,
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className={`block rounded-xl border-2 p-5 cursor-pointer transition-all ${
        selectedPlan === id ? "border-teal-500 bg-white" : "border-gray-200 bg-white"
      }`}
    >
      <input
        type="radio"
        name="pricing-plan"
        id={id}
        className="hidden"
        checked={selectedPlan === id}
        onChange={() => setSelectedPlan(id)}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedPlan === id ? "border-teal-500 bg-teal-500" : "border-gray-300"
            }`}
          >
            {selectedPlan === id && <Check className="w-4 h-4 text-white" />}
          </div>
          <div>
            <span className="font-semibold text-gray-800">{label}</span>
            <div className="flex items-center space-x-2">
              {originalPrice && <span className="text-sm text-gray-400 line-through">{originalPrice}€</span>}
              <span className="text-sm text-teal-600 font-bold">{price}€</span>
              {discount && <Badge className="bg-red-500 text-white text-xs px-2 py-1">{discount}% DE RÉDUC.</Badge>}
            </div>
          </div>
        </div>
        <div className="text-right bg-gray-100 px-3 py-1 rounded-md">
          <div className="font-bold text-lg text-gray-800">
            €<span className="text-2xl">{perDay.split(".")[0]}</span>
            <sup className="text-lg font-bold">,{perDay.split(".")[1]}</sup>
          </div>
          <span className="text-xs text-gray-500 font-medium -mt-1 block">par jour</span>
        </div>
      </div>
    </label>
    {isPopular && (
      <div className="absolute -top-3 left-0 w-full flex justify-center">
        <Badge className="bg-teal-500 text-white uppercase text-xs font-bold tracking-wider px-3 py-1">
          <Star className="w-3 h-3 mr-1.5 fill-white text-white" />
          LE PLUS POPULAIRE
        </Badge>
      </div>
    )}
  </div>
)

// --- Composant de la Page Principale ---
export default function Step40() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "madson"
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || "25-34"
  const [selectedPlan, setSelectedPlan] = useState("plan-2")

  const checkoutUrls = {
    "plan-1": "https://pay.hotmart.com/M101988747B?off=8z4wz726&checkoutMode=6",
    "plan-2": "https://pay.hotmart.com/M101988747B?off=pzu4g8e4&checkoutMode=6",
    "plan-3": "https://pay.hotmart.com/M101988747B?off=oiudiawi&checkoutMode=6",
  }

  const handleGetMyPlan = () => {
    const checkoutUrl = checkoutUrls[selectedPlan]
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank")
    }
  }

  const goals = [
    "Vous vous réveillez plein(e) d'énergie",
    "Vous ne vous sentez plus dépassé(e) ou inquiet(e)",
    "Vous n'êtes plus bloqué(e) par la rumination mentale",
    "Vous améliorez votre bien-être émotionnel global",
    "Augmentez votre niveau d'énergie et atteignez vos objectifs",
    "Votre confiance en vous est à son plus haut niveau",
  ]

  const testimonials = [
    {
      name: "Pierre Dubois",
      text: "Cela a vraiment changé ma vie... J'utilise cette application depuis six mois maintenant. Pendant ce temps, j'ai pu me débarrasser de l'habitude de tout remettre à la dernière minute. L'application m'a aidé à m'améliorer et à commencer à atteindre mes objectifs. Cela a vraiment changé ma vie pour le mieux.",
    },
    {
      name: "Marie Lefèvre",
      text: "Liven est un excellent outil d'auto-assistance... Liven m'aide à comprendre pourquoi je procrastine sur des tâches et comment m'en libérer. Liven fait un excellent travail à cet égard. Je suis très reconnaissant pour un outil comme Liven.",
    },
    {
      name: "Jean Martin",
      text: "Des informations révélatrices... Je suis nouveau sur cette application. Je ne suis pas nouveau face à mes propres problèmes. À mon âge, ayant maintenant 62 ans, après des années à avoir eu besoin d'aide. Si peu d'argent pour des informations révélatrices concernant mon moi intérieur et mes motivations.",
    },
  ]

  const pricingPlans = [
    {
      id: "plan-1",
      label: "PLAN 7 JOURS",
      price: "7.00",
      originalPrice: "14.00",
      perDay: "1.00",
      isPopular: false,
      discount: 50,
    },
    {
      id: "plan-2",
      label: "PLAN 1 MOIS",
      price: "23.00",
      originalPrice: "46.00",
      perDay: "0.76",
      isPopular: true,
      discount: 50,
    },
    {
      id: "plan-3",
      label: "PLAN 3 MOIS",
      price: "47.00",
      originalPrice: "94.00",
      perDay: "0.50",
      isPopular: false,
      discount: 50,
    },
  ]

  const renderPricing = () => (
    <div className="space-y-4">
      {pricingPlans.map((plan) => (
        <PricingOption key={plan.id} {...plan} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      ))}
    </div>
  )

  return (
    <div className="bg-[#F9F9F7] font-sans text-gray-800">
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.7);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(45, 212, 191, 0);
          }
        }
        .pulse-button {
          animation: pulse-glow 2s infinite;
        }
        .pulse-button:hover {
          animation-play-state: paused;
          transform: scale(1.05);
        }
      `}</style>

      <header className="py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LivenLogoIcon />
            <span className="font-extrabold text-2xl tracking-tighter">Liven</span>
          </div>
          <Button
            onClick={handleGetMyPlan}
            className="bg-teal-500 hover:bg-teal-600 rounded-full px-8 py-3 font-semibold text-white pulse-button"
          >
            OBTENIR MON PROGRAMME
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Badge className="bg-red-500 text-white px-3 py-1">RÉDUCTION SPÉCIALE</Badge>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              La réduction est réservée à : <span className="text-red-600">{name}</span>
            </h2>
            <p className="text-gray-600 mb-4">Cette réduction exclusive de 40% expire dans :</p>
            <CountdownTimer />
            <p className="text-sm text-gray-500 mt-2">
              Ne manquez pas cette opportunité unique de transformer votre bien-être !
            </p>
          </div>
        </Card>

        <BeforeAfterComparison gender={gender} age={age} />

        <div className="text-center mt-8 mb-8">
          <h1 className="text-3xl font-bold mb-3">{name}, votre programme personnalisé est prêt !</h1>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Image src="/images/brain.png" alt="Icône de cerveau" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Difficulté principale :</p>
                <p className="font-semibold text-gray-800 leading-tight">Faible énergie</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Image src="/images/target.png" alt="Icône de cible" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Objectif :</p>
                <p className="font-semibold text-gray-800 leading-tight">État de calme</p>
              </div>
            </div>
          </div>
        </div>

        {renderPricing()}

        <Button
          onClick={handleGetMyPlan}
          className="w-full bg-teal-500 hover:bg-teal-600 rounded-full py-4 text-lg font-bold text-white mt-6 pulse-button"
        >
          OBTENIR MON PROGRAMME
        </Button>
        <p className="text-[11px] text-gray-500 text-center mt-3">
          En cliquant sur "Obtenir Mon Programme", vous acceptez notre renouvellement automatique d'abonnement. Le prix réduit s'applique uniquement au premier paiement. Vous pouvez annuler via l'application ou par e-mail : support@theliven.com. Consultez la{" "}
          <a href="#" className="underline">
            Politique d'Abonnement
          </a>{" "}
          pour plus de détails.
        </p>
        <div className="flex flex-col items-center justify-center space-y-3 mt-4 py-4 border-y border-gray-200">
          <div className="flex items-center space-x-2 bg-teal-100/60 text-teal-700 font-semibold text-sm rounded-full px-4 py-1.5">
            <Check className="w-4 h-4 text-teal-600" />
            <span>Paiement Sûr et Sécurisé</span>
          </div>
          <Image src="/images/payment-methods.png" alt="Méthodes de paiement" width={280} height={40} />
        </div>

        <Card className="my-12 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Nos objectifs</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {goals.map((goal, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Check className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full p-1 flex-shrink-0" />
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </Card>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Des personnes comme vous ont obtenu d'excellents résultats avec notre Programme de Gestion du Bien-être !
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center my-12">
          <div>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2DD4BF" strokeWidth="3" strokeDasharray="83, 100" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-teal-500">83%</div>
            </div>
            <p className="text-sm text-gray-600 mt-3">des utilisateurs ont pu améliorer leur bien-être après seulement 6 semaines</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-teal-500">77%</p>
            <p className="text-sm text-gray-600 mt-1">des utilisateurs ont commencé avec des niveaux d'énergie similaires aux vôtres</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-teal-500">45%</p>
            <p className="text-sm text-gray-600 mt-1">des utilisateurs souffrent des mêmes problèmes que vous</p>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-2xl font-bold text-center mb-6">Les utilisateurs adorent nos programmes</h2>
          <p className="text-center text-gray-600 mb-8">Voici ce que les gens disent de Liven</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6 flex flex-col">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{t.text}</p>
                <p className="font-bold text-sm">{t.name}</p>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16 mb-8">
          <h1 className="text-3xl font-bold mb-3">{name}, votre programme personnalisé est prêt !</h1>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Image src="/images/brain.png" alt="Icône de cerveau" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Difficulté principale :</p>
                <p className="font-semibold text-gray-800 leading-tight">Faible énergie</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Image src="/images/target.png" alt="Icône de cible" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Objectif :</p>
                <p className="font-semibold text-gray-800 leading-tight">État de calme</p>
              </div>
            </div>
          </div>
        </div>

        {renderPricing()}

        <Button
          onClick={handleGetMyPlan}
          className="w-full bg-teal-500 hover:bg-teal-600 rounded-full py-4 text-lg font-bold text-white mt-6 pulse-button"
        >
          OBTENIR MON PROGRAMME
        </Button>
        <p className="text-[11px] text-gray-500 text-center mt-3">
          En cliquant sur "Obtenir Mon Programme", vous acceptez notre renouvellement automatique d'abonnement. Le prix réduit s'applique uniquement au premier paiement. Vous pouvez annuler via l'application ou par e-mail : support@theliven.com. Consultez la{" "}
          <a href="#" className="underline">
            Politique d'Abonnement
          </a>{" "}
          pour plus de détails.
        </p>
        <div className="flex flex-col items-center justify-center space-y-3 mt-4 py-4 border-y border-gray-200">
          <div className="flex items-center space-x-2 bg-teal-100/60 text-teal-700 font-semibold text-sm rounded-full px-4 py-1.5">
            <Check className="w-4 h-4 text-teal-600" />
            <span>Paiement Sûr et Sécurisé</span>
          </div>
          <Image src="/images/payment-methods.png" alt="Méthodes de paiement" width={280} height={40} />
        </div>

        <div className="relative mt-16 mb-8">
          <Card className="p-8 text-center border-2 border-teal-500 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">Garantie de remboursement de 30 jours</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Notre programme est soutenu par une garantie de remboursement. Nous croyons que notre programme fonctionnera pour vous, c'est pourquoi nous garantissons un remboursement complet dans les 30 jours suivant l'achat si vous ne constatez pas de résultats visibles dans votre capacité à réduire les effets négatifs malgré le suivi de votre programme comme indiqué. Pour en savoir plus sur les limitations applicables, consultez notre{" "}
              <a href="#" className="underline font-semibold text-teal-600">
                politique de remboursement
              </a>
              .
            </p>
          </Card>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <GuaranteeSeal />
          </div>
        </div>
      </main>

      <footer className="text-center py-12">
        <p className="text-xs text-gray-400">Chesmint Limited, Lekorpouzier 12a, Limassol, 3075, Chypre</p>
      </footer>
    </div>
  )
}
