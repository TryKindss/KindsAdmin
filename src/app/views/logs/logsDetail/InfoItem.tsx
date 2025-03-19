import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getBadgeVariant } from "@/utils/helper";
import { HelpCircle } from "lucide-react";

export interface InfoItemProps {
  label: string;
  value: string | React.ReactNode | number;
  tooltipContent?: string;
  isBadge?: Boolean | null;
}
export function InfoItem({
  label,
  value,
  tooltipContent,
  isBadge,
}: InfoItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <span className="font-bold text-xs text-[#344054]">{label}</span>
        {tooltipContent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {isBadge ? (
        <Badge className={`${getBadgeVariant(value as string || "")}`}>{value}</Badge>
      ) : (
        <p className="text-sm">{value}</p>
      )}
    </div>
  );
}
