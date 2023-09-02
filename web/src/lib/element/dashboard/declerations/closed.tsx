class closed {
  constructor(current: HTMLDivElement, type: "button" | "dropdown") {
    switch (type) {
      case "button":
        current.style.borderRadius = "10px 10px 0px 0px";
        break;
      case "dropdown":
        current.style.display = "none";
        break;
    }
  }
}

export default closed;
