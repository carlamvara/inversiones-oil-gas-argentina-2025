# Backend Requirements: Oil & Gas Investment Dashboard

Este documento detalla las reglas de negocio y la estructura de datos necesaria para el soporte del backend de la aplicación de inversiones Oil & Gas.

## 1. Reglas de Negocio (Business Rules)

- **Validación de Declaraciones Juradas:** El sistema solo debe procesar inversiones que provengan de declaraciones juradas (DDJJ) oficiales según la RES2057.
- **Consistencia Interanual:** Al comparar 2024 vs 2025, el sistema debe alertar si hay variaciones superiores al 500% en una misma operadora para revisión manual.
- **Privacidad de Operadoras:** Aunque los datos son públicos (SIESE), el backend debe permitir filtrar el acceso a detalles específicos de yacimientos si el usuario no tiene permisos de "Analista Senior".
- **Cálculo de Totales:** El backend debe ser la fuente de verdad para los agregados (Total Explotación, Total Exploración) para evitar discrepancias por redondeo en el frontend.

## 2. Estructura de Datos Sugerida

### Entidad: Inversion
```json
{
  "id": "uuid",
  "empresa_id": "uuid",
  "anio": 2025,
  "tipo_actividad": "EXPLORACION | EXPLOTACION | COMPLEMENTARIA",
  "monto_usd": 1250.5,
  "moneda": "USD",
  "estado": "PREVISTA | REALIZADA | CONFIRMADA",
  "fecha_declaracion": "ISO8601"
}
```

### Entidad: Empresa
```json
{
  "id": "uuid",
  "nombre": "YPF S.A.",
  "cuit": "string",
  "pais_origen": "string"
}
```

## 3. Estados del Proceso

1. **PREVISTA:** Inversión declarada al inicio del ciclo anual.
2. **EN_PROCESO:** Inversión con reportes trimestrales parciales.
3. **REALIZADA:** Inversión final ejecutada y auditada.
4. **CONFIRMADA:** Estado final tras validación del Ministerio.

## 4. Endpoints Requeridos (Sugeridos)

- `GET /api/v1/investments/summary?year=2025`: Retorna los agregados por tipo de actividad.
- `GET /api/v1/investments/by-company?year=2025`: Retorna el desglose por operadora.
- `GET /api/v1/investments/export?year=2025&format=csv`: Genera un archivo CSV con el detalle de las inversiones para descarga.
- `GET /api/v1/companies/top-performers`: Retorna las empresas con mayor crecimiento de inversión.
