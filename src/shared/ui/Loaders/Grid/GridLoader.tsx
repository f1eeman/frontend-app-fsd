import { classNames } from "@/shared/lib/classNames/classNames";
import "./GridLoader.scss";
import type { FC } from "react";

interface LoaderProps {
  className?: string;
}

export const GridLoader: FC<LoaderProps> = ({ className = "" }) => (
  <div className={classNames(`lds-grid ${className}`)}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
