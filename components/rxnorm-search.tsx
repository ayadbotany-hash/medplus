"use client"

import { useState, useEffect } from "react"

interface RxNormSearchProps {
  onSelectDrug?: (drugName: string) => void
  placeholder?: string
}

export default function RxNormSearch({
  onSelectDrug,
  placeholder = "ابحث عن اسم الدواء (مثال: Amoxicillin)..."
}: RxNormSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true)
        try {
          // الطلب المباشر من سيرفر الـ proxy الداخلي
          const res = await fetch(`/api/rxnorm/drugs?term=${encodeURIComponent(query)}`)
          const data = await res.json()
          if (data.candidates && Array.isArray(data.candidates)) {
            setSuggestions(data.candidates)
          } else {
            setSuggestions([])
          }
        } catch (err) {
          console.error("Error fetching drug data:", err)
          setSuggestions([])
        } finally {
          setLoading(false)
        }
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && (
        <div className="absolute left-3 top-2.5 text-sm text-gray-400">
          جاري البحث...
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setQuery(item)
                setSuggestions([])
                if (onSelectDrug) onSelectDrug(item)
              }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm border-b last:border-none"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}