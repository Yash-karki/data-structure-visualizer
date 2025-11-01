// Enhanced Sorting Visualizer with improved animations and algorithms
// Integrated SortingAlgorithms class to eliminate dependencies

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

const defaultCompare = (a, b) => {
  if (a === b) return 0;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};

const partition = (array, left, right, compareFn, swaps) => {
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) i++;
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) j--;

    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];
      swaps.push({ firstPosition: i, lastPosition: j });
      i++;
      j--;
    }
  }
  return i;
};

class SortingAlgorithms {
  bubbleSort(array, compareFn = defaultCompare) {
    const swaps = [];
    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (compareFn(arr[j], arr[j + 1]) === Compare.BIGGER_THAN) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps.push({ firstPosition: j, lastPosition: j + 1 });
        }
      }
    }
    return { sortedArray: arr, swaps };
  }

  selectionSort(array, compareFn = defaultCompare) {
    const swaps = [];
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        if (compareFn(arr[j], arr[minIndex]) === Compare.LESS_THAN) {
          minIndex = j;
        }
      }

      if (i !== minIndex) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        swaps.push({ firstPosition: i, lastPosition: minIndex });
      }
    }
    return { sortedArray: arr, swaps };
  }

  quickSort(array, compareFn = defaultCompare) {
    const arr = [...array];
    const swaps = [];

    const innerQuickSort = (arr, left, right) => {
      let index;
      if (arr.length > 1) {
        index = partition(arr, left, right, compareFn, swaps);
        if (left < index - 1) innerQuickSort(arr, left, index - 1);
        if (index < right) innerQuickSort(arr, index, right);
      }
    };

    innerQuickSort(arr, 0, arr.length - 1);

    return { sortedArray: arr, swaps };
  }
}

class SortingVisualizer {
    constructor() {
        this.initializeElements();
        this.initializeState();
        this.initializeEventListeners();
        this.setupAlgorithmInfo();
        this.generateArray();
    }

    initializeElements() {
        this.selectAlgorithm = document.getElementById("selectAlgorithm");
        this.numbersBars = document.getElementById("numbersBars");
        this.generateBtn = document.getElementById("generateBtn");
        this.solveBtn = document.getElementById("solveBtn");
        this.pauseBtn = document.getElementById("pauseBtn");
        this.resetBtn = document.getElementById("resetBtn");
        this.customArrayInput = document.getElementById("customArray");
        this.setCustomBtn = document.getElementById("setCustomBtn");
        this.speedSlider = document.getElementById("speedSlider");
        this.speedValue = document.getElementById("speedValue");
        this.stage = document.getElementById("stage");
        this.doneMessage = document.getElementById("doneMessage");
        this.backBtn = document.getElementById("backBtn");
        this.stepInfo = document.getElementById("stepInfo");
        this.compCount = document.getElementById("compCount");
        this.swapCount = document.getElementById("swapCount");
        this.invCount = document.getElementById("invCount");
        this.finalComparisons = document.getElementById("finalComparisons");
        this.finalSwaps = document.getElementById("finalSwaps");
        this.finalInversions = document.getElementById("finalInversions");

        // Algorithm info elements
        this.algorithmName = document.getElementById("algorithmName");
        this.algorithmExplanation = document.getElementById("algorithmExplanation");
        this.bestCase = document.getElementById("bestCase");
        this.avgCase = document.getElementById("avgCase");
        this.worstCase = document.getElementById("worstCase");
        this.spaceComplexity = document.getElementById("spaceComplexity");
    }

    initializeState() {
        this.bars = [];
        this.originalArray = [];
        this.isRunning = false;
        this.isPaused = false;
        this.comparisons = 0;
        this.swaps = 0;
        this.inversions = 0;
        this.currentStep = 0;
        this.sortingAlgorithms = new SortingAlgorithms();
        this.maxBarValue = 0;
        
        this.speedMap = {
            1: { value: 1000, label: "Very Slow" },
            2: { value: 500, label: "Slow" },
            3: { value: 200, label: "Medium" },
            4: { value: 100, label: "Fast" },
            5: { value: 50, label: "Very Fast" }
        };
        
        this.speed = this.speedMap[3].value;
    }

    initializeEventListeners() {
        this.generateBtn.addEventListener("click", () => this.generateArray());
        this.solveBtn.addEventListener('click', () => this.startSorting());
        this.pauseBtn.addEventListener("click", () => this.togglePause());
        this.resetBtn.addEventListener("click", () => this.resetArray());
        this.setCustomBtn.addEventListener("click", () => this.setCustomArray());
        this.backBtn.addEventListener("click", () => window.location.href = "landing.html");
        
        this.speedSlider.addEventListener("input", () => this.updateSpeed());
        this.selectAlgorithm.addEventListener("change", () => this.updateAlgorithmInfo());
        
        // Input validation
        this.customArrayInput.addEventListener("input", () => this.validateCustomInput());
        this.numbersBars.addEventListener("input", () => this.validateNumberInput());
    }

    setupAlgorithmInfo() {
        this.algorithmData = {
            bubbleSort: {
                name: "Bubble Sort",
                explanation: "Compares adjacent elements and swaps them if they're in the wrong order. The largest element 'bubbles' to the end in each pass.",
                bestCase: "O(n)",
                avgCase: "O(n²)",
                worstCase: "O(n²)",
                space: "O(1)"
            },
            selectionSort: {
                name: "Selection Sort",
                explanation: "Finds the minimum element and places it at the beginning. Repeats for the remaining unsorted portion.",
                bestCase: "O(n²)",
                avgCase: "O(n²)",
                worstCase: "O(n²)",
                space: "O(1)"
            },
            insertionSort: {
                name: "Insertion Sort",
                explanation: "Builds the sorted array one element at a time by inserting each element into its correct position.",
                bestCase: "O(n)",
                avgCase: "O(n²)",
                worstCase: "O(n²)",
                space: "O(1)"
            },
            mergeSort: {
                name: "Merge Sort",
                explanation: "Divides the array into halves, sorts them recursively, then merges the sorted halves back together.",
                bestCase: "O(n log n)",
                avgCase: "O(n log n)",
                worstCase: "O(n log n)",
                space: "O(n)"
            },
            quickSort: {
                name: "Quick Sort",
                explanation: "Selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays.",
                bestCase: "O(n log n)",
                avgCase: "O(n log n)",
                worstCase: "O(n²)",
                space: "O(log n)"
            },
            heapSort: {
                name: "Heap Sort",
                explanation: "Builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted array.",
                bestCase: "O(n log n)",
                avgCase: "O(n log n)",
                worstCase: "O(n log n)",
                space: "O(1)"
            }
        };
        
        this.updateAlgorithmInfo();
    }

    updateAlgorithmInfo() {
        const algorithm = this.selectAlgorithm.value;
        const info = this.algorithmData[algorithm];
        
        this.algorithmName.textContent = info.name;
        this.algorithmExplanation.textContent = info.explanation;
        this.bestCase.textContent = info.bestCase;
        this.avgCase.textContent = info.avgCase;
        this.worstCase.textContent = info.worstCase;
        this.spaceComplexity.textContent = info.space;
    }

    updateSpeed() {
        const speedLevel = parseInt(this.speedSlider.value);
        this.speed = this.speedMap[speedLevel].value;
        this.speedValue.textContent = this.speedMap[speedLevel].label;
    }

    validateCustomInput() {
        const input = this.customArrayInput.value;
        const isValid = /^(\d+,?\s*)*\d*$/.test(input);
        
        if (!isValid && input.length > 0) {
            this.customArrayInput.style.borderColor = "#ff6b6b";
        } else {
            this.customArrayInput.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }
    }

    validateNumberInput() {
        const value = parseInt(this.numbersBars.value);
        if (value < 5) this.numbersBars.value = 5;
        if (value > 100) this.numbersBars.value = 100;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateArray() {
        if (this.isRunning) return;
        
        const size = parseInt(this.numbersBars.value) || 30;
        const array = Array.from({ length: size }, () => 
            Math.floor(Math.random() * 300 + 20)
        );
        
        this.createBars(array);
        this.resetStats();
        this.updateStepInfo("Array generated - Ready to sort");
        // compute and show current inversion count for generated array
        this.inversions = this.countInversionsArray(this.getArrayFromBars());
        if (this.invCount) this.invCount.textContent = this.inversions;
    }

    setCustomArray() {
        if (this.isRunning) return;
        
        const input = this.customArrayInput.value
            .split(",")
            .map(x => parseInt(x.trim()))
            .filter(x => !isNaN(x) && x > 0 && x <= 400);
        
        if (input.length === 0) {
            this.showError("Please enter valid numbers separated by commas");
            return;
        }
        
        if (input.length > 100) {
            this.showError("Maximum 100 elements allowed");
            return;
        }
        
        this.createBars(input);
        this.resetStats();
        this.updateStepInfo("Custom array set - Ready to sort");
        // compute and show current inversion count for custom array
        this.inversions = this.countInversionsArray(this.getArrayFromBars());
        if (this.invCount) this.invCount.textContent = this.inversions;
    }

    createBars(array) {
        this.stage.innerHTML = "";
        this.bars = [];
        this.originalArray = [...array];
        
        const maxVal = array.length ? Math.max(...array) : 1;
        this.maxBarValue = Math.max(maxVal, 1);
        const stageHeight = Math.max(this.stage.clientHeight - 40, 120);
        const availableWidth = this.stage.clientWidth || this.stage.parentElement?.clientWidth || window.innerWidth;
        const baseWidth = array.length ? (availableWidth - array.length * 2) / array.length : availableWidth;
        const computedWidth = Number.isFinite(baseWidth) ? baseWidth : 12;
        const barWidth = Math.max(8, Math.min(40, computedWidth));

        array.forEach((val, index) => {
            const bar = document.createElement("div");
            bar.className = "bar";

            if (barWidth >= 26) {
                bar.classList.add("bar-wide");
            }

            const height = this.maxBarValue ? (val / this.maxBarValue) * stageHeight : stageHeight;
            bar.style.height = `${Math.max(height, 6)}px`;
            bar.style.width = `${barWidth}px`;

            bar.dataset.value = val;
            bar.dataset.index = index;

            const label = document.createElement("span");
            label.className = "bar-label";
            label.textContent = val;
            bar.appendChild(label);

            this.stage.appendChild(bar);
            this.bars.push(bar);
        });
        
        this.doneMessage.classList.remove("show");
    }

    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.inversions = 0;
        this.compCount.textContent = "0";
        this.swapCount.textContent = "0";
        if (this.invCount) this.invCount.textContent = "0";
    }

    async startSorting() {
        this.isRunning = true;
        this.isPaused = false;
        this.solveBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.generateBtn.disabled = true;
        this.resetStats();
        
        // Clear any previous styling
        this.bars.forEach(bar => {
            bar.className = "bar";
        });
        
        const algorithm = this.selectAlgorithm.value;
        this.updateStepInfo(`Starting ${this.algorithmData[algorithm].name}...`);
        
        try {
            // freeze and show the real inversion count before sorting starts
            this.inversions = this.countInversionsArray(this.getArrayFromBars());
            if (this.invCount) this.invCount.textContent = this.inversions;

            await this[algorithm]();
            this.completeSorting();
        } catch (error) {
            console.error("Sorting error:", error);
            this.stopSorting();
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? "Resume" : "Pause";
        this.updateStepInfo(this.isPaused ? "Paused" : "Sorting...");
    }

    resetArray() {
        this.stopSorting();
        if (this.originalArray.length > 0) {
            this.createBars(this.originalArray);
            this.resetStats();
            this.updateStepInfo("Array reset - Ready to sort");
        }
    }

    updateStepInfo(message) {
        this.stepInfo.textContent = message;
    }

    showMessage(message, type = 'info') {
        console.log('Sorting - Showing message:', message); // Debug log
        this.stepInfo.textContent = message;
        this.stepInfo.className = `step-info ${type}`;
        
        // Clear any existing timeout
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        
        // Auto-remove message after 3 seconds
        this.messageTimeout = setTimeout(() => {
            console.log('Sorting - Auto-removing message'); // Debug log
            this.stepInfo.textContent = "Ready to sort";
            this.stepInfo.className = "step-info";
        }, 3000);
    }

    stopSorting() {
        this.isRunning = false;
        this.isPaused = false;
        this.solveBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = "Pause";
        this.generateBtn.disabled = false;
    }

    completeSorting() {
        this.stopSorting();
        
        // Mark all bars as sorted
        this.bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add("sorted");
            }, index * 50);
        });
        
        setTimeout(() => {
            this.finalComparisons.textContent = this.comparisons;
            this.finalSwaps.textContent = this.swaps;
            if (this.finalInversions) this.finalInversions.textContent = this.inversions;
            this.doneMessage.classList.add("show");
            this.updateStepInfo("Sorting completed!");
        }, this.bars.length * 50 + 500);
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitIfPaused() {
        while (this.isPaused && this.isRunning) {
            await this.sleep(100);
        }
    }

    async highlightComparison(indices, type = "comparing") {
        await this.waitIfPaused();
        if (!this.isRunning) return;
        
        indices.forEach(i => {
            if (this.bars[i]) {
                this.bars[i].classList.add(type);
            }
        });
        
        this.comparisons++;
        this.compCount.textContent = this.comparisons;
        
        await this.sleep(this.speed);
        
        indices.forEach(i => {
            if (this.bars[i]) {
                this.bars[i].classList.remove(type);
            }
        });
    }

    async swap(i, j) {
        if (!this.bars[i] || !this.bars[j]) return;
        
        // Highlight swapping bars
        this.bars[i].classList.add("swapping");
        this.bars[j].classList.add("swapping");
        
        // Swap the DOM elements
        const barA = this.bars[i];
        const barB = this.bars[j];
        const labelA = barA.querySelector('.bar-label');
        const labelB = barB.querySelector('.bar-label');
        
        const tempHeight = barA.style.height;
        const valueA = barA.dataset.value;
        const valueB = barB.dataset.value;

        barA.style.height = barB.style.height;
        barA.dataset.value = valueB;
        if (labelA) labelA.textContent = valueB;
        
        barB.style.height = tempHeight;
        barB.dataset.value = valueA;
        if (labelB) labelB.textContent = valueA;
        
        this.swaps++;
        this.swapCount.textContent = this.swaps;
        
        await this.sleep(this.speed);
        
        this.bars[i].classList.remove("swapping");
        this.bars[j].classList.remove("swapping");
    }

    // Sorting Algorithms Implementation
    async bubbleSort() {
        const n = this.bars.length;
        
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            this.updateStepInfo(`Bubble Sort - Pass ${i + 1}/${n - 1}`);
            
            for (let j = 0; j < n - i - 1; j++) {
                if (!this.isRunning) return;
                
                await this.highlightComparison([j, j + 1]);
                
                const val1 = parseInt(this.bars[j].dataset.value);
                const val2 = parseInt(this.bars[j + 1].dataset.value);
                
                if (val1 > val2) {
                    await this.swap(j, j + 1);
                    swapped = true;
                }
            }
            
            // Mark the last element as sorted
            this.bars[n - i - 1].classList.add("sorted");
            
            if (!swapped) break; // Early termination if array is sorted
        }
        
        this.bars[0].classList.add("sorted");
    }

    async selectionSort() {
        const n = this.bars.length;
        
        for (let i = 0; i < n; i++) {
            this.updateStepInfo(`Selection Sort - Finding minimum ${i + 1}/${n}`);
            
            let minIndex = i;
            this.bars[minIndex].classList.add("pivot");
            
            for (let j = i + 1; j < n; j++) {
                if (!this.isRunning) return;
                
                await this.highlightComparison([j, minIndex]);
                
                const valJ = parseInt(this.bars[j].dataset.value);
                const valMin = parseInt(this.bars[minIndex].dataset.value);
                
                if (valJ < valMin) {
                    this.bars[minIndex].classList.remove("pivot");
                    minIndex = j;
                    this.bars[minIndex].classList.add("pivot");
                }
            }
            
            if (minIndex !== i) {
                await this.swap(i, minIndex);
            }
            
            this.bars[minIndex].classList.remove("pivot");
            this.bars[i].classList.add("sorted");
        }
    }

    async insertionSort() {
        const n = this.bars.length;
        this.bars[0].classList.add("sorted");
        
        for (let i = 1; i < n; i++) {
            this.updateStepInfo(`Insertion Sort - Inserting element ${i + 1}/${n}`);
            
            let j = i;
            this.bars[j].classList.add("pivot");
            
            while (j > 0) {
                if (!this.isRunning) return;
                
                await this.highlightComparison([j - 1, j]);
                
                const val1 = parseInt(this.bars[j - 1].dataset.value);
                const val2 = parseInt(this.bars[j].dataset.value);
                
                if (val1 > val2) {
                    await this.swap(j - 1, j);
                    j--;
                } else {
                    break;
                }
            }
            
            this.bars[j].classList.remove("pivot");
            this.bars[i].classList.add("sorted");
        }
    }

    async mergeSort(start = 0, end = this.bars.length - 1) {
        if (start >= end) return;
        
        const mid = Math.floor((start + end) / 2);
        
        this.updateStepInfo(`Merge Sort - Dividing array [${start}...${end}]`);
        
        await this.mergeSort(start, mid);
        await this.mergeSort(mid + 1, end);
        await this.merge(start, mid, end);
    }

    async merge(start, mid, end) {
        if (!this.isRunning) return;
        
        this.updateStepInfo(`Merge Sort - Merging [${start}...${mid}] and [${mid + 1}...${end}]`);
        
        // Highlight the range being merged
        for (let i = start; i <= end; i++) {
            this.bars[i].classList.add("comparing");
        }
        
        await this.sleep(this.speed);
        
        const leftArray = [];
        const rightArray = [];
        
        for (let i = start; i <= mid; i++) {
            leftArray.push(parseInt(this.bars[i].dataset.value));
        }
        for (let i = mid + 1; i <= end; i++) {
            rightArray.push(parseInt(this.bars[i].dataset.value));
        }
        
        let i = 0, j = 0, k = start;
        
        while (i < leftArray.length && j < rightArray.length) {
            if (!this.isRunning) return;
            
            this.comparisons++;
            this.compCount.textContent = this.comparisons;
            
            if (leftArray[i] <= rightArray[j]) {
                await this.updateBarValue(k, leftArray[i]);
                i++;
            } else {
                await this.updateBarValue(k, rightArray[j]);
                j++;
            }
            k++;
        }
        
        while (i < leftArray.length) {
            if (!this.isRunning) return;
            await this.updateBarValue(k, leftArray[i]);
            i++;
            k++;
        }
        
        while (j < rightArray.length) {
            if (!this.isRunning) return;
            await this.updateBarValue(k, rightArray[j]);
            j++;
            k++;
        }
        
        // Remove highlighting
        for (let i = start; i <= end; i++) {
            this.bars[i].classList.remove("comparing");
        }
    }

    async updateBarValue(index, value) {
        const bar = this.bars[index];
        const stageHeight = Math.max(this.stage.clientHeight - 40, 120);
        const maxVal = this.maxBarValue || value;
        const height = maxVal ? (value / maxVal) * stageHeight : stageHeight;
        
        bar.style.height = `${Math.max(height, 6)}px`;
        bar.dataset.value = value;

        const label = bar.querySelector('.bar-label');
        if (label) {
            label.textContent = value;
        }
        
        this.bars[index].classList.add("swapping");
        await this.sleep(this.speed / 2);
        this.bars[index].classList.remove("swapping");
    }

    async quickSort(low = 0, high = this.bars.length - 1) {
        if (low < high) {
            this.updateStepInfo(`Quick Sort - Partitioning [${low}...${high}]`);
            
            const pivotIndex = await this.partition(low, high);
            await this.quickSort(low, pivotIndex - 1);
            await this.quickSort(pivotIndex + 1, high);
        }
    }

    async partition(low, high) {
        if (!this.isRunning) return low;
        
        const pivot = parseInt(this.bars[high].dataset.value);
        this.bars[high].classList.add("pivot");
        
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (!this.isRunning) return i + 1;
            
            await this.highlightComparison([j, high]);
            
            const valJ = parseInt(this.bars[j].dataset.value);
            
            if (valJ < pivot) {
                i++;
                if (i !== j) {
                    await this.swap(i, j);
                }
            }
        }
        
        await this.swap(i + 1, high);
        this.bars[high].classList.remove("pivot");
        this.bars[i + 1].classList.add("sorted");
        
        return i + 1;
    }

    async heapSort() {
        const n = this.bars.length;
        
        // Build max heap
        this.updateStepInfo("Heap Sort - Building max heap");
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            this.updateStepInfo(`Heap Sort - Extracting maximum ${n - i}/${n}`);
            
            await this.swap(0, i);
            this.bars[i].classList.add("sorted");
            
            await this.heapify(i, 0);
        }
        
        this.bars[0].classList.add("sorted");
    }

    async heapify(n, i) {
        if (!this.isRunning) return;
        
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n) {
            await this.highlightComparison([left, largest]);
            const valLeft = parseInt(this.bars[left].dataset.value);
            const valLargest = parseInt(this.bars[largest].dataset.value);
            
            if (valLeft > valLargest) {
                largest = left;
            }
        }
        
        if (right < n) {
            await this.highlightComparison([right, largest]);
            const valRight = parseInt(this.bars[right].dataset.value);
            const valLargest = parseInt(this.bars[largest].dataset.value);
            
            if (valRight > valLargest) {
                largest = right;
            }
        }
        
        if (largest !== i) {
            await this.swap(i, largest);
            await this.heapify(n, largest);
        }
    }

    // Helpers: compute inversion count non-visually for an array snapshot
    getArrayFromBars() {
        return Array.from(this.bars).map(bar => parseInt(bar.dataset.value));
    }

    countInversionsArray(arr) {
        const temp = new Array(arr.length);
        const mergeCount = (left, mid, right) => {
            let i = left, j = mid + 1, k = left, inv = 0;
            while (i <= mid && j <= right) {
                if (arr[i] <= arr[j]) temp[k++] = arr[i++];
                else {
                    temp[k++] = arr[j++];
                    inv += (mid - i + 1);
                }
            }
            while (i <= mid) temp[k++] = arr[i++];
            while (j <= right) temp[k++] = arr[j++];
            for (let t = left; t <= right; t++) arr[t] = temp[t];
            return inv;
        };
        const sortCount = (left, right) => {
            if (left >= right) return 0;
            const mid = Math.floor((left + right) / 2);
            let inv = 0;
            inv += sortCount(left, mid);
            inv += sortCount(mid + 1, right);
            inv += mergeCount(left, mid, right);
            return inv;
        };
        return sortCount(0, arr.length - 1);
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});
