import type { ComponentType } from "react"
import { MotionConfig } from "motion/react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { TooltipProvider } from "@/components/ui/tooltip"
import chalk from "@/designs/chalk"
import tape from "@/designs/tape"
import { pageOrder, type DesignId, type PageKey } from "@/designs/registry"
import Picker from "@/pages/Picker"

type PageName = "Home" | "About" | "Events" | "Committee" | "Sponsors" | "Faq" | "Contact" | "Join"
type DesignModule = { Layout: ComponentType; pages: Record<PageName, ComponentType> }

const designModules: Record<DesignId, DesignModule> = { chalk, tape }

const pageName: Record<PageKey, PageName> = {
  home: "Home", about: "About", events: "Events", committee: "Committee",
  sponsors: "Sponsors", faq: "Faq", contact: "Contact", join: "Join",
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Picker />} />
            {Object.entries(designModules).map(([id, { Layout, pages }]) => (
              <Route key={id} path={id} element={<Layout />}>
                {pageOrder.map((p) => {
                  const Page = pages[pageName[p.key]]
                  return p.path ? <Route key={p.key} path={p.path} element={<Page />} /> : <Route key={p.key} index element={<Page />} />
                })}
                <Route path="*" element={<Navigate to={`/${id}`} replace />} />
              </Route>
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  )
}
