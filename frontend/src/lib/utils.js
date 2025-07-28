// Simple class name utility without external dependencies
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}