import { describe, expect, it } from 'vitest'
import { generateChoices, generateRangeNear, pickRandom } from '../numbers'

describe('Numbers', () => {
  it('generateRangeNear', () => {
    const number = 6

    const result = generateRangeNear(number)

    expect(result).toBeTruthy()
    expect(result).toContain(number)
    expect(result.some((i) => i < 0)).toBeFalsy()
  })

  it('generateRangeNear with negatives', () => {
    const number = 1

    const result = generateRangeNear(number, 4, true)

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

  it('generateChoices', () => {
    const correct = 5

    const result = generateChoices(correct)

    expect(result).toHaveLength(2)
    expect(result).toContain(correct)
  })
})
