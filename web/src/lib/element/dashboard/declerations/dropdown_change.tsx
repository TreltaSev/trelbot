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
        this.current.style.borderRadius = "10px 10px 0px 0px";
        break;
      case "dropdown":
        this.current.style.display = "flex";
        break;
    }
  }

  onclose(): void {
    if (!this.current) {
      return;
    }
    switch (this.type) {
      case "button":
        this.current.style.borderRadius = "10px 10px 10px 10px";
        break;
      case "dropdown":
        this.current.style.display = "none";
        break;
    }
  }
}

export default dropdown_change;
