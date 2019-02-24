// @flow
import { useEffect } from 'react'

// eslint-disable-next-line import/prefer-default-export
export function useEffectAsync(effect: Function, inputs: Array<any> = []) {
  useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs)
}
