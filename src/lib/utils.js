// @flow
import { useEffect } from 'react'

// eslint-disable-next-line import/prefer-default-export
export function useEffectAsync(effect: Function, inputs: Object) {
  useEffect(() => {
    effect()
  }, inputs)
}
