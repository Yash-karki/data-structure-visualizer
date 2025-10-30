// Enhanced Searching Algorithm Visualizer
class SearchingVisualizer {
    constructor() {
        this.initializeElements();
        this.initializeState();
        this.initializeEventListeners();
        this.setupAlgorithmInfo();
        this.generateArray();
    }

    initializeElements() {
        this.selectAlgorithm = document.getElementById("selectAlgorithm");
        this.arraySize = document.getElementById("arraySize");
        this.searchValue = document.getElementById("searchValue");
        this.generateBtn = document.getElementById("generateBtn");
        this.shuffleBtn = document.getElementById("shuffleBtn");
        this.searchBtn = document.getElementById("searchBtn");
        this.pauseBtn = document.getElementById("pauseBtn");
        this.resetBtn = document.getElementById("resetBtn");
        this.customArrayInput = document.getElementById("customArray");
        this.setCustomBtn = document.getElementById("setCustomBtn");
        this.speedSlider = document.getElementById("speedSlider");
        this.speedValue = document.getElementById("speedValue");
        this.arrayStage = document.getElementById("arrayStage");
        this.resultMessage = document.getElementById("resultMessage");
        this.backBtn = document.getElementById("backBtn");
        this.stepInfo = document.getElementById("stepInfo");
        this.compCount = document.getElementById("compCount");
        this.targetDisplay = document.getElementById("targetDisplay");
        this.currentRange = document.getElementById("currentRange");
        this.currentStep = document.getElementById("currentStep");
        this.finalComparisons = document.getElementById("finalComparisons");
        this.foundPosition = document.getElementById("foundPosition");
        this.resultIcon = document.getElementById("resultIcon");
        this.resultText = document.getElementById("resultText");

        // Algorithm info elements
        this.algorithmName = document.getElementById("algorithmName");
        this.algorithmExplanation = document.getElementById("algorithmExplanation");
        this.bestCase = document.getElementById("bestCase");
        this.avgCase = document.getElementById("avgCase");
        this.worstCase = document.getElementById("worstCase");
        this.spaceComplexity = document.getElementById("spaceComplexity");
        this.requirements = document.getElementById("requirements");
    }

    initializeState() {
        this.elements = [];
        this.array = [];
        this.isRunning = false;
        this.isPaused = false;
        this.comparisons = 0;
        this.foundIndex = -1;
        this.isSorted = true;
        
        this.speedMap = {
            1: { value: 2000, label: "Very Slow" },
            2: { value: 1000, label: "Slow" },
            3: { value: 500, label: "Medium" },
            4: { value: 250, label: "Fast" },
            5: { value: 100, label: "Very Fast" }
        };
        
        this.speed = this.speedMap[3].value;
    }

    initializeEventListeners() {
        this.generateBtn.addEventListener("click", () => this.generateArray());
        this.shuffleBtn.addEventListener("click", () => this.shuffleArray());
        this.searchBtn.addEventListener("click", () => this.startSearch());
        this.pauseBtn.addEventListener("click", () => this.togglePause());
        this.resetBtn.addEventListener("click", () => this.resetSearch());
        this.setCustomBtn.addEventListener("click", () => this.setCustomArray());
        this.backBtn.addEventListener("click", () => window.location.href = "landing.html");
        
        this.speedSlider.addEventListener("input", () => this.updateSpeed());
        this.selectAlgorithm.addEventListener("change", () => this.updateAlgorithmInfo());
        this.searchValue.addEventListener("input", () => this.updateTarget());
        
        // Input validation
        this.customArrayInput.addEventListener("input", () => this.validateCustomInput());
        this.arraySize.addEventListener("input", () => this.validateSizeInput());
        this.searchValue.addEventListener("input", () => this.validateSearchInput());
    }

    setupAlgorithmInfo() {
        this.algorithmData = {
            linearSearch: {
                name: "Linear Search",
                explanation: "Checks each element one by one from the beginning until the target is found or the end is reached. Works on both sorted and unsorted arrays.",
                bestCase: "O(1)",
                avgCase: "O(n)",
                worstCase: "O(n)",
                space: "O(1)",
                requirements: "Works on both sorted and unsorted arrays",
                needsSorted: false
            },
            binarySearch: {
                name: "Binary Search",
                explanation: "Divides the sorted array in half repeatedly, comparing the target with the middle element to eliminate half of the remaining elements.",
                bestCase: "O(1)",
                avgCase: "O(log n)",
                worstCase: "O(log n)",
                space: "O(1)",
                requirements: "Requires a SORTED array",
                needsSorted: true
            },
            jumpSearch: {
                name: "Jump Search",
                explanation: "Jumps ahead by fixed steps to find a range where the target might exist, then performs linear search within that range.",
                bestCase: "O(1)",
                avgCase: "O(√n)",
                worstCase: "O(√n)",
                space: "O(1)",
                requirements: "Requires a SORTED array",
                needsSorted: true
            },
            exponentialSearch: {
                name: "Exponential Search",
                explanation: "Finds the range where the target exists by doubling the index, then performs binary search within that range.",
                bestCase: "O(1)",
                avgCase: "O(log n)",
                worstCase: "O(log n)",
                space: "O(1)",
                requirements: "Requires a SORTED array",
                needsSorted: true
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
        this.requirements.textContent = info.requirements;
        
        // Update UI based on sorting requirement
        if (info.needsSorted && !this.isSorted) {
            this.requirements.style.color = "#ff7675";
            this.requirements.textContent += " - Array needs to be sorted!";
        } else {
            this.requirements.style.color = "#e0e6ed";
        }
    }

    updateSpeed() {
        const speedLevel = parseInt(this.speedSlider.value);
        this.speed = this.speedMap[speedLevel].value;
        this.speedValue.textContent = this.speedMap[speedLevel].label;
    }

    updateTarget() {
        const value = this.searchValue.value;
        this.targetDisplay.textContent = value || "?";
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

    validateSizeInput() {
        const value = parseInt(this.arraySize.value);
        if (value < 5) this.arraySize.value = 5;
        if (value > 50) this.arraySize.value = 50;
    }

    validateSearchInput() {
        const value = parseInt(this.searchValue.value);
        if (value < 1) this.searchValue.value = 1;
        if (value > 100) this.searchValue.value = 100;
        this.updateTarget();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateArray() {
        if (this.isRunning) return;
        
        const size = parseInt(this.arraySize.value) || 20;
        this.array = Array.from({ length: size }, (_, i) => (i + 1) * 2 + Math.floor(Math.random() * 3));
        this.array.sort((a, b) => a - b);
        this.isSorted = true;
        
        this.createElements();
        this.resetStats();
        this.updateStepInfo("Sorted array generated - Ready to search");
        this.updateAlgorithmInfo();
    }

    shuffleArray() {
        if (this.isRunning) return;
        
        // Fisher-Yates shuffle
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
        
        this.isSorted = false;
        this.createElements();
        this.resetStats();
        this.updateStepInfo("Array shuffled - Only Linear Search will work");
        this.updateAlgorithmInfo();
    }

    async sortArray() {
        this.updateStepInfo("Sorting array for binary search...");
        
        // Simple bubble sort with animation
        for (let i = 0; i < this.array.length - 1; i++) {
            for (let j = 0; j < this.array.length - i - 1; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    // Swap
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                }
            }
        }
        
        this.createElements();
        this.updateStepInfo("Array sorted - Ready for binary search");
    }

    setCustomArray() {
        if (this.isRunning) return;
        
        const input = this.customArrayInput.value
            .split(",")
            .map(x => parseInt(x.trim()))
            .filter(x => !isNaN(x) && x > 0 && x <= 100);
        
        if (input.length === 0) {
            this.showError("Please enter valid numbers separated by commas");
            return;
        }
        
        if (input.length > 50) {
            this.showError("Maximum 50 elements allowed");
            return;
        }
        
        this.array = input;
        this.isSorted = this.isArraySorted(this.array);
        
        this.createElements();
        this.resetStats();
        this.updateStepInfo(`Custom array set - ${this.isSorted ? 'Sorted' : 'Unsorted'}`);
        this.updateAlgorithmInfo();
    }

    isArraySorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }

    createElements() {
        this.arrayStage.innerHTML = "";
        this.elements = [];
        
        this.array.forEach((val, index) => {
            const element = document.createElement("div");
            element.classList.add("array-element");
            element.textContent = val;
            element.dataset.value = val;
            element.dataset.index = index;
            
            // Add animation delay for smooth appearance
            element.style.animationDelay = `${index * 50}ms`;
            
            this.arrayStage.appendChild(element);
            this.elements.push(element);
        });
        
        this.resultMessage.classList.remove("show", "not-found");
    }

    resetStats() {
        this.comparisons = 0;
        this.foundIndex = -1;
        this.compCount.textContent = "0";
        this.currentRange.textContent = `Searching in range: [0, ${this.array.length - 1}]`;
        this.currentStep.textContent = "Click 'Start Search' to begin";
    }

    updateStepInfo(message) {
        this.stepInfo.textContent = message;
    }

    showMessage(message, type = 'info') {
        console.log('Searching - Showing message:', message); // Debug log
        this.stepInfo.textContent = message;
        this.stepInfo.className = `step-info ${type}`;
        
        // Clear any existing timeout
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        
        // Auto-remove message after 3 seconds
        this.messageTimeout = setTimeout(() => {
            console.log('Searching - Auto-removing message'); // Debug log
            this.stepInfo.textContent = "Ready to search";
            this.stepInfo.className = "step-info";
        }, 3000);
    }

    showError(message) {
        this.showMessage(`Error: ${message}`, 'error');
    }

    async startSearch() {
        if (this.isRunning) return;
        
        const target = parseInt(this.searchValue.value);
        if (isNaN(target)) {
            this.showError("Please enter a valid search value");
            return;
        }
        
        const algorithm = this.selectAlgorithm.value;
        const info = this.algorithmData[algorithm];
        
        if (info.needsSorted && !this.isSorted) {
            this.updateStepInfo("Array must be sorted. Sorting automatically...");
            await this.sortArray();
            this.isSorted = true;
            this.updateAlgorithmInfo();
        }
        
        this.isRunning = true;
        this.isPaused = false;
        this.searchBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.generateBtn.disabled = true;
        this.resetStats();
        
        // Clear any previous styling
        this.elements.forEach(element => {
            element.className = "array-element";
        });
        
        this.updateStepInfo(`Starting ${info.name}...`);
        
        try {
            const result = await this[algorithm](target);
            this.completeSearch(result, target);
        } catch (error) {
            console.error("Search error:", error);
            this.stopSearch();
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? "Resume" : "Pause";
        this.updateStepInfo(this.isPaused ? "Paused" : "Searching...");
    }

    resetSearch() {
        this.stopSearch();
        this.createElements();
        this.resetStats();
        this.updateStepInfo("Search reset - Ready to search");
    }

    stopSearch() {
        this.isRunning = false;
        this.isPaused = false;
        this.searchBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = "Pause";
        this.generateBtn.disabled = false;
    }

    completeSearch(result, target) {
        this.stopSearch();
        
        this.finalComparisons.textContent = this.comparisons;
        this.foundPosition.textContent = result.found ? result.index : "Not found";
        
        if (result.found) {
            this.resultIcon.textContent = "🎯";
            this.resultText.textContent = `Found ${target} at position ${result.index}!`;
            this.resultMessage.classList.remove("not-found");
            this.elements[result.index].classList.add("found");
        } else {
            this.resultIcon.textContent = "❌";
            this.resultText.textContent = `${target} not found in array`;
            this.resultMessage.classList.add("not-found");
        }
        
        setTimeout(() => {
            this.resultMessage.classList.add("show");
        }, 500);
        
        this.updateStepInfo("Search completed!");
    }

    async waitIfPaused() {
        while (this.isPaused && this.isRunning) {
            await this.sleep(100);
        }
    }

    async highlightElement(index, className = "current") {
        await this.waitIfPaused();
        if (!this.isRunning || !this.elements[index]) return;
        
        this.elements[index].classList.add(className);
        this.comparisons++;
        this.compCount.textContent = this.comparisons;
        
        await this.sleep(this.speed);
    }

    async unhighlightElement(index, className = "current") {
        if (this.elements[index]) {
            this.elements[index].classList.remove(className);
        }
    }

    async markChecked(index) {
        if (this.elements[index]) {
            this.elements[index].classList.add("checked");
        }
    }

    async highlightRange(start, end) {
        for (let i = start; i <= end; i++) {
            if (this.elements[i]) {
                this.elements[i].classList.add("in-range");
            }
        }
        this.currentRange.textContent = `Searching in range: [${start}, ${end}]`;
    }

    async clearRange() {
        this.elements.forEach(element => {
            element.classList.remove("in-range");
        });
    }

    // Search Algorithms Implementation
    async linearSearch(target) {
        this.currentStep.textContent = "Checking each element from left to right...";
        
        for (let i = 0; i < this.array.length; i++) {
            if (!this.isRunning) return { found: false, index: -1 };
            
            this.currentStep.textContent = `Checking element at position ${i}: ${this.array[i]}`;
            
            await this.highlightElement(i);
            
            if (this.array[i] === target) {
                this.currentStep.textContent = `Found target ${target} at position ${i}!`;
                return { found: true, index: i };
            }
            
            await this.unhighlightElement(i);
            await this.markChecked(i);
        }
        
        this.currentStep.textContent = `Target ${target} not found in the array`;
        return { found: false, index: -1 };
    }

    async binarySearch(target) {
        let left = 0;
        let right = this.array.length - 1;
        
        while (left <= right) {
            if (!this.isRunning) return { found: false, index: -1 };
            
            await this.clearRange();
            await this.highlightRange(left, right);
            
            const mid = Math.floor((left + right) / 2);
            
            this.currentStep.textContent = `Checking middle element at position ${mid}: ${this.array[mid]}`;
            
            await this.highlightElement(mid, "pivot");
            await this.sleep(this.speed);
            
            if (this.array[mid] === target) {
                this.currentStep.textContent = `Found target ${target} at position ${mid}!`;
                await this.unhighlightElement(mid, "pivot");
                return { found: true, index: mid };
            }
            
            if (this.array[mid] < target) {
                this.currentStep.textContent = `${this.array[mid]} < ${target}, searching right half`;
                // Mark left half as checked
                for (let i = left; i <= mid; i++) {
                    await this.markChecked(i);
                }
                left = mid + 1;
            } else {
                this.currentStep.textContent = `${this.array[mid]} > ${target}, searching left half`;
                // Mark right half as checked
                for (let i = mid; i <= right; i++) {
                    await this.markChecked(i);
                }
                right = mid - 1;
            }
            
            await this.unhighlightElement(mid, "pivot");
            await this.sleep(this.speed);
        }
        
        this.currentStep.textContent = `Target ${target} not found in the array`;
        return { found: false, index: -1 };
    }

    async jumpSearch(target) {
        const n = this.array.length;
        const step = Math.floor(Math.sqrt(n));
        let prev = 0;
        
        this.currentStep.textContent = `Jump size: ${step}. Jumping through array...`;
        
        // Find the block where element is present
        while (this.array[Math.min(step, n) - 1] < target) {
            if (!this.isRunning) return { found: false, index: -1 };
            
            await this.highlightElement(Math.min(step, n) - 1, "pivot");
            this.currentStep.textContent = `Checking position ${Math.min(step, n) - 1}: ${this.array[Math.min(step, n) - 1]} < ${target}, jumping forward`;
            
            // Mark the jumped section as checked
            for (let i = prev; i < Math.min(step, n); i++) {
                await this.markChecked(i);
            }
            
            await this.unhighlightElement(Math.min(step, n) - 1, "pivot");
            
            prev = step;
            step += Math.floor(Math.sqrt(n));
            
            if (prev >= n) {
                this.currentStep.textContent = `Reached end of array. Target ${target} not found`;
                return { found: false, index: -1 };
            }
            
            await this.sleep(this.speed);
        }
        
        // Linear search in the identified block
        this.currentStep.textContent = `Found potential block. Doing linear search from position ${prev}...`;
        await this.highlightRange(prev, Math.min(step, n) - 1);
        
        while (prev < Math.min(step, n)) {
            if (!this.isRunning) return { found: false, index: -1 };
            
            this.currentStep.textContent = `Checking position ${prev}: ${this.array[prev]}`;
            
            await this.highlightElement(prev);
            
            if (this.array[prev] === target) {
                this.currentStep.textContent = `Found target ${target} at position ${prev}!`;
                return { found: true, index: prev };
            }
            
            await this.unhighlightElement(prev);
            await this.markChecked(prev);
            prev++;
        }
        
        this.currentStep.textContent = `Target ${target} not found in the array`;
        return { found: false, index: -1 };
    }

    async exponentialSearch(target) {
        const n = this.array.length;
        
        // If element is at first position
        if (this.array[0] === target) {
            await this.highlightElement(0);
            this.currentStep.textContent = `Found target ${target} at position 0!`;
            return { found: true, index: 0 };
        }
        
        // Find range for binary search by repeated doubling
        let i = 1;
        this.currentStep.textContent = "Finding range by doubling the index...";
        
        while (i < n && this.array[i] <= target) {
            if (!this.isRunning) return { found: false, index: -1 };
            
            await this.highlightElement(i, "pivot");
            this.currentStep.textContent = `Checking position ${i}: ${this.array[i]} <= ${target}, doubling index`;
            
            // Mark previous range as checked
            for (let j = Math.floor(i / 2); j < i; j++) {
                await this.markChecked(j);
            }
            
            await this.unhighlightElement(i, "pivot");
            i *= 2;
            await this.sleep(this.speed);
        }
        
        // Binary search in the found range
        const left = Math.floor(i / 2);
        const right = Math.min(i, n - 1);
        
        this.currentStep.textContent = `Range found: [${left}, ${right}]. Starting binary search...`;
        await this.highlightRange(left, right);
        await this.sleep(this.speed);
        
        return await this.binarySearchRange(target, left, right);
    }

    async binarySearchRange(target, left, right) {
        while (left <= right) {
            if (!this.isRunning) return { found: false, index: -1 };
            
            const mid = Math.floor((left + right) / 2);
            
            this.currentStep.textContent = `Binary search: checking position ${mid}: ${this.array[mid]}`;
            
            await this.highlightElement(mid, "pivot");
            await this.sleep(this.speed);
            
            if (this.array[mid] === target) {
                this.currentStep.textContent = `Found target ${target} at position ${mid}!`;
                await this.unhighlightElement(mid, "pivot");
                return { found: true, index: mid };
            }
            
            if (this.array[mid] < target) {
                this.currentStep.textContent = `${this.array[mid]} < ${target}, searching right half`;
                for (let i = left; i <= mid; i++) {
                    await this.markChecked(i);
                }
                left = mid + 1;
            } else {
                this.currentStep.textContent = `${this.array[mid]} > ${target}, searching left half`;
                for (let i = mid; i <= right; i++) {
                    await this.markChecked(i);
                }
                right = mid - 1;
            }
            
            await this.unhighlightElement(mid, "pivot");
            await this.sleep(this.speed);
        }
        
        this.currentStep.textContent = `Target ${target} not found in the range`;
        return { found: false, index: -1 };
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SearchingVisualizer();
});
