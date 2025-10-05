import type { ReactNode } from "react"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

interface ProtectedLayoutProps {
  children: ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b bg-card shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">タスク管理</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/profile"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              プロフィール
            </a>
            <button className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              ログアウト
            </button>
          </div>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <section className="space-y-6">{children}</section>
          <aside className="hidden h-full lg:flex">
            <DashboardSidebar />
          </aside>
        </div>
      </main>
    </div>
  )
}
