import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const Select = ({ children, value, onValueChange, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    onValueChange && onValueChange(newValue);
    setOpen(false);
  };

  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { 
            onClick: () => setOpen(!open),
            selectedValue,
            open
          });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, { 
            open,
            onValueChange: handleValueChange
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ className, children, onClick, selectedValue, open, ...props }) => {
  const selectedChild = React.Children.toArray(children).find(
    child => child.type === SelectValue
  );
  
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {selectedChild}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

const SelectValue = ({ placeholder, selectedValue }) => {
  return <span>{selectedValue || placeholder}</span>;
};

const SelectContent = ({ className, children, open, onValueChange, ...props }) => {
  if (!open) return null;
  
  return (
    <div
      className={cn(
        "absolute z-50 w-full mt-1 rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, { onValueChange });
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = ({ className, children, value, onValueChange, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={() => onValueChange && onValueChange(value)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };