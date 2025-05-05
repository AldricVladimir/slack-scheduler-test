import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700", className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };