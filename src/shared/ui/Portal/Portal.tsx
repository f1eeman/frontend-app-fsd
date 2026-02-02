import { createPortal } from "react-dom";
import type { FC, ReactNode } from "react";

export interface PortalProps {
  children: ReactNode;
  elementId?: string;
  element?: HTMLElement | null;
}

const rootAppElement = document.getElementById("root");
const bodyElement = document.body;

export const Portal: FC<PortalProps> = (props) => {
  const { children, element, elementId } = props;
  if (elementId && element) {
    throw new Error(
      `Portal: Cannot provide both element and elementId props! elementId:
      ${elementId},
      element: ${JSON.stringify(element)}`,
    );
  }
  let el: HTMLElement | null = element ?? rootAppElement ?? bodyElement;

  if (elementId) {
    el = document.querySelector(`#${elementId}`);
  }

  return el ? createPortal(children, el) : null;
};
