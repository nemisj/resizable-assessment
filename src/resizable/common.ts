export type Direction = 'row' | 'column';
export const getProperty = (direction: Direction) =>
  direction === 'row' ? 'width' : 'height';

export type MinWidthType<T = undefined> = T & {
  minSize?: number;
};
