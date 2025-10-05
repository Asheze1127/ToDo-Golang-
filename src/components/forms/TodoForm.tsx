"use client"
import { Field } from "@/components/ui/field"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Textarea } from "../ui/textarea"

export default function TodoForm() {
    const [startDateOpen, setStartDateOpen] = useState(false)
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDateOpen, setEndDateOpen] = useState(false)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const handleAddTodo = () => {
        console.log(title, description, startDate, endDate)
    }

    return (
        <Field>
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" placeholder="Enter your todo" onChange={(e) => setTitle(e.target.value)} />
            <Textarea id="description" placeholder="Enter your todo" onChange={(e) => setDescription(e.target.value)} />
            <Label htmlFor="start_date">start date</Label>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="date-picker" className="px-1">
                        Date
                        </Label>
                        <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal"
                            >
                            {startDate ? startDate.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={startDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setStartDate(date)
                                setStartDateOpen(false)
                            }}
                            />
                        </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="time-picker" className="px-1">
                        Time
                        </Label>
                        <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                </div>
            <Label htmlFor="end_date">end date</Label>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="date-picker" className="px-1">
                        Date
                        </Label>
                        <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal"
                            >
                            {endDate ? endDate.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={endDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setEndDate(date)
                                setEndDateOpen(false)
                            }}
                            />
                        </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="time-picker" className="px-1">
                        Time
                        </Label>
                        <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                </div>
            <Button type="submit" onClick={handleAddTodo}>Add</Button>
        </Field>
    )
}