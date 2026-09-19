import RxNormSearch from "../components/rxnorm-search"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-lg space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          نظام البحث عن الأدوية والمواد العلمية
        </h1>
        <p className="text-sm text-gray-600">
          ابحث بالاسم العلمي الصافي للأدوية والحقن (Meropenem, Levetiracetam...)
        </p>
        <RxNormSearch />
      </div>
    </main>
  )
}
