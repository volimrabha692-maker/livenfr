import { Header } from "@/components/header"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    // 1. Nous utilisons flexbox sur la div principale pour contrôler la mise en page générale
    <div className="min-h-screen bg-[#f5f3f0] flex flex-col">
      <Header />

      {/* 2. Le 'main' grandit maintenant pour occuper l'espace disponible, poussant le pied de page vers le bas */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-6">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">

          {/* Nous avons réduit les marges et l'espacement sur les petits écrans */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              UN PROGRAMME DE GESTION
              <br />
              DU BIEN-ÊTRE PERSONNALISÉ
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 max-w-md mx-auto">
              AMÉLIOREZ VOTRE BIEN-ÊTRE AVEC NOTRE PROGRAMME PERSONNALISÉ
            </p>
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              QUIZ DE 3 MINUTES
            </p>
          </div>

          {/* --- DÉBUT DE LA MODIFICATION PRINCIPALE --- */}

          <div className="w-full flex flex-row justify-center items-center gap-4 sm:gap-8 mb-6">
            
            {/* CARTE MASCULINE - MAINTENANT ENTIÈREMENT ENGLOBÉE PAR LE LIEN */}
            <Link
              href="/quiz/step-2?gender=male"
              className="flex flex-col items-center group" // Ajout de 'group' pour les effets de survol, si désiré
            >
              {/* 3. Nous avons réduit la taille des cartes sur les écrans mobiles (w-32 h-44) */}
              <div className="w-32 h-44 sm:w-48 sm:h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-3 relative transition-transform group-hover:scale-105">
                <Image
                  src="/images/male.avif"
                  alt="Personnage masculin"
                  fill
                  sizes="(max-width: 640px) 128px, 192px" // Optimise le chargement de l'image
                  className="object-cover"
                />
              </div>
              <div
                className="w-32 sm:w-48 bg-green-600 group-hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between transition-colors text-sm sm:text-base"
              >
                <span>Homme</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>

            {/* CARTE FÉMININE - MAINTENANT ENTIÈREMENT ENGLOBÉE PAR LE LIEN */}
            <Link
              href="/quiz/step-2?gender=female"
              className="flex flex-col items-center group"
            >
              <div className="w-32 h-44 sm:w-48 sm:h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-3 relative transition-transform group-hover:scale-105">
                <Image
                  src="/images/female.avif"
                  alt="Personnage féminin"
                  fill
                  sizes="(max-width: 640px) 128px, 192px"
                  className="object-cover"
                />
              </div>
              <div
                className="w-32 sm:w-48 bg-green-600 group-hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between transition-colors text-sm sm:text-base"
              >
                <span>Femme</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>

          </div>

          {/* --- FIN DE LA MODIFICATION PRINCIPALE --- */}

          <div className="text-center text-xs text-gray-500 max-w-lg">
            <p>
              En cliquant sur « Homme » ou « Femme », vous acceptez les{" "}
              <Link href="/terms" className="text-blue-600 underline">
                Conditions d'Utilisation et de Service
              </Link>
              , la{" "}
              <Link href="/privacy" className="text-blue-600 underline">
                Politique de Confidentialité
              </Link>
              , la{" "}
              <Link href="/subscription" className="text-blue-600 underline">
                Politique d'Abonnement
              </Link>{" "}
              et la{" "}
              <Link href="/cookie" className="text-blue-600 underline">
                Politique en matière de Cookies
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
