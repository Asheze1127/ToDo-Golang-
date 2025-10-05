import { apiFetch } from "@/lib/api"
import type {
  TodoDashboardDailyStat,
  TodoDashboardResponse,
  TodoDashboardSummary,
} from "@/types"

export async function fetchTodoDashboard(
  signal?: AbortSignal
): Promise<TodoDashboardResponse> {
  return apiFetch<TodoDashboardResponse>("/todos/stats", { signal })
}

export async function fetchTodoSummary(
  signal?: AbortSignal
): Promise<TodoDashboardSummary[]> {
  const { summary } = await fetchTodoDashboard(signal)
  return summary
}

export async function fetchTodoDailyStats(
  signal?: AbortSignal
): Promise<TodoDashboardDailyStat[]> {
  const { daily } = await fetchTodoDashboard(signal)
  return daily
}
