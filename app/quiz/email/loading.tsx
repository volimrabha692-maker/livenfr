export default function Loading() {
  return (
    <div className="bg-[#F9F9F7] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Chargement de votre programme personnalisé...</p>
      </div>
    </div>
  )
}
