"use client";

import { Infiel } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Briefcase, MapPin, Globe, MessageSquare, AlertTriangle } from "lucide-react";

interface DetailModalProps {
    infiel: Infiel | null;
    onClose: () => void;
}

export const DetailModal = ({ infiel, onClose }: DetailModalProps) => {
    if (!infiel) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="relative h-32 bg-gradient-to-r from-purple-900 to-indigo-900">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="absolute -bottom-10 left-8">
                            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl border-4 border-[#0f1115]">
                                {infiel.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-14 px-8 pb-8 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white">{infiel.name}</h2>
                            <div className="flex flex-wrap gap-3 mt-3">
                                {infiel.age && (
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                                        <User className="w-3 h-3" /> {infiel.age} años
                                    </span>
                                )}
                                {infiel.nationality && (
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> {infiel.nationality}
                                    </span>
                                )}
                                {infiel.occupation && (
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                                        <Briefcase className="w-3 h-3" /> {infiel.occupation}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Reason Section */}
                            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
                                <h3 className="text-red-400 font-semibold flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-5 h-5" />
                                    Motivo
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {infiel.reason || "No especificado"}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {infiel.socials && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <h4 className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
                                            <Globe className="w-4 h-4" /> Redes Sociales
                                        </h4>
                                        <p className="text-white">{infiel.socials}</p>
                                    </div>
                                )}
                                {infiel.timestamp && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <h4 className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> Fecha de reporte
                                        </h4>
                                        <p className="text-white">{infiel.timestamp}</p>
                                    </div>
                                )}
                            </div>

                            {/* Comment Section */}
                            {infiel.comment && (
                                <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-5">
                                    <h3 className="text-purple-400 font-semibold flex items-center gap-2 mb-3">
                                        <MessageSquare className="w-5 h-5" />
                                        Comentario Adicional
                                    </h3>
                                    <p className="text-gray-300 italic">
                                        "{infiel.comment}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
