"use client"

import type { HTMLAttributes } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface DashboardCalendarProps extends HTMLAttributes<HTMLDivElement> {
  selectedDates?: Date[]
}

export function DashboardCalendar({
  className,
  selectedDates = [],
  ...props
}: DashboardCalendarProps) {
  return (
    <Card className={cn("shadow-sm", className)} {...props}>
      <CardHeader className="space-y-1">
        <CardTitle>活動カレンダー</CardTitle>
        <CardDescription>完了したタスクの日付を振り返りましょう</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={selectedDates}
          className="mx-auto"
          components={{
            Footer: () => (
              <div className="mt-2 text-center text-xs text-muted-foreground">
                完了した日付がハイライト表示されます。
              </div>
            ),
          }}
        />
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          ※ 実データを連携する際は `selectedDates` に完了したタスクの日付を渡してください。
        </p>
      </CardFooter>
    </Card>
  )
}
