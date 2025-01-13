class SpaceComplexitiesDemo {
    /**
     * Creates an array to be used in the methods
     * @param {number} N 
     */
    constructor(N) {
      this.N = N;
      this.array = Array.from({ length: N }, (_, i) => i);
    }
  
    /**
     * O(1) space:
     * We only do in-place operations, using a constant amount of extra memory.
     * Example: in-place sum with a single counter variable.
     */
    constantSpaceOperation() {
      let sum = 0;
      for (let i = 0; i < this.array.length; i++) {
        sum += this.array[i];
      }
      return sum;
    }
  
    /**
     * O(log N) space:
     * Demonstrated by a recursive binary search.
     * The call stack grows in proportion to log(N).
     */
    logNSpaceOperation(target) {
      const binarySearchRecursive = (arr, low, high, t) => {
        if (low > high) {
          return -1;
        }
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === t) {
          return mid;
        } else if (arr[mid] < t) {
          return binarySearchRecursive(arr, mid + 1, high, t);
        } else {
          return binarySearchRecursive(arr, low, mid - 1, t);
        }
      };
      // Each recursive call adds to the call stack (O(log N) depth)
      return binarySearchRecursive(this.array, 0, this.array.length - 1, target);
    }
  
    /**
     * O(N) space:
     * Demonstrated by creating a new array of size N.
     * We allocate *additional* memory proportional to N.
     */
    linearSpaceOperation() {
      const newArray = [];
      for (let i = 0; i < this.array.length; i++) {
        // just some arbitrary operation
        newArray[i] = this.array[i] * 2;
      }
      return newArray;
    }
  
    /**
     * O(N log N) space:
     * Demonstrated by a Merge Sort implementation.
     * Merge Sort requires O(N) additional space *at each level* of recursion,
     * but the recursion tree has O(log N) levels, leading to O(N) total *peak* usage.
     *
     * (Strictly speaking, classic Merge Sort is O(N) *auxiliary* space overall,
     * but in a typical implementation, we see O(N log N) for the total amount
     * allocated and freed during the recursion’s entire lifetime. The peak is O(N).)
     *
     * To keep it conceptually aligned with typical discussions: 
     * we'll just demonstrate that mergesort needs *additional arrays* while it runs.
     */
    mergeSortOperation(arr = this.array) {
      if (arr.length < 2) {
        return arr;
      }
  
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
  
      return this._merge(this.mergeSortOperation(left), this.mergeSortOperation(right));
    }
  
    _merge(left, right) {
      let result = [];
      let i = 0;
      let j = 0;
  
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
  
      return result.concat(left.slice(i)).concat(right.slice(j));
    }
  
    /**
     * O(N^2) space:
     * Demonstrated by creating an NxN 2D matrix.
     * We’ll fill it with some arbitrary values to illustrate the idea.
     */
    quadraticSpaceOperation() {
      const matrix = [];
      for (let i = 0; i < this.N; i++) {
        const row = new Array(this.N).fill(0);
        matrix.push(row);
      }
      return matrix;
    }
  
  }
  
  // DEMO

  const demo = new SpaceComplexitiesDemo(10000);
  
  // 1) O(1) space
  const constResult = demo.constantSpaceOperation();
  
  // 2) O(log N) space (recursive binary search)
  const logNResult = demo.logNSpaceOperation(N - 1);
  
  // 3) O(N) space
  const newArray = demo.linearSpaceOperation();
  
  // 4) O(N log N) space (Merge Sort)
  const sortedArray = demo.mergeSortOperation();
  
  // 5) O(N^2) space
  const matrix = demo.quadraticSpaceOperation();
  
  console.log({
    constResult,
    logNResult,
    newArraySample: newArray.slice(0, 10),
    sortedArraySample: sortedArray.slice(0, 10),
    matrixSample: matrix[0]?.slice(0, 10),
  });
  