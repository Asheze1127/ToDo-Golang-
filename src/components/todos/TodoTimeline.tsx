"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { InfoIcon, MoreVertical } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "APIのエンドポイントを実装",
    description: "認証用のJWTを発行する処理を追加する",
    done: false,
    createdAt: "2025-10-05T10:00:00Z",
    user: {
      name: "太郎",
      username: "taro_dev",
      avatarUrl: "",
      bio: "Next.jsとGoが好きなエンジニア",
    },
    extraInfo: "優先度：高",
  },
  {
    id: 2,
    title: "DBマイグレーションの適用",
    description: "Noteテーブルのカラムを修正",
    done: true,
    createdAt: "2025-10-04T15:30:00Z",
    user: {
      name: "花子",
      username: "hanako",
      avatarUrl: "",
      bio: "SQLとUIが得意です",
    },
    extraInfo: "レビュー済み",
  },
] satisfies Array<{
  id: number
  title: string
  description: string
  done: boolean
  createdAt: string
  user: {
    name: string
    username: string
    avatarUrl: string
    bio: string
  }
  extraInfo: string
}>

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export function TodoTimeline({ className }: { className?: string }) {
  const handleEdit = (id: number) => () => console.log(`[task:${id}] 編集を選択しました`)
  const handleDelete = (id: number) => () => console.log(`[task:${id}] 削除を選択しました`)
  const handlePin = (id: number) => () => console.log(`[task:${id}] ピン留めを選択しました`)

  return (
    <div className={cn("space-y-6", className)}>
      {tasks.map((task, index) => (
        <div key={task.id} className="space-y-6">
          <Card className="overflow-hidden border-border">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarImage src={task.user.avatarUrl} alt={task.user.name} />
                  <AvatarFallback>
                    {task.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <button className="text-left text-sm font-semibold leading-tight hover:underline">
                            {task.user.name}
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-60">
                          <div className="space-y-1">
                            <p className="text-sm font-semibold">{task.user.name}</p>
                            <p className="text-xs text-muted-foreground">@{task.user.username}</p>
                            <p className="text-sm text-muted-foreground">{task.user.bio}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>@{task.user.username}</span>
                        <span aria-hidden>•</span>
                        <span>{formatDate(task.createdAt)}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreVertical className="size-4" />
                          <span className="sr-only">アクションメニュー</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={handleEdit(task.id)}>
                          編集
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleDelete(task.id)}>
                          削除
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handlePin(task.id)}>
                          ピン留め
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base leading-tight">
                      {task.title}
                    </CardTitle>
                    <Badge variant={task.done ? "default" : "secondary"}>
                      {task.done ? "完了" : "進行中"}
                    </Badge>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground"
                          aria-label={`${task.title} の補足情報を表示`}
                        >
                          <InfoIcon className="size-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 text-sm" align="start">
                        <p className="font-medium">補足情報</p>
                        <p className="text-muted-foreground">{task.extraInfo}</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <p className="flex-1 leading-relaxed">{task.description}</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 text-muted-foreground"
                      aria-label={`${task.title} の詳細を表示`}
                    >
                      <InfoIcon className="size-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 text-sm" align="end">
                    <p className="font-medium">作成日時</p>
                    <p className="text-muted-foreground">{formatDate(task.createdAt)}</p>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
          {index < tasks.length - 1 ? <Separator className="mx-auto w-11/12" /> : null}
        </div>
      ))}
    </div>
  )
}

export default TodoTimeline
