import type { SortingAlgorithm } from "../types"
import { sleep } from "../utils"

export const bubbleSort: SortingAlgorithm = async (context) => {
  const { array, delay, setArray, setStatus } = context
  setStatus("running")
  const n = array.length
  const newArray = [...array]

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (newArray[j].height > newArray[j + 1].height) {
        newArray[j].isSwapping = true
        newArray[j + 1].isSwapping = true
        setArray([...newArray])
        await sleep(delay)
        ;[newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]
        newArray[j].isSwapping = false
        newArray[j + 1].isSwapping = false
        await sleep(delay)
        setArray([...newArray])
      }
    }

    await sleep(delay)
    newArray[n - i - 1].isSorted = true
    setArray([...newArray])
  }
  newArray[0].isSorted = true
  setArray([...newArray])
}

export const selectionSort: SortingAlgorithm = async (context) => {
  const { array, delay, setArray, setStatus } = context
  setStatus("running")
  const n = array.length
  const newArray = [...array]

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++)
      if (newArray[j].height < newArray[minIndex].height) minIndex = j

    newArray[i].isSwapping = true
    newArray[minIndex].isSwapping = true
    setArray([...newArray])
    await sleep(delay)
    ;[newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]]
    newArray[i].isSwapping = false
    newArray[minIndex].isSwapping = false
    newArray[i].isSorted = true
    await sleep(delay)
    setArray([...newArray])
  }

  await sleep(delay)
  newArray[n - 1].isSorted = true
  setArray([...newArray])
}

export const insertionSort: SortingAlgorithm = async (context) => {
  const { array, delay, setArray, setStatus } = context
  setStatus("running")
  const n = array.length
  const newArray = [...array]

  for (let i = 1; i < n; i++) {
    const key = newArray[i]
    let j = i - 1

    while (j >= 0 && newArray[j].height > key.height) {
      newArray[j + 1].isSwapping = true
      setArray([...newArray])
      await sleep(delay)
      newArray[j + 1].isSwapping = false
      newArray[j + 1] = newArray[j]
      await sleep(delay)
      setArray([...newArray])
      j--
    }

    newArray[j + 1] = key
    await sleep(delay)
    setArray([...newArray])
  }

  setArray(newArray.map((item) => ({ ...item, isSorted: true })))
}

export const quickSort: SortingAlgorithm = async (context) => {
  const { array, delay, setArray, setStatus } = context
  const newArray = [...array]

  const partition = async (low: number, high: number) => {
    const pivot = newArray[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      if (newArray[j].height < pivot.height) {
        i++
        newArray[i].isSwapping = true
        newArray[j].isSwapping = true
        setArray([...newArray])
        await sleep(delay)
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
        newArray[i].isSwapping = false
        newArray[j].isSwapping = false
        await sleep(delay)
        setArray([...newArray])
      }
    }

    newArray[i + 1].isSwapping = true
    newArray[high].isSwapping = true
    setArray([...newArray])
    await sleep(delay)
    ;[newArray[i + 1], newArray[high]] = [newArray[high], newArray[i + 1]]
    newArray[i + 1].isSwapping = false
    newArray[high].isSwapping = false
    await sleep(delay)
    setArray([...newArray])

    return i + 1
  }

  const sort = async (low: number, high: number) => {
    if (low < high) {
      const pi = await partition(low, high)
      await Promise.all([sort(low, pi - 1), sort(pi + 1, high)])
    }
  }

  setStatus("running")
  await sort(0, newArray.length - 1)
  setArray(newArray.map((item) => ({ ...item, isSorted: true })))
}

export const mergeSort: SortingAlgorithm = async (context) => {
  const { array, delay, setArray, setStatus } = context
  const merge = async (l: number, m: number, r: number) => {
    const n1 = m - l + 1
    const n2 = r - m
    const left = array.slice(l, m + 1)
    const right = array.slice(m + 1, r + 1)
    let i = 0
    let j = 0
    let k = l

    while (i < n1 && j < n2) {
      if (left[i].height <= right[j].height) {
        array[k] = left[i]
        i++
      } else {
        array[k] = right[j]
        j++
      }
      await sleep(delay)
      setArray([...array])
      k++
    }

    while (i < n1) {
      array[k] = left[i]
      i++
      k++
      await sleep(delay)
      setArray([...array])
    }

    while (j < n2) {
      array[k] = right[j]
      j++
      k++
      await sleep(delay)
      setArray([...array])
    }
  }

  const mergeSortHelper = async (l: number, r: number) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2)
      await mergeSortHelper(l, m)
      await mergeSortHelper(m + 1, r)
      await merge(l, m, r)
    }
  }

  setStatus("running")
  await mergeSortHelper(0, array.length - 1)
  setArray(array.map((item) => ({ ...item, isSorted: true })))
}
