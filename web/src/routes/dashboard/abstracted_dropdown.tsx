export interface abstracted_dropdown {
  onopen?(): void;
  onclose?(): void;
}

export abstract class abstracted_dropdown {
  public base_options: KeyframeAnimationOptions = { duration: 300, fill: "forwards", easing: "cubic-bezier(.11, .07, .04, .98)" }
}

