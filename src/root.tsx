import { createAI } from 'ai/rsc'
import { lazy } from 'react'

const Component = lazy(() => import('./component'))

const AI = createAI({
  actions: {}
})

export const App = () => {
  return (
    <AI>
      <Component/>
    </AI>
  )
}
