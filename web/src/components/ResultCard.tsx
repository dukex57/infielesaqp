"use client";

import { Infiel } from "@/types";
import { motion } from "framer-motion";
import { User, MapPin, Briefcase } from "lucide-react";

interface ResultCardProps {
    infiel: Infiel;
    onClick: () => void;
    index: number;
}

export const ResultCard = ({ infiel, onClick, index }: ResultCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={onClick}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {infiel.name}
                    </h3>

                    <div className="flex flex-col space-y-1 text-sm text-gray-400">
                        {infiel.occupation && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                <span>{infiel.occupation}</span>
                            </div>
                        )}
                        {infiel.nationality && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{infiel.nationality}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {infiel.name.charAt(0).toUpperCase()}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-sm text-gray-300 line-clamp-2 italic">
                    "{infiel.reason || "Sin motivo especificado"}"
                </p>
            </div>
        </motion.div>
    );
};
