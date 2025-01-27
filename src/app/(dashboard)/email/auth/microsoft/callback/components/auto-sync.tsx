"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface AutoSyncPromptCardProps {
    setSyncStep: React.Dispatch<React.SetStateAction<number>>;
  }
export default function AutoSyncPromptCard({setSyncStep}: AutoSyncPromptCardProps) {
  const handleBack = () => {
    console.log("Back clicked");
    // Handle back navigation
  };

  const handleLaunch = () => {
    console.log("Launch playground clicked");
    // Handle launch action
  };

  const router = useRouter();

  return (
    <Card className="w-full max-w-md border shadow-none">
      <CardHeader>
        <CardTitle>Auto sync</CardTitle>
        <CardDescription>
          This helps reduce admin over-head and will automatically add and
          remove users based on the status of the inbox within your provider.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Enable" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setSyncStep(0)}>
            back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            Launch playground
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
