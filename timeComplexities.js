class TimeComplexitiesDemo {
    /**
     * Creates an array to be used in the methods
     * @param {number} N 
     */
    constructor(N) {
      this.N = N;
      this.array = Array.from({ length: N }, (_, i) => i); // [0, 1, 2, ..., N-1]
    }
  
    /**
     * O(1) - Constant time
     * Returns the first element of the array
     */
    getFirstElement() {
      return this.array[0];
    }
  
    /**
     * @param {number} target 
     * O(log N) - Logarithmic time
     * Implements a binary search for a given target in the array
     */
    binarySearch(target) {
      let low = 0;
      let high = this.array.length - 1;
  
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (this.array[mid] === target) {
          return mid; // Found the target
        } else if (this.array[mid] < target) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return -1; // Not found
    }
  
    /**
     * O(N) - Linear time
     * Sums all elements in the array
     */
    linearSum() {
      let sum = 0;
      for (let i = 0; i < this.array.length; i++) {
        sum += this.array[i];
      }
      return sum;
    }
  
    /**
     * O(N log N) - Linearithmic time
     * Sorts the array (uses built-in sort, typically O(N log N) in JS engines)
     */
    sortArray() {
      // Make a copy to avoid altering the original array
      const copy = [...this.array];
      copy.sort((a, b) => a - b);
      return copy;
    }
  
    /**
     * O(N^2) - Quadratic time
     * Naive bubble sort implementation
     */
    bubbleSort() {
      const copy = [...this.array];
      let swapped;
      do {
        swapped = false;
        for (let i = 0; i < copy.length - 1; i++) {
          if (copy[i] > copy[i + 1]) {
            // swap
            [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
            swapped = true;
          }
        }
      } while (swapped);
      return copy;
    }
  
    /**
     * Helper function to measure the execution time of a given function
     * @param {string} label - A descriptive label
     * @param {Function} fn - The function to measure
     * @param  {...any} args - Arguments to pass to the function being measured
     */
    measureTime(label, fn, ...args) {
      const start = performance.now();
      const result = fn.apply(this, args);
      const end = performance.now();
      console.log(`${label} took ${(end - start).toFixed(4)} ms`);
      return result;
    }
  }
  
  // DEMO
  
  // Change 10000 to experiment with different N values
  const demo = new TimeComplexitiesDemo(10000);
  
  // Measure O(1)
  demo.measureTime("O(1) getFirstElement", demo.getFirstElement);
  
  // Measure O(log N)
  demo.measureTime("O(log N) binarySearch (target = 9999)", demo.binarySearch, 9999);
  
  // Measure O(N)
  demo.measureTime("O(N) linearSum", demo.linearSum);
  
  // Measure O(N log N)
  demo.measureTime("O(N log N) sortArray", demo.sortArray);
  
  // Measure O(N^2)
  demo.measureTime("O(N^2) bubbleSort", demo.bubbleSort);
  