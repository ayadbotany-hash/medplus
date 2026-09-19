"use client"

import { useState, useEffect } from "react"

export default function RxNormSearch({
  onSelectDrug,
  placeholder = "ابحث بالاسم العلمي (Levetiracetam, Meropenem, Pregabalin)..."
}: {
  onSelectDrug?: (drugName: string) => void
  placeholder?: string
}) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [dataset, setDataset] = useState<string[]>([])

  // جلب البيانات من ملف public/generics.json
  useEffect(() => {
    async function loadGenerics() {
      try {
        const res = await fetch("/generics.json")
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data)) {
            setDataset(data)
          }
        }
      } catch (err) {
        console.error("Failed to fetch generics dataset:", err)
      }
    }
    loadGenerics()
  }, [])

  // التصفية الفورية
  useEffect(() => {
    if (query.trim().length >= 2) {
      const cleanQuery = query.trim().toLowerCase()
      const matches = dataset.filter((drug) =>
        drug.toLowerCase().includes(cleanQuery)
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }, [query, dataset])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        dir="auto"
      />
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
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm border-b last:border-none text-left"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
