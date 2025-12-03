"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const Disclaimer = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Always open on mount, regardless of previous sessions
        setIsOpen(true);
    }, []);

    return (
        <>
            {/* Trigger Button (if closed) */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-40 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors backdrop-blur-md"
                title="Ver Aviso Legal"
            >
                <FileText className="w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 text-yellow-500">
                                    <AlertTriangle className="w-6 h-6" />
                                    <h2 className="text-xl font-bold text-white">Aviso Importante</h2>
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Esta plataforma recopila información de <strong>dominio público</strong>.
                                    No somos propietarios de los datos mostrados.
                                </p>

                                <div className="pt-2">
                                    <Link
                                        href="/legal"
                                        className="group flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                                    >
                                        <div className="text-left">
                                            <p className="text-white font-medium text-sm">¿Cómo eliminar mis datos?</p>
                                            <p className="text-gray-400 text-xs">Ver fuente original y guía de baja</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                    </Link>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 text-sm"
                                >
                                    Entendido
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
