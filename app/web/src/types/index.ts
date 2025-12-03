export interface InfielRaw {
    "Marca temporal": string | null;
    "NOMBRE Y APELLIDO DEL INFIEL": string | null;
    "OCUPACION DEL INFIEL": string | null;
    "EDAD DEL INFIEL": string | null;
    "NACIONALIDAD": string | null;
    "REDES DEL INFIEL (IG,FB TKTK, ETC)": string | null;
    "MOTIVOOOOOOOO, DESAHOGATE": string | null;
    "ESCRIBE LA PALABRA AQP PARA CONTINUAR": string | null;
    "COMENTARIO DE JUSTICIERAS AQP": string | null;
}

export interface ScrapedData {
    metadata: {
        lastUpdated: string;
    };
    data: InfielRaw[];
}


export interface Infiel {
    id: string;
    timestamp: string | null;
    name: string;
    occupation: string | null;
    age: string | null;
    nationality: string | null;
    socials: string | null;
    reason: string | null;
    comment: string | null;
}
