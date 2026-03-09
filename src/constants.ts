import { InvestmentData, ColorPalette } from './types';

/**
 * Datos estáticos basados en las declaraciones juradas RES2057.
 * TODO (Backend): Estos datos deben ser consumidos desde una API en producción.
 */

export const DATA_2024: InvestmentData[] = [
  { empresa: 'YPF S.A.', exploracion: 28.3, explotacion: 2025.1, complementaria: 20.0 },
  { empresa: 'PAN AMERICAN ENERGY', exploracion: 1.2, explotacion: 1240.5, complementaria: 5.0 },
  { empresa: 'PLUSPETROL S.A.', exploracion: 0, explotacion: 977.8, complementaria: 0 },
  { empresa: 'TECPETROL S.A.', exploracion: 43.9, explotacion: 633.7, complementaria: 0 },
  { empresa: 'TOTAL AUSTRAL S.A.', exploracion: 13.4, explotacion: 687.0, complementaria: 0 },
];

export const DATA_2025: InvestmentData[] = [
  { empresa: 'YPF S.A.', exploracion: 35.5, explotacion: 2240.0, complementaria: 25.0 },
  { empresa: 'PAN AMERICAN ENERGY', exploracion: 0.6, explotacion: 1417.2, complementaria: 0 },
  { empresa: 'PLUSPETROL S.A.', exploracion: 5.4, explotacion: 1120.0, complementaria: 10.0 },
  { empresa: 'TECPETROL S.A.', exploracion: 55.2, explotacion: 780.5, complementaria: 5.0 },
  { empresa: 'TOTAL AUSTRAL S.A.', exploracion: 15.0, explotacion: 710.0, complementaria: 0 },
  { empresa: 'PAMPA ENERGIA S.A.', exploracion: 1.6, explotacion: 530.6, complementaria: 19.7 },
];

export const COLORS: ColorPalette = {
  primary: '#f97316', // Orange-500
  secondary: '#fbbf24', // Amber-400
  accent: '#ea580c', // Orange-600
  dark: '#0a0a0a',
  card: '#171717',
  text: '#e5e7eb',
  muted: '#9ca3af'
};
