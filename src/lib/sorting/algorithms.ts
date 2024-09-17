import type { SortingAlgorithm } from "../types"
import { sleep } from "../utils"

export const bubbleSort: SortingAlgorithm = async ({ state, dispatch }) => {
  dispatch({ type: "SET_STATUS", payload: "running" })
  const n = state.array.length
  const newArray = [...state.array]

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (newArray[j].height > newArray[j + 1].height) {
        newArray[j].isSwapping = true
        newArray[j + 1].isSwapping = true
        dispatch({ type: "SET_ARRAY", payload: [...newArray] })
        await sleep(state.delay)
        ;[newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]
        newArray[j].isSwapping = false
        newArray[j + 1].isSwapping = false
        await sleep(state.delay)
        dispatch({ type: "SET_ARRAY", payload: [...newArray] })
      }
    }

    await sleep(state.delay)
    newArray[n - i - 1].isSorted = true
    dispatch({ type: "SET_ARRAY", payload: [...newArray] })
  }
  newArray[0].isSorted = true
  dispatch({ type: "SET_ARRAY", payload: [...newArray] })
}

export const selectionSort: SortingAlgorithm = async ({ state, dispatch }) => {
  dispatch({ type: "SET_STATUS", payload: "running" })
  const n = state.array.length
  const newArray = [...state.array]

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++)
      if (newArray[j].height < newArray[minIndex].height) minIndex = j

    newArray[i].isSwapping = true
    newArray[minIndex].isSwapping = true
    dispatch({ type: "SET_ARRAY", payload: [...newArray] })
    await sleep(state.delay)
    ;[newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]]
    newArray[i].isSwapping = false
    newArray[minIndex].isSwapping = false
    newArray[i].isSorted = true
    await sleep(state.delay)
    dispatch({ type: "SET_ARRAY", payload: [...newArray] })
  }

  await sleep(state.delay)
  newArray[n - 1].isSorted = true
  dispatch({ type: "SET_ARRAY", payload: [...newArray] })
}

export const insertionSort: SortingAlgorithm = async ({ state, dispatch }) => {
  dispatch({ type: "SET_STATUS", payload: "running" })
  const n = state.array.length
  const newArray = [...state.array]

  for (let i = 1; i < n; i++) {
    const key = newArray[i]
    let j = i - 1

    while (j >= 0 && newArray[j].height > key.height) {
      newArray[j + 1].isSwapping = true
      dispatch({ type: "SET_ARRAY", payload: [...newArray] })
      await sleep(state.delay)
      newArray[j + 1].isSwapping = false
      newArray[j + 1] = newArray[j]
      await sleep(state.delay)
      dispatch({ type: "SET_ARRAY", payload: [...newArray] })
      j--
    }

    newArray[j + 1] = key
    await sleep(state.delay)
    dispatch({ type: "SET_ARRAY", payload: [...newArray] })
  }

  dispatch({ type: "SORT_ARRAY" })
}

export const quickSort: SortingAlgorithm = async ({ state, dispatch }) => {
  const newArray = [...state.array]

  const partition = async (low: number, high: number) => {
    const pivot = newArray[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      if (newArray[j].height < pivot.height) {
        i++
        newArray[i].isSwapping = true
        newArray[j].isSwapping = true
        dispatch({ type: "SET_ARRAY", payload: [...newArray] })
        await sleep(state.delay)
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
        newArray[i].isSwapping = false
        newArray[j].isSwapping = false
        await sleep(state.delay)
        dispatch({ type: "SET_ARRAY", payload: [...newArray] })
      }
    }

    newArray[i + 1].isSwapping = true
    newArray[high].isSwapping = true
    dispatch({ type: "SET_ARRAY", payload: [...newArray] })
    await sleep(state.delay)
    ;[newArray[i + 1], newArray[high]] = [newArray[high], newArray[i + 1]]
    newArray[i + 1].isSwapping = false
    newArray[high].isSwapping = false
    await sleep(state.delay)
    dispatch({ type: "SET_ARRAY", payload: [...newArray] })

    return i + 1
  }

  const sort = async (low: number, high: number) => {
    if (low < high) {
      const pi = await partition(low, high)
      await Promise.all([sort(low, pi - 1), sort(pi + 1, high)])
    }
  }

  dispatch({ type: "SET_STATUS", payload: "running" })
  await sort(0, newArray.length - 1)
  dispatch({ type: "SORT_ARRAY" })
}

export const mergeSort: SortingAlgorithm = async ({ state, dispatch }) => {
  const newArray = [...state.array]
  const merge = async (l: number, m: number, r: number) => {
    const n1 = m - l + 1
    const n2 = r - m
    const left = newArray.slice(l, m + 1)
    const right = newArray.slice(m + 1, r + 1)
    let i = 0
    let j = 0
    let k = l

    while (i < n1 && j < n2) {
      if (left[i].height <= right[j].height) newArray[k] = left[i++]
      else newArray[k] = right[j++]
      await sleep(state.delay)
      dispatch({ type: "SET_ARRAY", payload: [...newArray] })
      k++
    }

    while (i < n1) {
      newArray[k++] = left[i++]
      await sleep(state.delay)
      dispatch({ type: "SET_ARRAY", payload: [...newArray] })
    }

    while (j < n2) {
      newArray[k++] = right[j++]
      await sleep(state.delay)
      dispatch({ type: "SET_ARRAY", payload: [...newArray] })
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

  dispatch({ type: "SET_STATUS", payload: "running" })
  await mergeSortHelper(0, newArray.length - 1)
  dispatch({ type: "SORT_ARRAY" })
}
