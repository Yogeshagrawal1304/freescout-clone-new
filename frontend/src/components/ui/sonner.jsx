import React from "react";

// Simple toast component that works with our useToast hook
export const Toaster = () => {
  return (
    <div 
      id="toast-container" 
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2"
    >
      {/* Toasts will be rendered here by the useToast hook */}
    </div>
  );
};