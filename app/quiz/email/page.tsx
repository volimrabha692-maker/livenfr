"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, XCircle, Info, ChevronRight, Clock } from "lucide-react"
import Image from "next/image"
import Countdown from "react-countdown"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

// --- Ícones SVG ---
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

// --- Componente de Contagem Regressiva ---
const CountdownTimer = () => {
  const renderer = ({ minutes, seconds }) => {
    return (
      <span className="text-lg">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    )
  }

  return (
    <div className="flex items-center justify-center space-x-2 text-red-600 font-bold">
      <Clock className="w-5 h-5" />
      <Countdown date={Date.now() + 600000} renderer={renderer} />
    </div>
  )
}

// --- Componente de Opção de Preço ---
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

// --- Componente de Página Principal ---
export default function Step40() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "madson"
  const [selectedPlan, setSelectedPlan] = useState("plan-2")
  const [promoCode, setPromoCode] = useState("")

  useEffect(() => {
    const date = new Date()
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    setPromoCode(`Promo_${month}${year}`)
  }, [])

  const checkoutUrls = {
    "plan-1": "https://pay.hotmart.com/D100838092L?off=wm2ocbeh&checkoutMode=6",
    "plan-2": "https://pay.hotmart.com/D100838092L?off=tkhn3sa2&checkoutMode=6",
    "plan-3": "https://pay.hotmart.com/D100838092L?off=mjpmb8c6&checkoutMode=6",
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
      name: "Brian Ross",
      text: "It has really changed my life... I have been using this app for six months now. During this time, I have been able to get rid of the habit of putting everything off until the last minute. The app has helped me to become better and start achieving my goals. It has really changed my life for the better.",
    },
    {
      name: "Selactive",
      text: "Liven is a great self-help tool... Liven helps me understand why I procrastinate on tasks and how to get free from that. Liven is doing a great job at it. I am very grateful for a tool like Liven.",
    },
    {
      name: "Patrick Naughton",
      text: "Eye-opening information... I am new to this app. I'm not new to my own issues. At my age and now being 62, with years of having needed help. Such little money for eye-opening information in regard to my inner self and drive.",
    },
  ]

  const pricingPlans = [
    {
      id: "plan-1",
      label: "PLAN 7 JOURS",
      price: "10,50",
      originalPrice: "49,99",
      perDay: "1,50",
      isPopular: false,
      discount: 79,
    },
    {
      id: "plan-2",
      label: "PLAN 1 MOIS",
      price: "17,20",
      originalPrice: "49,99",
      perDay: "0,57",
      isPopular: true,
      discount: 66,
    },
    {
      id: "plan-3",
      label: "PLAN 3 MOIS",
      price: "29,99",
      originalPrice: "99,99",
      perDay: "0,33",
      isPopular: false,
      discount: 70,
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

        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 mb-8">
          <p className="text-center font-semibold text-teal-800">Your promo code applied:</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Check className="w-6 h-6 text-teal-500 bg-white rounded-full p-1" />
            <span className="font-bold text-lg text-gray-800">{promoCode}</span>
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
              <CircularProgressbar
                value={83}
                text="83%"
                styles={buildStyles({
                  textColor: "#14B8A6",
                  pathColor: "#14B8A6",
                  trailColor: "#E6E6E6",
                })}
              />
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
