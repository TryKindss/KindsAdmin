"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

export default function DomainChart({ data }: { data: { domain?: string; type?: string; count: number; score?: number }[] }) {
  
  const yAxisKey = data[0]?.domain ? "domain" : "type"

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          count: {
            label: "Count",
            color: "rgb(241, 245, 249)", 
          },
        }}
        className="h-full" 
      >
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 30, 
            right: 0, 
            bottom: 30, 
            left: 50, 
          }}
          barCategoryGap={10} 
          barGap={2} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            dataKey={yAxisKey}
            type="category"
            tickLine={false}
            axisLine={false}
            fontSize={14}
            tick={{ fill: "#000" }}
          />
          <XAxis
            type="number"
            hide={false}  
            tickLine={false}
            axisLine={false}
          />
          {/* Adjust the width of the bars with the barSize prop */}
          <Bar dataKey="count" fill="#E0F2FE" radius={[4, 4, 4, 4]} barSize={45} /> {/* Adjust barSize here */}
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload) return null
              return (
                <div className="rounded-lg border bg-white p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">
                      {payload[0].payload[yAxisKey]}
                    </div>
                    <div className="text-right">{payload[0].value}</div>
                  </div>
                </div>
              )
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
