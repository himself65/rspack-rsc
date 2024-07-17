import { createAI } from 'ai/rsc'
import Component from './component'

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
