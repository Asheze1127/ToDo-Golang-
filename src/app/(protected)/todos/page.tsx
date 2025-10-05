import TodoForm from "@/components/forms/TodoForm"
import TodoTimeline from "@/components/todos/TodoTimeline"

export default function TodosPage() {
  return (
    <div className="space-y-8">
      <TodoForm />
      <TodoTimeline />
    </div>
  )
}
