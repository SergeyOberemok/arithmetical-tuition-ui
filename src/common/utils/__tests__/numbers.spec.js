import { describe, expect, it } from 'vitest'
import { generateRandomNear, pickRandom } from '../numbers'

describe('Numbers', () => {
  it('generateRandomNear', () => {
    const number = 6

    const result = generateRandomNear(number)

    expect(result).toBeTruthy()
    expect(result).toContain(number)
    expect(result.some((i) => i < 0)).toBeFalsy()
  })

  it('generateRandomNear with negatives', () => {
    const number = 1

    const result = generateRandomNear(number, 4, true)

    expect(result).toBeTruthy()
    expect(result).toContain(number)
    expect(result.some((i) => i < 0)).toBeTruthy()
  })

  it('pickRandom', () => {
    const length = 5
    const arr = Array.from(Array(length), (_, i) => i)

    const result = pickRandom(arr)

    expect(arr).toContain(result)
    expect(arr.indexOf(result)).toBeLessThanOrEqual(length)
  })
})
