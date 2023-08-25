export type dashboardPage = {
  name: string;
  element: React.ReactNode;
  parent?: string;
  priority?: number;
};

export type parent = {
  name: string;
  contents: dashboardPage[];
  icon?: React.ReactNode;
};

let dashboardPages: dashboardPage[] = [];
let parents: parent[] = [];

export const loader = (name: string, element: React.ReactNode, parent?: string, priority?: number): void => {
  const _page: dashboardPage = { name: name, element: element, parent: parent, priority: priority };

  if (parent) {
    const _parentMatch: parent | undefined = parents.find((_p) => _p.name === parent);
    if (!_parentMatch) {
      throw `Match not found ${parent}`;
    }
    delete _page.parent
    _parentMatch.contents.push(_page);
  } else {
    dashboardPages.push(_page);
  }
};

export const register_parent = (name: string, icon?: React.ReactNode): void => {
  const _parent: parent = { name: name, contents: [], icon: icon };
  parents.push(_parent);
};

export const get = (): parent[] => {
  return parents;
};
