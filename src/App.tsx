import type { ComponentType } from "react"
import { MotionConfig } from "motion/react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { TooltipProvider } from "@/components/ui/tooltip"
import Layout from "@/site/Layout"
import * as pages from "@/site/pages"
import { pageOrder, type PageKey } from "@/site/routes"

const pageComponents: Record<PageKey, ComponentType> = {
  home: pages.Home, about: pages.About, events: pages.Events, committee: pages.Committee,
  sponsors: pages.Sponsors, faq: pages.Faq, contact: pages.Contact, join: pages.Join,
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {pageOrder.map((p) => {
                const Page = pageComponents[p.key]
                return p.path ? <Route key={p.key} path={p.path} element={<Page />} /> : <Route key={p.key} index element={<Page />} />
              })}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  )
}
