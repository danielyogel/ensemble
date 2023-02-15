export const OPTIONS = ['SUN', 'LIST', 'MATRIX', 'SINGLE'] as const;

export type Layout = typeof OPTIONS[number];

export const RADIUS = 350;

export const BASE_MARGIN_Y = 500;
export const BASE_MARGIN_X = 350;
