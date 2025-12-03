"use client";

import { useState, useEffect } from "react";
import { SearchInput } from "@/components/SearchInput";
import { ResultCard } from "@/components/ResultCard";
import { DetailModal } from "@/components/DetailModal";
import { Disclaimer } from "@/components/Disclaimer";
import { searchInfieles, getLastUpdated } from "@/lib/data";
import { Infiel } from "@/types";
import { motion } from "framer-motion";
import { ShieldAlert, Clock } from "lucide-react";


export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Infiel[]>([]);
  const [selectedInfiel, setSelectedInfiel] = useState<Infiel | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(getLastUpdated());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        const searchResults = searchInfieles(query);
        setResults(searchResults);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center space-y-8 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium text-sm mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>Base de Datos de Infieles</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 tracking-tight">
            Descubre la Verdad
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Busca en nuestra base de datos recopilada. Encuentra coincidencias por nombre y conoce los detalles.
          </p>

          {lastUpdated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2"
            >
              <Clock className="w-3 h-3" />
              <span>Actualizado: {formatDate(lastUpdated)}</span>
            </motion.div>
          )}
        </motion.div>

        <SearchInput value={query} onChange={setQuery} />
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm font-medium pl-2"
          >
            {results.length} resultados encontrados para "{query}"
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((infiel, index) => (
            <ResultCard
              key={infiel.id}
              infiel={infiel}
              index={index}
              onClick={() => setSelectedInfiel(infiel)}
            />
          ))}
        </div>

        {query && results.length === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No se encontraron resultados.</p>
          </motion.div>
        )}
      </div>

      <DetailModal
        infiel={selectedInfiel}
        onClose={() => setSelectedInfiel(null)}
      />

      <Disclaimer />

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-600 text-sm pb-8">
        <p>© 2025 Infiel Search. Datos recopilados públicamente. <span className="opacity-50">userDK</span></p>
      </footer>
    </main>
  );
}
