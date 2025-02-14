import { Button } from "@/components/ui/button"
import { TableIcon } from "lucide-react"

interface TableEmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionOnClick?: () => void
}

export default function TableEmptyState({
  title,
  description,
  actionLabel,
  actionOnClick
}: TableEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-4 w-full h-[400px] border-2 border-dashed border-gray-200 rounded-lg bg-white p-6 text-center">
      <div className="rounded-full bg-gray-100 p-3 mb-4">
        <TableIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-sm">{description}</p>
      {actionLabel && actionOnClick && (
        <Button onClick={actionOnClick} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}