export type cModal = {
  name: string;
  priority?: number;
  element?: React.ReactNode;
};

let modals: cModal[] = [];

/**
 * Settings loader, used whenever adding pages like Automations into the editor section of /dashboard
 * @usedin `/dashboard/:guild_id:`
 */
class loader {
  /**
   * Registers a page or modal, used whenever adding a tab to the editor section of /dashboard/:guild_id:
   * @param name The name of the parent
   * @param element the element that will be displayed
   * @param priority the priority of the tab.
   */
  public register(name: string, element?: React.ReactNode, priority?: number) {
    modals.push({ name: name, element: element, priority: priority } as cModal);
  }

  /**
   * @returns The global modals
   */
  public get(): cModal[] {
    return modals;
  }
}

export default loader;
