import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
  dismissible?: boolean;
}

export function Alert({ type = "info", message, onClose, dismissible = true }: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const typeClasses = {
    success: "bg-green-100 text-green-800 border-green-200",
    error: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <div className={cn("flex items-center p-4 border rounded-lg", typeClasses[type])}>
      <div className="flex-1">
        <p>{message}</p>
      </div>
      {dismissible && (
        <button onClick={handleClose} className="ml-4 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}