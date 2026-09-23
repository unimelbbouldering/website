import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { club } from "@/content/site"
import { cn } from "@/lib/utils"

// No backend yet: the form hands the message to the visitor's email app.
export function ContactForm({ className, fieldClassName, buttonClassName }: { className?: string; fieldClassName?: string; buttonClassName?: string }) {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Website enquiry from ${data.get("name")}`)
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`)
    window.location.href = `mailto:${club.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-5", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required autoComplete="name" className={fieldClassName} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" className={fieldClassName} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={5} className={cn("min-h-32", fieldClassName)} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" className={buttonClassName}>
          Send message
        </Button>
        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="text-sm text-muted-foreground"
            >
              Your email app should open with the message filled in.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
