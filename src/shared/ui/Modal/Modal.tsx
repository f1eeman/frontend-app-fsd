import { useState, useRef, useEffect, useCallback } from "react";
import * as classes from "./Modal.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Portal, type PortalProps } from "@/shared/ui/Portal/Portal";
import type { FC, ReactNode, MouseEvent } from "react";

interface ModalProps extends Pick<PortalProps, "elementId" | "element"> {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
  lazy?: boolean;
}

const ANIMATION_DURATION = 300;

export const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    className = "",
    isOpen,
    onClose,
    element,
    elementId,
    lazy = false,
  } = props;

  const onContentClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(
    (e?: MouseEvent<HTMLDivElement>): void => {
      e?.stopPropagation();
      setIsClosing(true);
      timerID.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DURATION);
    },
    [onClose],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      if (timerID.current) {
        clearTimeout(timerID.current);
      }
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={element} elementId={elementId}>
      <div
        onClick={handleClose}
        className={classNames(
          classes.Modal,
          {
            [classes.opened]: isOpen,
            [classes.closed]: isClosing,
          },
          [className],
        )}
      >
        <div className={classes.overlay}>
          <div className={classes.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
