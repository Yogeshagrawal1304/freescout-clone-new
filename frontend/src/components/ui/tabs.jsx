import React from "react";
import { cn } from "../../lib/utils";

const Tabs = ({ value, onValueChange, className, children, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(value);

  const handleValueChange = (newValue) => {
    setActiveTab(newValue);
    onValueChange && onValueChange(newValue);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, onValueChange: handleValueChange });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ className, children, activeTab, onValueChange, ...props }) => (
  <div
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (child.type === TabsTrigger) {
        return React.cloneElement(child, { activeTab, onValueChange });
      }
      return child;
    })}
  </div>
);

const TabsTrigger = ({ className, value, children, activeTab, onValueChange, ...props }) => (
  <button
    type="button"
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      activeTab === value
        ? "bg-background text-foreground shadow-sm"
        : "hover:bg-background/50",
      className
    )}
    onClick={() => onValueChange && onValueChange(value)}
    {...props}
  >
    {children}
  </button>
);

const TabsContent = ({ className, value, children, activeTab, ...props }) => {
  if (activeTab !== value) return null;
  
  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };