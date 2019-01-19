export interface WineNode {
  node: {
    fields: {
      slug: string;
    };
    name: string;
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
