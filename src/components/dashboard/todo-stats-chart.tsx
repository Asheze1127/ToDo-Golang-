"use client"

import type { HTMLAttributes } from "react"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TodoStatsChartProps extends HTMLAttributes<HTMLDivElement> {
  summary?: Array<{ label: string; completed: number; target?: number }>
  daily?: Array<{ date: string; completed: number }>
  isLoading?: boolean
  errorMessage?: string
}

const defaultSummary: Array<{ label: string; completed: number; target?: number }> = [
  { label: "今週", completed: 12, target: 15 },
  { label: "先週", completed: 9, target: 12 },
  { label: "今月", completed: 34, target: 40 },
]

const defaultDaily: Array<{ date: string; completed: number }> = [
  { date: "4/01", completed: 3 },
  { date: "4/02", completed: 5 },
  { date: "4/03", completed: 4 },
  { date: "4/04", completed: 6 },
  { date: "4/05", completed: 2 },
  { date: "4/06", completed: 7 },
  { date: "4/07", completed: 5 },
]

const dailyChartConfig: ChartConfig = {
  completed: {
    label: "完了タスク",
    color: "hsl(var(--primary) / 0.35)",
  },
}

export function TodoStatsChart({
  summary,
  daily,
  isLoading = false,
  errorMessage,
  className,
  ...props
}: TodoStatsChartProps) {
  const summaryData = summary && summary.length > 0 ? summary : defaultSummary
  const dailyData = daily && daily.length > 0 ? daily : defaultDaily
  const maxValue = Math.max(...summaryData.map((item) => item.target ?? item.completed), 1)

  return (
    <Card className={cn("shadow-sm", className)} {...props}>
      <CardHeader className="space-y-1">
        <CardTitle>完了状況</CardTitle>
        <CardDescription>タスク進捗をざっくり把握しましょう</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {errorMessage ? (
          <p className="text-sm text-destructive">{errorMessage}</p>
        ) : isLoading ? (
          <div className="space-y-6" aria-busy>
            <ul className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="h-3 w-16 animate-pulse rounded bg-muted" />
                    <span className="h-3 w-12 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="h-2 animate-pulse rounded-full bg-muted" />
                </li>
              ))}
            </ul>
            <div className="h-[220px] animate-pulse rounded-xl bg-muted" />
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-4">
              {summaryData.map(({ label, completed, target }) => {
                const value = Math.min((completed / maxValue) * 100, 100)
                const targetValue = target ? Math.min((target / maxValue) * 100, 100) : undefined

                return (
                  <li key={label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{label}</span>
                      <span>
                        {completed}
                        {target ? ` / ${target}` : " 件"}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={value} aria-hidden />
                      {targetValue !== undefined && (
                        <span
                          className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-destructive/70"
                          style={{ left: `${targetValue}%` }}
                          aria-hidden
                        />
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
            <section className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>直近の日次完了数</span>
                <span className="text-xs text-muted-foreground">日次</span>
              </div>
              <ChartContainer config={dailyChartConfig} className="h-[220px] w-full">
                <BarChart data={dailyData} margin={{ left: 0, right: 0, top: 12, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="hsl(var(--border) / 0.55)"
                    vertical={false}
                  />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="completed" fill="var(--color-completed)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </section>
          </>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          ※ デモ用データです。API 連携時は `summary` と `daily` に受け取った値を渡してください。
        </p>
      </CardFooter>
    </Card>
  )
}
