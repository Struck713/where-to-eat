
import { PropsWithChildren } from "react";

type NativeProps<T> = PropsWithChildren<React.DetailedHTMLProps<React.AnchorHTMLAttributes<T>, T>>;

export const Link = ({ children, className, ...other } : NativeProps<HTMLAnchorElement>) => <a {...other} className={`text-blue-600 hover:animate-pulse ${className}`}>{children}</a>;
export const Highlight = ({ children, className, ...other } : NativeProps<HTMLSpanElement>) => <span {...other} className={`text-blue-600 ${className}`}>{children}</span>;