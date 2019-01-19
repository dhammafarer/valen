export interface WineNode {
  node: {
    fields: {
      slug: string;
    };
    name: string;
    kind: string;
    year: string;
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
