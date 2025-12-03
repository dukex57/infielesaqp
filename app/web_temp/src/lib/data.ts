import { Infiel, ScrapedData } from "@/types";
import rawData from "@/data/scraped_data.json";

const typedData = rawData as unknown as ScrapedData;

export const getInfieles = (): Infiel[] => {
    // Handle both old (array) and new (object with data) formats for backward compatibility during transition
    const data = Array.isArray(rawData) ? rawData : typedData.data;

    return data
        .filter((item) => item["NOMBRE Y APELLIDO DEL INFIEL"]) // Filter out empty names
        .map((item, index) => ({
            id: index.toString(),
            timestamp: item["Marca temporal"],
            name: item["NOMBRE Y APELLIDO DEL INFIEL"] || "Desconocido",
            occupation: item["OCUPACION DEL INFIEL"],
            age: item["EDAD DEL INFIEL"],
            nationality: item["NACIONALIDAD"],
            socials: item["REDES DEL INFIEL (IG,FB TKTK, ETC)"],
            reason: item["MOTIVOOOOOOOO, DESAHOGATE"],
            comment: item["COMENTARIO DE JUSTICIERAS AQP"],
        }));
};

export const getLastUpdated = (): string | null => {
    if (Array.isArray(rawData)) return null;
    return typedData.metadata?.lastUpdated || null;
};


export const searchInfieles = (query: string): Infiel[] => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    const allInfieles = getInfieles();

    return allInfieles.filter((infiel) =>
        infiel.name.toLowerCase().includes(lowerQuery)
    );
};
