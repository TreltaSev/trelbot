import defaultValue from "@root/lib/method/defaultValue";
import { abstracted_dropdown } from "./abstracted_dropdown";

class dropdown_change extends abstracted_dropdown {
  private current?: HTMLDivElement | null;
  private type?: "button" | "dropdown" | null;

  constructor(current?: HTMLDivElement | null, type?: "button" | "dropdown" | null) {
    super();
    this.type = type;
    this.current = current;
  }

  onopen(): void {
    if (!this.current) {
      return;
    }

    switch (this.type) {
      case "button":
        setTimeout(() => {
          if (this.current) {
            this.current.style.borderRadius = "10px 10px 0 0"
          }
        }, 50)
        break;
      case "dropdown":
        this.current.animate({transform: "translateY(0)"}, this.base_options)
        break;
    }
  }

  onclose(abrupt?: boolean): void {
    if (!this.current) {
      return;
    }

    const _abrupt = defaultValue(abrupt, false, undefined);

    switch (this.type) {
      case "button":
        setTimeout(() => {
          if (this.current) {
            this.current.style.borderRadius = "10px 10px 10px 10px"
          }
        }, 50)
        break;
      case "dropdown":
        if (_abrupt) {
          this.current.style.transform = "translateY(-100%)";
          break;
        }
        this.current.animate({transform: "translateY(-100%)"}, this.base_options)
        break;
    }
  }
}

export default dropdown_change;
