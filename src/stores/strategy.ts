import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface StrategyStep {
  label: string
  size: number
  offset: [number, number]
}

export interface Strategy {
  label: string
  unit: number
  scale: number
  steps: StrategyStep[]
}

export const strategies: Record<string, Strategy> = {
  qq3x3: {
    label: 'QQ个人资料图片3x3',
    unit: 0.333333,
    scale: 0.75,
    steps: [
      {
        label: '左1',
        size: 2,
        offset: [0, 0],
      },
      {
        label: '右1',
        size: 1,
        offset: [2, 0],
      },
      {
        label: '右2',
        size: 1,
        offset: [2, 1],
      },
      {
        label: '左2',
        size: 1,
        offset: [0, 2],
      },
      {
        label: '中1',
        size: 1,
        offset: [1, 2],
      },
      {
        label: '右3',
        size: 1,
        offset: [2, 2],
      },
      {
        label: '左3',
        size: 1,
        offset: [0, 3],
      },
      {
        label: '中2',
        size: 1,
        offset: [1, 3],
      },
      {
        label: '右4',
        size: 1,
        offset: [2, 3],
      },
    ],
  },
  normal3x3: {
    label: '普通3x3(九宫格)',
    unit: 0.333333,
    scale: 1,
    steps: [
      {
        label: '左1',
        size: 1,
        offset: [0, 0],
      },
      {
        label: '中1',
        size: 1,
        offset: [1, 0],
      },
      {
        label: '右1',
        size: 1,
        offset: [2, 0],
      },
      {
        label: '左2',
        size: 1,
        offset: [0, 1],
      },
      {
        label: '中2',
        size: 1,
        offset: [1, 1],
      },
      {
        label: '右2',
        size: 1,
        offset: [2, 1],
      },
      {
        label: '左3',
        size: 1,
        offset: [0, 2],
      },
      {
        label: '中3',
        size: 1,
        offset: [1, 2],
      },
      {
        label: '右3',
        size: 1,
        offset: [2, 2],
      },
    ],
  },
  normal2x2: {
    label: '普通2x2',
    unit: 0.5,
    scale: 1,
    steps: [
      {
        label: '左1',
        size: 1,
        offset: [0, 0],
      },
      {
        label: '右1',
        size: 1,
        offset: [1, 0],
      },
      {
        label: '左2',
        size: 1,
        offset: [0, 1],
      },
      {
        label: '右2',
        size: 1,
        offset: [1, 1],
      },
    ],
  },
}

export const useStrategyStore = defineStore('strategy', () => {
  const strategy = ref('qq3x3')
  return { strategy }
})
