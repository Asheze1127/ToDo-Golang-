"use client"

import { useEffect, useState } from "react"

import { fetchTodoDashboard } from "@/services/todos"
import type {
  TodoDashboardDailyStat,
  TodoDashboardResponse,
  TodoDashboardSummary,
} from "@/types"

interface UseTodoDashboardState {
  summary: TodoDashboardSummary[]
  daily: TodoDashboardDailyStat[]
  completedDates: Date[]
  isLoading: boolean
  error?: string
}

export function useTodoDashboard(): UseTodoDashboardState {
  const [state, setState] = useState<UseTodoDashboardState>({
    summary: [],
    daily: [],
    completedDates: [],
    isLoading: true,
  })

  useEffect(() => {
    const controller = new AbortController()

    fetchTodoDashboard(controller.signal)
      .then((data: TodoDashboardResponse) => {
        const completedDates = (data.completedDates ?? []).map((dateString) =>
          dateString ? new Date(dateString) : undefined
        )

        setState({
          summary: data.summary ?? [],
          daily: data.daily ?? [],
          completedDates: completedDates.filter(
            (value): value is Date => value instanceof Date && !Number.isNaN(value.getTime())
          ),
          isLoading: false,
        })
      })
      .catch((error: Error) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }))
      })

    return () => {
      controller.abort()
    }
  }, [])

  return state
}
