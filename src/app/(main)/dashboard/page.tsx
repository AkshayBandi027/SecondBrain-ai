import CreateNoteForm from "@/components/forms/create-note-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



export default function DashboardPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div>
        <h1>my Notes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">create notes</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Notes</DialogTitle>
              <DialogDescription>
                Add descriptive title and click save to create new note.
              </DialogDescription>
            </DialogHeader>
            <CreateNoteForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
