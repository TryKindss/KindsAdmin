export const getActionBadgeColor = (action: string) => {
  switch (action.toLowerCase()) {
    case "quarantined":
      return "text-red-600 bg-red-50 rounded-lg border-2 border-red-200 w-max";
    case "delivered":
      return "text-gray-600 bg-gray-50 rounded-lg border-2 border-gray-200 w-max";
    default:
      return "text-gray-500 bg-gray-50 rounded-lg border-2 border-gray-200 w-max";
  }
};

export const getBadgeVariant = (detection: string) => {
  switch (detection.toLowerCase()) {
    case "malicious":
      return "bg-red-50 text-red-700 hover:bg-red-100";
    case "suspicious sender":
      return "bg-yellow-50 text-yellow-700 hover:bg-yellow-100";
    case "not malicious":
      return "bg-green-50 text-green-700 hover:bg-green-100";
    case "marketing":
      return "bg-blue-50 text-blue-700 hover:bg-blue-100";
    case "safe":
      return "bg-gray-50 text-gray-700 hover:bg-gray-100";
    default:
      return "bg-gray-50 text-gray-700 hover:bg-gray-100";
  }
};

export const getProgressColor = (progress: number) => {
  if (progress < 79) return "bg-red-500";
  if (progress < 99) return "bg-orange-500";
  if (progress < 100) return "bg-yellow-500";
  return "bg-green-500";
};
