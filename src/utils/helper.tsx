export const getActionBadgeColor = (action: string) => {
  if (action) {
    switch (action.toLowerCase()) {
      case "quarantined":
        return "text-red-600 bg-red-50 rounded-lg border-2 border-red-200 w-max";
      case "delivered":
        return "text-gray-600 bg-gray-50 rounded-lg border-2 border-gray-200 w-max";
      default:
        return "text-gray-500 bg-gray-50 rounded-lg border-2 border-gray-200 w-max";
    }
  }
  return;
};
export const getBadgeVariant = (detection: string) => {
  if (detection) {
    switch (detection.toLowerCase()) {
      // 🔴 Danger values
      case "malicious":
      case "inactive":
      case "failed":
        return "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100";

      // 🟡 Warning values
      case "suspicious sender":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100";

      // ✅ Safe values
      case "delivered":
      case "safe":
      case "sent":
      case "not malicious":
      case "active":
      case "pass":
        return "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100";

      // 🔵 Marketing
      case "marketing":
        return "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100";

      // ⚪ Default
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100";
    }
  }
};

export const getProgressColor = (progress: number) => {
  if (progress < 79) return "bg-red-500";
  if (progress < 99) return "bg-orange-500";
  if (progress < 100) return "bg-yellow-500";
  return "bg-green-500";
};
