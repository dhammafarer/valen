export interface Wine {
  node: {
    fields: {
      slug: string;
    };
    name: string;
    kind: string;
    year: string;
    origin: string;
    eye: string;
    nose: string;
    mouth: string;
    wineId: string;
    winery: {
      name: string;
      fields: {
        slug: string;
      };
    };
    image: any;
  };
}
