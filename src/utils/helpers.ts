import chroma from "chroma-js";

export const darken = (color: string) => (v: number) => chroma(color).darken(v).hex();
export const lighten = (color: string) => (v: number) => chroma(color).brighten(v).hex();

export const isSameDay = (d1: string, d2:string): boolean => {
  return d1.slice(0,10) === d2.slice(0,10);
}
