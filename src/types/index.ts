export interface TodoDashboardSummary {
  label: string
  completed: number
  target?: number
}

export interface TodoDashboardDailyStat {
  date: string
  completed: number
}

export interface TodoDashboardResponse {
  summary: TodoDashboardSummary[]
  daily: TodoDashboardDailyStat[]
  completedDates?: string[]
}
