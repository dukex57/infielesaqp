import pandas as pd
import requests
import io
import re
import time
import json
import os
import shutil
from datetime import datetime, timezone

# ID del sheet
SHEET_ID = "1UZMkvOUrPtdC9orY-_INrLy5rqbviiCvFadT7i06jnQ"

# GIDs conocidos de las hojas (extraídos previamente)
KNOWN_GIDS = ["801553205", "913239647"]

def scrape_sheet_html(gid):
    """Scrapea una hoja específica usando HTML"""
    url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/htmlview/sheet?headers=true&gid={gid}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    try:
        time.sleep(2)  # Delay para evitar rate limiting
        response = requests.get(url, headers=headers, timeout=20)
        response.raise_for_status()
        
        dfs = pd.read_html(io.StringIO(response.text))
        
        if dfs and len(dfs) > 0:
            df = dfs[0]
            
            if len(df) > 0:
                # Buscar la fila con encabezados
                header_row = None
                for idx, row in df.iterrows():
                    row_str = ' '.join([str(x) for x in row.values if pd.notna(x)]).upper()
                    if any(word in row_str for word in ['MARCA', 'NOMBRE', 'APELLIDO', 'OCUPACION', 'EDAD', 'NACIONALIDAD']):
                        header_row = idx
                        break
                
                # Si no encontramos, buscar primera fila con varios valores
                if header_row is None:
                    for idx, row in df.iterrows():
                        if row.notna().sum() >= 3:
                            header_row = idx
                            break
                
                # Aplicar encabezados
                if header_row is not None:
                    new_columns = []
                    for col in df.iloc[header_row]:
                        col_name = str(col).strip() if pd.notna(col) else f"Columna_{len(new_columns)}"
                        if not col_name or col_name == 'nan':
                            col_name = f"Columna_{len(new_columns)}"
                        new_columns.append(col_name)
                    
                    df = df.iloc[header_row + 1:].copy()
                    df.columns = new_columns
                    df = df.reset_index(drop=True)
                
                # Limpiar columna de índice numérica
                cols_to_drop = []
                for col in df.columns:
                    try:
                        float(col)
                        cols_to_drop.append(col)
                    except (ValueError, TypeError):
                        pass
                
                df = df.drop(columns=cols_to_drop, errors='ignore')
                
                # Limpiar filas y columnas vacías
                df = df.dropna(how='all')
                df = df.dropna(axis=1, how='all')
                
                # Limpiar filas de instrucciones
                if len(df) > 0:
                    rows_to_drop = []
                    for idx, row in df.iterrows():
                        non_null_values = [str(x) for x in row.values if pd.notna(x)]
                        if len(non_null_values) == 1 and len(non_null_values[0]) > 100:
                            text = non_null_values[0].upper()
                            if any(word in text for word in ['NO SE ACEPTA', 'SOLO AREQUIPA', 'BORRAREMOS', 'SOLO ES PARA']):
                                rows_to_drop.append(idx)
                    
                    if rows_to_drop:
                        df = df.drop(index=rows_to_drop).reset_index(drop=True)
                
                return df
                
    except Exception as e:
        print(f"Error scrapeando GID {gid}: {e}")
    
    return None

def main():
    all_data = {}
    
    # Procesar cada GID conocido
    for gid in KNOWN_GIDS:
        df = scrape_sheet_html(gid)
        
        if df is not None and len(df) > 0:
            all_data[gid] = df
    
    # Guardar el dataset principal (el más grande)
    if all_data:
        main_gid = max(all_data.keys(), key=lambda k: len(all_data[k]))
        main_df = all_data[main_gid]
        
        # Convertir DataFrame a lista de diccionarios
        data = main_df.to_dict(orient="records")
        
        # Limpiar NaN y convertir a null (JSON válido)
        def clean_nan(obj):
            if isinstance(obj, dict):
                return {k: clean_nan(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [clean_nan(item) for item in obj]
            elif pd.isna(obj) or (isinstance(obj, float) and pd.isna(obj)):
                return None
            return obj
        
        data_cleaned = clean_nan(data)
        
        # Crear objeto con metadata y data
        output = {
            "metadata": {
                "lastUpdated": datetime.now(timezone.utc).isoformat(),
                "totalRecords": len(main_df),
                "totalColumns": len(main_df.columns),
                "sheetId": SHEET_ID,
                "gid": main_gid
            },
            "data": data_cleaned
        }
        
        # Guardar JSON en la raíz
        root_path = "scraped_data.json"
        with open(root_path, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        
        # Copiar también al frontend si existe la carpeta app
        web_path = "app/src/data/scraped_data.json"
        if os.path.exists("app/src/data"):
            shutil.copy2(root_path, web_path)
            print(f"Datos actualizados: {len(main_df)} filas, {len(main_df.columns)} columnas")
            print(f"Archivo guardado en: {root_path} y {web_path}")
        else:
            print(f"Datos actualizados: {len(main_df)} filas, {len(main_df.columns)} columnas")
            print(f"Archivo guardado en: {root_path}")
    else:
        print("Error: No se pudieron extraer datos.")
        exit(1)

if __name__ == "__main__":
    main()
