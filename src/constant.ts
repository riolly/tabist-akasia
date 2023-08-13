export const COLORS = [
  'black',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
] as const;

export type Color = (typeof COLORS)[number]

