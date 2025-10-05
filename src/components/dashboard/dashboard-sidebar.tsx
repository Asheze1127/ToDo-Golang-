import { DashboardCalendar } from "@/components/dashboard/dashboard-calendar"
import { TodoStatsChart } from "@/components/dashboard/todo-stats-chart"

export function DashboardSidebar() {
  return (
    <div className="flex h-full flex-col gap-6">
      <TodoStatsChart />
      <DashboardCalendar />
    </div>
  )
}
