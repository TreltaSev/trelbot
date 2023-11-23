import React from "react";
import { CSSProperties } from "react";
import defaultValue from "@root/lib/method/defaultValue";

/* Object with string key and CSSProperties Child */
type StyleObject = {
  [key: string]: { style?: CSSProperties; className?: string };
};

/**
 * Extendable class, when extended, allows the caller class from having the `decor` methods which
 * can save, set, and clear saved values for easier stylization of components. first call
 * ```
 * this.set_decor(identifier: string, style?: CSSProperties, className?: string)
 * ```
 *
 * then you can get this saved decor with
 * ```
 * this.get_decor(identifier: string)
 * ```
 */
class Stylist extends React.Component {
  public decor: StyleObject = {};

  /**
   * This method is meant to get a saved `cssproperty` object with an identifier.
   * @param identifier The identifier of the style
   * @returns Html Properties
   */
  get_decor(identifier: string): any {
    const decoration = this.decor[identifier];
    decoration.className = defaultValue(decoration.className, "", undefined);
    decoration.style = defaultValue(decoration.style, {}, undefined);
    return { ...decoration };
  }

  /**
   * Creates a key within `this.decor` which allows you to save styles and access the with `get_style` or `get_className`
   * @param identifier The identifier of the style which will be accessed with `get_style`
   * @param style The css value of the style which will be used as an object
   * @param className Stored ClassName
   */
  set_decor(identifier: string, style?: CSSProperties, className?: string) {
    style = defaultValue(style, {}, undefined);
    className = defaultValue(className, "", undefined);
    this.decor[identifier] = { style: style, className: className };
  }

  /**
   * Deletes the identifier from the stored decors.
   * @param identifier The identifier of the decor
   */
  delete_decor(identifier: string) {
    delete this.decor[identifier];
  }
}

export default Stylist;
