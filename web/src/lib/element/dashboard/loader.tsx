type dashboardPage = {
  name: string;
  element: React.ReactNode;
  parent?: string;
  priority?: number;
};

let dashboardPages: dashboardPage[] = [];

export const loader = (name: string, element: React.ReactNode, parent?: string, priority?: number): void => {
  const _page: dashboardPage = {name: name, element: element, parent: parent, priority: priority};
  dashboardPages.push(_page);  
};

export const get = (): dashboardPage[] => {
  return dashboardPages;
}