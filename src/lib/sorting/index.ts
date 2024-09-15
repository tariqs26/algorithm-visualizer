import { MAX_ARRAY_ITEM_HEIGHT } from "../constants"
import {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from "./algorithms"

export const randomizeArray = (length: number) =>
  Array.from({ length }, () => ({
    height: Math.floor(Math.random() * (MAX_ARRAY_ITEM_HEIGHT - 10)) + 10,
    isSorted: false,
  }))

export const sorter = {
  selection: { algorithm: selectionSort, label: "Selection Sort" },
  bubble: { algorithm: bubbleSort, label: "Bubble Sort" },
  insertion: { algorithm: insertionSort, label: "Insertion Sort" },
  quick: { algorithm: quickSort, label: "Quick Sort" },
  merge: { algorithm: mergeSort, label: "Merge Sort" },
}
