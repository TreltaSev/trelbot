export type cModal = {
  name: string;
  priority?: number;
  element?: React.ReactNode;
};

export type pModal = Omit<cModal, "element"> & {
  contents: cModal[];
  icon?: React.ReactNode;
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
    let rP: cModal = { name: name, element: element, priority: priority };
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
      modals.push(rP);
    }
  }

  /**
   * Registers not only a cModal but a pModal, saved into modals.
   * @param name The name of the parent
   * @param priority The priority meaning how close to the top the tab its the opposite of z-index
   * @param icon The icon showing to the left of the tab
   */
  public register_parent(name: string, priority?: number, icon?: React.ReactNode) {
    modals.push({ name: name, priority: priority, icon: icon, contents: [] } as pModal);
  }

  /**
   * @param modal The input modal
   * @returns True if its a parent false if not.
   */
  public isparent(modal: cModal | pModal) {
    return (modal as pModal).contents !== undefined;
  }

  /**
   * @param modal The input modal
   * @returns True if its a child false if not
   */
  public ischild(modal: cModal | pModal) {
    return (modal as cModal).element !== undefined;
  }

  /**
   * @returns The global modals
   */
  public get(): (cModal | pModal)[] {
    return modals;
  }
}

export default loader;
