/**
 * Definición de tipos para la aplicación de inversiones Oil & Gas.
 * Se utiliza TypeScript para asegurar la integridad de los datos procesados.
 */

export interface InvestmentData {
  empresa: string;
  exploracion: number;
  explotacion: number;
  complementaria: number;
}

export interface PieChartData {
  name: string;
  value: number;
}

export type DashboardTab = 'overview' | 'empresas';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  card: string;
  text: string;
  muted: string;
}
