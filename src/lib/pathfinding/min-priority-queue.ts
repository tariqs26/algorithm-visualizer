type HeapElement<T> = { element: T; priority: number }

export class MinPriorityQueue<T> {
  private heap: HeapElement<T>[]

  constructor() {
    this.heap = []
  }

  enqueue(element: T, priority: number) {
    this.heap.push({ element, priority })
    this.bubbleUp(this.heap.length - 1)
  }

  dequeue() {
    if (this.isEmpty()) return
    const min = this.heap[0].element
    const end = this.heap.pop()!

    if (this.heap.length > 0) {
      this.heap[0] = end
      this.bubbleDown(0)
    }
    return min
  }

  peek() {
    return this.isEmpty() ? undefined : this.heap[0].element
  }

  isEmpty() {
    return this.heap.length === 0
  }

  private bubbleUp(index: number) {
    const element = this.heap[index]
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.heap[parentIndex]

      if (element.priority >= parent.priority) break

      this.heap[index] = parent
      index = parentIndex
    }
    this.heap[index] = element
  }

  private bubbleDown(index: number) {
    const length = this.heap.length
    const element = this.heap[index]

    while (true) {
      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2
      let leftChild: HeapElement<T> | undefined
      let rightChild: HeapElement<T> | undefined
      let swap = null

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex]
        if (leftChild.priority < element.priority) swap = leftChildIndex
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex]
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild!.priority)
        )
          swap = rightChildIndex
      }

      if (swap === null) break

      this.heap[index] = this.heap[swap]
      index = swap
    }
    this.heap[index] = element
  }
}
