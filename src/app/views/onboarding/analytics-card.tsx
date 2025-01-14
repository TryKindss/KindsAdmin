'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const cards = [
  {
    title: "Top 5% of domains",
    subtitle: "0 unique domains"
  },
  {
    title: "Suspicious Domains",
    subtitle: "0 unique domains"
  },
  {
    title: "Top 25% of threats",
    subtitle: "0 types of threats detected"
  }
]

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <Card key={index} className="bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-medium">{card.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{card.subtitle}</p>
          </CardHeader>
          <CardContent className="min-h-[300px] flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">No data available</span>
            </div>
            <div className="flex items-center gap-2 pt-4 mt-auto border-t">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Page 1 of 1</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

