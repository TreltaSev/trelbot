export type cModal = {
  name: string;
  priority?: number;
  element?: React.ReactNode;
};

export type pModal = Omit<cModal, "element"> & {
  contents: cModal[];
};

let modals: (cModal | pModal)[] = [];

/**
 * Settings loader, used whenever adding pages like Automations into the editor section of /dashboard
 * @usedin `/dashboard/:guild_id:`
 */
class loader {
  /**
   * Registers a page or modal, used whenever adding a tab to the editor section of /dashboard/:guild_id:
   * @param name The name of the parent
   * @param parent the name of the parent or create a new parent
   * @param priority the priority of the tab.
   */
  public register(name: string, element?: React.ReactNode, parent?: string, priority?: number) {
    let rP: cModal = { name: name, priority: priority };
    if (parent) {
      const muMatch: pModal | cModal | undefined = modals.find((_m) => _m.name === parent);

      if (!muMatch) {
        throw Error(`Match not Found ${parent}`);
      }

      if (this.isparent(muMatch)) {
        (muMatch as pModal).contents.push(rP);
      }
    } else {
      if (element === undefined) {
        throw Error(`Element can't be undefined in ${rP}`);
      }
      rP.element = element;
      modals.push(rP);
    }
  }

  private isparent(modal: cModal | pModal) {
    return (modal as pModal).contents !== undefined;
  }

  /**
   * @returns The global modals
   */
  public get(): (cModal | pModal)[] {
    return modals;
  }
}

export default loader;
