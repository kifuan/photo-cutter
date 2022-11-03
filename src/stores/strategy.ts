import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export type StrategyStep = Readonly<{
  label: string
  size: number
  offset: readonly [number, number]
}>

export type Strategy = Readonly<{
  label: string
  unit: number
  scale: number
  steps: StrategyStep[]
}>

export type CalculatedStrategyData = Readonly<{
  unit: number
  cutOffset: [number, number]
}>

export const strategies: Readonly<Record<string, Strategy>> = {
  qq3x3: {
    label: 'QQ Profile 3x3',
    unit: 0.333333,
    scale: 0.75,
    steps: [
      {
        label: 'Left 1',
        size: 2,
        offset: [0, 0],
      },
      {
        label: 'Right 1',
        size: 1,
        offset: [2, 0],
      },
      {
        label: 'Right 2',
        size: 1,
        offset: [2, 1],
      },
      {
        label: 'Left 2',
        size: 1,
        offset: [0, 2],
      },
      {
        label: 'Mid 1',
        size: 1,
        offset: [1, 2],
      },
      {
        label: 'Right 3',
        size: 1,
        offset: [2, 2],
      },
      {
        label: 'Left 3',
        size: 1,
        offset: [0, 3],
      },
      {
        label: 'Mid 2',
        size: 1,
        offset: [1, 3],
      },
      {
        label: 'Right 4',
        size: 1,
        offset: [2, 3],
      },
    ],
  },
  normal3x3: {
    label: 'Normal 3x3',
    unit: 0.333333,
    scale: 1,
    steps: [
      {
        label: 'Left 1',
        size: 1,
        offset: [0, 0],
      },
      {
        label: 'Mid 1',
        size: 1,
        offset: [1, 0],
      },
      {
        label: 'Right 1',
        size: 1,
        offset: [2, 0],
      },
      {
        label: 'Left 2',
        size: 1,
        offset: [0, 1],
      },
      {
        label: 'Mid 2',
        size: 1,
        offset: [1, 1],
      },
      {
        label: 'Right 2',
        size: 1,
        offset: [2, 1],
      },
      {
        label: 'Left 3',
        size: 1,
        offset: [0, 2],
      },
      {
        label: 'Mid 3',
        size: 1,
        offset: [1, 2],
      },
      {
        label: 'Right 3',
        size: 1,
        offset: [2, 2],
      },
    ],
  },
  normal2x2: {
    label: 'Normal 2x2',
    unit: 0.5,
    scale: 1,
    steps: [
      {
        label: 'Left 1',
        size: 1,
        offset: [0, 0],
      },
      {
        label: 'Right 1',
        size: 1,
        offset: [1, 0],
      },
      {
        label: 'Left 2',
        size: 1,
        offset: [0, 1],
      },
      {
        label: 'Right 2',
        size: 1,
        offset: [1, 1],
      },
    ],
  },
}

export const useStrategyStore = defineStore('strategy', () => {
  const strategy = ref(strategies.qq3x3)
  const name = ref('qq3x3')

  const strategyName = computed({
    get: () => name.value,
    set: (value) => {
      if (!Reflect.has(strategies, value))
        throw new TypeError(`unknown strategy: ${value}`)
      name.value = value
      strategy.value = strategies[value]
    },
  })

  return { strategy: readonly(strategy), strategyName }
})
