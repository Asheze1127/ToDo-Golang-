app/
  (public)/
    login/page.tsx
    signup/page.tsx
  (protected)/
    layout.tsx            // 認証ガード（クライアント）
    todos/page.tsx
    profile/page.tsx      // 任意
  layout.tsx              // 全体レイアウト
  globals.css
components/
  ui/                     // Button, Input, Card（shadcn/ui）
  forms/                  // AuthForm, TodoForm など
  todos/                  // TodoList, TodoItem など
lib/
  api.ts                  // fetch ラッパ（BaseURL, ヘッダ付与）
  queryClient.ts          // React Query クライアント
  validators/             // zod スキーマ
  auth.ts                 // token セット/取得/削除（localStorage）
services/
  auth.ts                 // /login, /signup, /me 呼び出し
  todos.ts                // /todos CRUD 呼び出し
types/
  index.ts                // User, Todo 型