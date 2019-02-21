// @flow
import { useEffect } from 'react'

export function useEffectAsync(effect: Function, inputs: Object) {
  useEffect(() => {
    effect()
  }, inputs)
}
