"use client";

import { motion } from "framer-motion";
import { FileText, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
    return (
        <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-medium text-sm">
                        <ShieldAlert className="w-4 h-4" />
                        <span>Información Legal y Privacidad</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Fuente de Datos y Eliminación
                    </h1>
                </div>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">Origen de los Datos</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Esta plataforma funciona como un motor de búsqueda para información que ya es de <strong>dominio público</strong>.
                            Los datos mostrados son recopilados automáticamente de hojas de cálculo y formularios accesibles públicamente en internet.
                        </p>
                        <p className="text-gray-300 mt-4">
                            <strong>No somos propietarios, autores ni administradores</strong> de la información original.
                            Nos limitamos a facilitar la consulta de datos que ya existen en la red.
                        </p>

                        <div className="mt-6 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                            <p className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Fuente Original
                            </p>
                            <p className="text-sm text-gray-300 mb-2">
                                Puedes verificar la fuente original de los datos en el siguiente enlace:
                            </p>
                            <a
                                href="https://docs.google.com/spreadsheets/d/1UZMkvOUrPtdC9orY-_INrLy5rqbviiCvFadT7i06jnQ/edit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 underline font-medium"
                            >
                                Abrir Google Sheet Público
                            </a>
                        </div>
                    </section>

                    <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">Guía de Eliminación</h2>
                        <p className="text-gray-300 mb-4">
                            Para eliminar tu información permanentemente, debes solicitar la baja en la fuente original.
                            Al eliminar el registro del Google Sheet, nuestra base de datos dejará de mostrarlo automáticamente en la próxima sincronización.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">Pasos a seguir:</h3>
                            <ol className="list-decimal list-inside space-y-3 text-gray-300 ml-2">
                                <li>Ingresa al <a href="https://docs.google.com/spreadsheets/d/1UZMkvOUrPtdC9orY-_INrLy5rqbviiCvFadT7i06jnQ/edit" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google Sheet original</a>.</li>
                                <li>Busca si existe una pestaña de "Contacto", "Reglas" o un enlace a un formulario de eliminación proporcionado por los administradores del sheet.</li>
                                <li>Si no encuentras un canal oficial, intenta dejar un comentario en la celda correspondiente a tu nombre solicitando la eliminación por motivos de privacidad.</li>
                                <li>Una vez que los administradores del sheet eliminen la fila, el cambio se reflejará aquí automáticamente.</li>
                            </ol>
                        </div>
                    </section>
                </div>
            </motion.div>
        </main>
    );
}
