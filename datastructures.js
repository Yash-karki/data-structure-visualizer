// Data Structure Visualizer - Modular Architecture
class DataStructureVisualizer {
    constructor() {
        this.initializeElements();
        this.initializeState();
        this.initializeEventListeners();
        this.setupDataStructureInfo();
        this.updateDataStructure();
        this.initializeModules();
    }
    
    initializeModules() {
        // Feature flags for modular functionality
        this.features = {
            array: true,
            stack: true,
            queue: true,
            linkedList: true,
            binaryTree: true,
            bst: true,
            memoryView: true,
            codeView: true,
            traversal: true,
            animations: true
        };
        
        // Module registry for dynamic loading
        this.modules = new Map();
        this.registerModules();
    }
    
    registerModules() {
        // Register data structure modules with safe instantiation
        try {
            if (this.features.array) {
                this.modules.set('array', {
                    insert: this.insertArray.bind(this),
                    delete: this.deleteArray.bind(this),
                    search: this.searchLinear.bind(this),
                    traverse: this.traverseLinear.bind(this),
                    render: this.renderArray.bind(this)
                });
            }
            if (this.features.stack) {
                this.modules.set('stack', {
                    insert: this.insertStack.bind(this),
                    delete: this.deleteStack.bind(this),
                    search: this.peekStack.bind(this),
                    traverse: this.traverseStack.bind(this),
                    render: this.renderStack.bind(this)
                });
            }
            if (this.features.queue) {
                this.modules.set('queue', {
                    insert: this.insertQueue.bind(this),
                    delete: this.deleteQueue.bind(this),
                    search: this.peekQueue.bind(this),
                    traverse: this.traverseLinear.bind(this),
                    render: this.renderQueue.bind(this)
                });
            }
            if (this.features.linkedList) {
                this.modules.set('linkedList', {
                    insert: this.insertLinkedList.bind(this),
                    delete: this.deleteLinkedList.bind(this),
                    search: this.searchLinkedList.bind(this),
                    traverse: this.traverseLinkedList.bind(this),
                    render: this.renderLinkedList.bind(this)
                });
            }
            if (this.features.binaryTree) {
                this.modules.set('binaryTree', {
                    insert: this.insertBinaryTree.bind(this),
                    delete: this.deleteBST.bind(this),
                    search: this.searchTree.bind(this),
                    traverse: this.traverseTree.bind(this),
                    render: this.renderBinaryTree.bind(this)
                });
            }
            if (this.features.bst) {
                this.modules.set('bst', {
                    insert: this.insertBST.bind(this),
                    delete: this.deleteBST.bind(this),
                    search: this.searchTree.bind(this),
                    traverse: this.traverseTree.bind(this),
                    render: this.renderBinaryTree.bind(this)
                });
            }
        } catch (error) {
            console.warn('Some modules failed to register:', error);
        }
    }
    
    // Safe module execution with fallbacks
    executeModuleMethod(moduleName, methodName, ...args) {
        try {
            const module = this.modules.get(moduleName);
            if (module && typeof module[methodName] === 'function') {
                return module[methodName](...args);
            } else {
                this.showMessage(`Operation not supported for ${moduleName}`, "⚠️");
                return Promise.resolve();
            }
        } catch (error) {
            console.error(`Error in ${moduleName}.${methodName}:`, error);
            this.showMessage(`Error in ${moduleName} operation`, "❌");
            return Promise.resolve();
        }
    }

    initializeElements() {
        this.selectDataStructure = document.getElementById("selectDataStructure");
        this.operationValue = document.getElementById("operationValue");
        this.positionValue = document.getElementById("positionValue");
        this.positionGroup = document.getElementById("positionGroup");
        this.insertBtn = document.getElementById("insertBtn");
        this.deleteBtn = document.getElementById("deleteBtn");
        this.searchBtn = document.getElementById("searchBtn");
        this.traverseBtn = document.getElementById("traverseBtn");
        this.clearBtn = document.getElementById("clearBtn");
        this.randomBtn = document.getElementById("randomBtn");
        this.speedSlider = document.getElementById("speedSlider");
        this.speedValue = document.getElementById("speedValue");
        this.structureStage = document.getElementById("structureStage");
        this.memoryBlocks = document.getElementById("memoryBlocks");
        this.operationMessage = document.getElementById("operationMessage");
        this.messageIcon = document.getElementById("messageIcon");
        this.messageText = document.getElementById("messageText");
        this.backBtn = document.getElementById("backBtn");
        this.stepInfo = document.getElementById("stepInfo");
        this.currentSize = document.getElementById("currentSize");
        this.codeContent = document.getElementById("codeContent");
        this.traversalResult = document.getElementById("traversalResult");
        this.traversalOutput = document.getElementById("traversalOutput");

        // Linked list specific controls
        this.linkedListControls = document.getElementById("linkedListControls");
        this.insertMode = document.getElementById("insertMode");
        this.deleteMode = document.getElementById("deleteMode");

        // Info elements
        this.structureName = document.getElementById("structureName");
        this.structureDescription = document.getElementById("structureDescription");
        this.accessComplexity = document.getElementById("accessComplexity");
        this.searchComplexity = document.getElementById("searchComplexity");
        this.insertComplexity = document.getElementById("insertComplexity");
        this.deleteComplexity = document.getElementById("deleteComplexity");
        this.spaceComplexity = document.getElementById("spaceComplexity");
        this.propertiesList = document.getElementById("propertiesList");
    }

    initializeState() {
        this.data = [];
        this.isRunning = false;
        this.currentStructure = 'array';
        
        this.speedMap = {
            1: { value: 1500, label: "Very Slow" },
            2: { value: 1000, label: "Slow" },
            3: { value: 600, label: "Medium" },
            4: { value: 300, label: "Fast" },
            5: { value: 150, label: "Very Fast" }
        };
        
        this.speed = this.speedMap[3].value;
        
        // Tree specific state
        this.treeRoot = null;
        this.treeNodes = new Map();
        this.currentLLPtr = null;
    }

    initializeEventListeners() {
        this.insertBtn.addEventListener("click", () => this.performOperation('insert'));
        this.deleteBtn.addEventListener("click", () => this.performOperation('delete'));
        this.searchBtn.addEventListener("click", () => this.performOperation('search'));
        this.traverseBtn.addEventListener("click", () => this.performOperation('traverse'));
        this.clearBtn.addEventListener("click", () => this.clearStructure());
        this.randomBtn.addEventListener("click", () => this.addRandom());
        this.backBtn.addEventListener('click', () => {
            window.location.href = 'landing.html';
        });
        
        // Add close button event listener
        this.closeMessageBtn = document.getElementById("closeMessageBtn");
        this.closeMessageBtn.addEventListener('click', () => {
            this.operationMessage.classList.remove('show');
        });
        this.speedSlider.addEventListener("input", () => this.updateSpeed());
        this.selectDataStructure.addEventListener("change", () => this.updateDataStructure());

        if (this.insertMode) {
            this.insertMode.addEventListener("change", () => {
                this.updateLinkedListControls();
            });
        }

        if (this.deleteMode) {
            this.deleteMode.addEventListener("change", () => {
                this.updateLinkedListControls();
            });
        }

        // Input validation
        this.operationValue.addEventListener("input", () => this.validateInput());
        this.positionValue.addEventListener("input", () => this.validatePosition());
    }

    setupDataStructureInfo() {
        this.structureData = {
            array: {
                name: "Array",
                description: "A collection of elements stored in contiguous memory locations, accessible by index.",
                access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)", space: "O(n)",
                properties: ["Random access to elements", "Fixed size (in most implementations)", "Elements stored contiguously", "Cache-friendly memory access"]
            },
            stack: {
                name: "Stack (LIFO)",
                description: "A linear data structure that follows Last In First Out (LIFO) principle. Elements are added and removed from the top.",
                access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)",
                properties: ["LIFO (Last In, First Out)", "Push/Pop operations at top", "Used in function calls", "Undo operations"]
            },
            queue: {
                name: "Queue (FIFO)",
                description: "A linear data structure that follows First In First Out (FIFO) principle. Elements are added at rear and removed from front.",
                access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)",
                properties: ["FIFO (First In, First Out)", "Enqueue at rear, Dequeue at front", "Used in scheduling", "Breadth-first traversal"]
            },
            linkedList: {
                name: "Linked List",
                description: "A linear data structure where elements are stored in nodes, each containing data and a pointer to the next node.",
                access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)",
                properties: ["Dynamic size", "Non-contiguous memory", "Efficient insertion/deletion", "Sequential access only"]
            },
            binaryTree: {
                name: "Binary Tree",
                description: "A hierarchical data structure where each node has at most two children, referred to as left and right child.",
                access: "O(n)", search: "O(n)", insert: "O(n)", delete: "O(n)", space: "O(n)",
                properties: ["Hierarchical structure", "Each node has ≤ 2 children", "Used in expression parsing", "Foundation for other trees"]
            },
            bst: {
                name: "Binary Search Tree",
                description: "A binary tree where left child < parent < right child. Enables efficient searching, insertion, and deletion.",
                access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)",
                properties: ["Ordered binary tree", "Left < Parent < Right", "Efficient search operations", "In-order gives sorted sequence"]
            }
        };
    }

    updateDataStructure() {
        this.currentStructure = this.selectDataStructure.value;
        const info = this.structureData[this.currentStructure];
        
        this.structureName.textContent = info.name;
        this.structureDescription.textContent = info.description;
        this.accessComplexity.textContent = info.access;
        this.searchComplexity.textContent = info.search;
        this.insertComplexity.textContent = info.insert;
        this.deleteComplexity.textContent = info.delete;
        this.spaceComplexity.textContent = info.space;
        
        this.propertiesList.innerHTML = info.properties.map(prop => `<li>${prop}</li>`).join('');

        const isStack = this.currentStructure === 'stack';
        const isQueue = this.currentStructure === 'queue';

        if (this.insertBtn) {
            this.insertBtn.textContent = isStack ? 'Push' : isQueue ? 'Enqueue' : 'Insert';
        }
        if (this.deleteBtn) {
            this.deleteBtn.textContent = isStack ? 'Pop' : isQueue ? 'Dequeue' : 'Delete';
        }
        if (this.searchBtn) {
            this.searchBtn.textContent = (isStack || isQueue) ? 'Peek' : 'Search';
        }
        if (this.traverseBtn) {
            this.traverseBtn.textContent = 'Traverse';
        }

        this.updateLinkedListControls();
        this.clearStructure();
        this.updateStepInfo(`${info.name} selected - Ready for operations`);
    }

    updateLinkedListControls() {
        const isArray = this.currentStructure === 'array';
        const isLinkedList = this.currentStructure === 'linkedList';
        const insertMode = this.insertMode ? this.insertMode.value : 'end';
        const deleteMode = this.deleteMode ? this.deleteMode.value : 'value';

        if (this.linkedListControls) {
            this.linkedListControls.classList.toggle('hidden', !isLinkedList);
        }

        const needsPosition = isArray || (isLinkedList && (insertMode === 'position' || deleteMode === 'position'));
        if (this.positionGroup) {
            this.positionGroup.classList.toggle('hidden', !needsPosition);
        }

        if (!needsPosition && this.positionValue) {
            this.positionValue.value = 0;
        }
    }

    updateSpeed() {
        const speedLevel = parseInt(this.speedSlider.value);
        this.speed = this.speedMap[speedLevel].value;
        this.speedValue.textContent = this.speedMap[speedLevel].label;
    }

    validateInput() {
        const value = parseInt(this.operationValue.value);
        if (value < 1) this.operationValue.value = 1;
        if (value > 99) this.operationValue.value = 99;
    }

    validatePosition() {
        const value = parseInt(this.positionValue.value);
        if (value < 0) this.positionValue.value = 0;
        if (value > this.data.length) this.positionValue.value = this.data.length;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateStepInfo(message) {
        this.stepInfo.textContent = message;
    }

    showMessage(message, icon = "ℹ️") {
        console.log('Showing message:', message); // Debug log
        this.messageIcon.textContent = icon;
        this.messageText.textContent = message;
        this.operationMessage.classList.add('show');
        
        // Clear any existing timeout
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        
        // Auto-remove message after 3 seconds
        this.messageTimeout = setTimeout(() => {
            console.log('Auto-removing message'); // Debug log
            this.operationMessage.classList.remove('show');
        }, 3000);
    }

    updateSize() {
        this.currentSize.textContent = this.data.length;
    }

    updateMemoryView() {
        this.memoryBlocks.innerHTML = "";
        
        this.data.forEach((value, index) => {
            const block = document.createElement("div");
            block.className = "memory-block";
            block.innerHTML = `
                <span class="memory-address">0x${(1000 + index * 4).toString(16).toUpperCase()}</span>
                <span class="memory-value">${value}</span>
            `;
            this.memoryBlocks.appendChild(block);
        });
    }

    // Utility methods
    generateRandomData() {
        this.data = [];
        for (let i = 0; i < 8; i++) {
            this.data.push(Math.floor(Math.random() * 100) + 1);
        }
        this.executeModuleMethod(this.currentStructure, 'render');
        this.updateSize();
        this.updateMemoryView();
        this.showMessage("Random data generated", "🎲");
    }

    // (removed duplicate clearStructure; unified implementation exists later in file)

    async performOperation(operation) {
        if (this.isRunning) return;
        
        const value = parseInt(this.operationValue.value);
        const position = parseInt(this.positionValue.value);

        const valueRequired = this.valueRequiredForOperation(operation);
        if (valueRequired && isNaN(value)) {
            this.showMessage("Please enter a valid value", "⚠️");
            this.isRunning = false;
            this.enableButtons();
            return;
        }

        const positionRequired = this.positionRequiredForOperation(operation);
        if (positionRequired && (isNaN(position) || position < 0)) {
            this.showMessage("Please enter a valid position", "⚠️");
            this.isRunning = false;
            this.enableButtons();
            return;
        }

        this.isRunning = true;
        this.disableButtons();
        
        try {
            switch (operation) {
                case 'insert':
                    await this.executeModuleMethod(this.currentStructure, 'insert', value, position, this.insertMode ? this.insertMode.value : undefined);
                    break;
                case 'delete':
                    await this.executeModuleMethod(this.currentStructure, 'delete', value, position, this.deleteMode ? this.deleteMode.value : undefined);
                    break;
                case 'search':
                    await this.executeModuleMethod(this.currentStructure, 'search', value);
                    break;
                case 'traverse':
                    this.traversalOutput.innerHTML = '';
                    this.traversalResult.classList.add('show');
                    await this.executeModuleMethod(this.currentStructure, 'traverse');
                    break;
                default:
                    this.showMessage("Operation not supported", "⚠️");
            }
        } catch (error) {
            console.error("Operation error:", error);
            this.showMessage("Operation failed", "❌");
        }
        
        this.isRunning = false;
        this.enableButtons();
    }

    valueRequiredForOperation(operation) {
        if (this.currentStructure === 'linkedList') {
            if (operation === 'delete') {
                const mode = this.deleteMode ? this.deleteMode.value : 'value';
                return mode === 'value' || mode === 'position';
            }
            if (operation === 'insert') {
                return true;
            }
        }

        if (this.currentStructure === 'stack') {
            if (operation === 'delete' || operation === 'search') {
                return false;
            }
        }

        if (this.currentStructure === 'queue') {
            if (operation === 'delete' || operation === 'search') {
                return false;
            }
        }

        if (this.currentStructure === 'array' && operation === 'delete') {
            return false;
        }

        return !(operation === 'traverse' || operation === 'clear');
    }

    positionRequiredForOperation(operation) {
        if (this.currentStructure === 'linkedList') {
            if (operation === 'insert') {
                return this.insertMode && this.insertMode.value === 'position';
            }
            if (operation === 'delete') {
                return this.deleteMode && this.deleteMode.value === 'position';
            }
        }
        return false;
    }

    // Array Operations
    async insertArray(value, position) {
        if (position > this.data.length) position = this.data.length;
        
        this.showMessage(`Inserting ${value} at position ${position}`, "➕");
        this.updateCodeView('arrayInsert', value, position);
        
        this.data.splice(position, 0, value);
        await this.renderArray();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully inserted ${value} at position ${position}`, "✅");
    }

    async deleteArray(value, position) {
        // Support both call styles: delete(position) and delete(value, position)
        // When invoked via performOperation it passes (value, position). We need the index.
        if (typeof position !== 'number' || isNaN(position)) {
            position = typeof value === 'number' ? value : 0;
        }
        if (position >= this.data.length || this.data.length === 0 || position < 0) {
            this.showMessage("Invalid position or empty array", "❌");
            return;
        }
        
        const deletedValue = this.data[position];
        this.showMessage(`Deleting element at position ${position}`, "🗑️");
        this.updateCodeView('arrayDelete', deletedValue, position);
        
        // Highlight element to be deleted
        const elements = this.structureStage.querySelectorAll('.ds-element');
        if (elements[position]) {
            elements[position].classList.add('deleting');
            await this.sleep(this.speed);
        }
        
        this.data.splice(position, 1);
        await this.renderArray();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully deleted element from position ${position}`, "✅");
    }

    async renderArray() {
        this.structureStage.innerHTML = '<div class="array-container"></div>';
        const container = this.structureStage.querySelector('.array-container');
        
        for (let i = 0; i < this.data.length; i++) {
            const element = document.createElement('div');
            element.className = 'ds-element array-element';
            element.textContent = this.data[i];
            element.innerHTML += `<div class="array-index">[${i}]</div>`;
            
            element.style.animationDelay = `${i * 100}ms`;
            container.appendChild(element);
            await this.sleep(50);
        }
    }

    // Stack Operations
    async insertStack(value) {
        this.showMessage(`Pushing ${value} onto stack`, "⬆️");
        this.updateCodeView('stackPush', value);
        
        this.data.push(value);
        await this.renderStack();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully pushed ${value}`, "✅");
    }

    async deleteStack() {
        if (this.data.length === 0) {
            this.showMessage("Stack is empty", "❌");
            return;
        }
        
        const value = this.data[this.data.length - 1];
        this.showMessage(`Popping ${value} from stack`, "⬇️");
        this.updateCodeView('stackPop', value);
        
        // Highlight top element (last visual element)
        const elements = this.structureStage.querySelectorAll('.stack-element');
        if (elements.length > 0) {
            const topIdx = elements.length - 1;
            elements[topIdx].classList.add('deleting');
            await this.sleep(this.speed);
        }
        
        this.data.pop();
        await this.renderStack();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully popped ${value}`, "✅");
    }

    async renderStack() {
        this.structureStage.innerHTML = '<div class="stack-container"></div>';
        const container = this.structureStage.querySelector('.stack-container');
        
        for (let i = 0; i < this.data.length; i++) {
            const element = document.createElement('div');
            element.className = 'ds-element stack-element';
            element.textContent = this.data[i];
            
            if (i === this.data.length - 1) {
                element.innerHTML += '<div class="stack-pointer">← TOP</div>';
            }
            
            element.style.animationDelay = `${i * 100}ms`;
            container.appendChild(element);
            await this.sleep(50);
        }
    }

    async traverseStack() {
        this.showMessage("Traversing stack from TOP to BOTTOM...", "🔄");
        const elements = this.structureStage.querySelectorAll('.stack-element');
        for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].classList.add('highlight');
            const traversalItem = document.createElement('div');
            traversalItem.className = 'traversal-item';
            traversalItem.textContent = elements[i].textContent;
            this.traversalOutput.appendChild(traversalItem);
            await this.sleep(this.speed);
            elements[i].classList.remove('highlight');
        }
        this.showMessage("Stack traversal completed", "✅");
    }

    // Queue Operations
    async insertQueue(value) {
        this.showMessage(`Enqueuing ${value}`, "➡️");
        this.updateCodeView('queueEnqueue', value);
        
        this.data.push(value);
        await this.renderQueue();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully enqueued ${value}`, "✅");
    }

    async deleteQueue() {
        if (this.data.length === 0) {
            this.showMessage("Queue is empty", "❌");
            return;
        }
        
        const value = this.data[0];
        this.showMessage(`Dequeuing ${value}`, "⬅️");
        this.updateCodeView('queueDequeue', value);
        
        // Highlight front element
        const elements = this.structureStage.querySelectorAll('.ds-element');
        if (elements.length > 0) {
            elements[0].classList.add('deleting');
            await this.sleep(this.speed);
        }
        
        this.data.shift();
        await this.renderQueue();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully dequeued ${value}`, "✅");
    }

    async renderQueue() {
        this.structureStage.innerHTML = '<div class="queue-container"></div>';
        const container = this.structureStage.querySelector('.queue-container');
        
        for (let i = 0; i < this.data.length; i++) {
            const element = document.createElement('div');
            element.className = 'ds-element queue-element';
            element.textContent = this.data[i];
            
            if (i === 0) {
                element.innerHTML += '<div class="queue-pointer">FRONT</div>';
            }
            if (i === this.data.length - 1) {
                element.innerHTML += '<div class="queue-pointer">REAR</div>';
            }
            
            element.style.animationDelay = `${i * 100}ms`;
            container.appendChild(element);
            await this.sleep(50);
        }
    }

    // Search Operations
    async searchLinear(value) {
        this.showMessage(`Searching for ${value}...`, "🔍");
        this.updateCodeView('linearSearch', value);
        
        const elements = this.structureStage.querySelectorAll('.ds-element');
        let found = false;
        
        for (let i = 0; i < this.data.length; i++) {
            if (elements[i]) {
                elements[i].classList.add('highlight');
                await this.sleep(this.speed);
                
                if (this.data[i] === value) {
                    elements[i].classList.remove('highlight');
                    elements[i].classList.add('success');
                    this.showMessage(`Found ${value} at position ${i}`, "✅");
                    found = true;
                    break;
                } else {
                    elements[i].classList.remove('highlight');
                }
            }
        }
        
        if (!found) {
            this.showMessage(`${value} not found in structure`, "❌");
        }
    }

    // Traversal Operations
    async traverseLinear() {
        this.showMessage("Traversing structure...", "🔄");
        
        const elements = this.structureStage.querySelectorAll('.ds-element');
        
        for (let i = 0; i < this.data.length; i++) {
            if (elements[i]) {
                elements[i].classList.add('highlight');
                
                const traversalItem = document.createElement('div');
                traversalItem.className = 'traversal-item';
                traversalItem.textContent = this.data[i];
                traversalItem.style.animationDelay = `${i * 100}ms`;
                this.traversalOutput.appendChild(traversalItem);
                
                await this.sleep(this.speed);
                elements[i].classList.remove('highlight');
            }
        }
        
        this.showMessage("Traversal completed", "✅");
    }

    // Linked List Operations
    async insertLinkedList(value, position, mode = 'end') {
        const insertMode = mode || 'end';
        const listLength = this.data.length;
        let targetIndex = listLength;

        if (insertMode === 'beginning') {
            targetIndex = 0;
        } else if (insertMode === 'position') {
            if (!Number.isInteger(position)) {
                this.showMessage("Please provide a valid position for insertion", "❌");
                return;
            }
            if (position < 0 || position > listLength) {
                this.showMessage("Position out of range for insertion", "❌");
                return;
            }
            targetIndex = position;
        } else {
            targetIndex = listLength;
        }

        const messageSuffix = insertMode === 'beginning'
            ? "at the beginning"
            : insertMode === 'position'
                ? `at position ${targetIndex}`
                : "at the end";

        const codeKey = insertMode === 'beginning'
            ? 'linkedListInsertBeginning'
            : insertMode === 'position'
                ? 'linkedListInsertPosition'
                : 'linkedListInsertEnd';

        this.showMessage(`Inserting ${value} ${messageSuffix}`, "➕");
        this.updateCodeView(codeKey, value, targetIndex);

        this.data.splice(targetIndex, 0, value);
        await this.renderLinkedList();
        this.updateSize();
        this.updateMemoryView();

        this.showMessage(`Successfully inserted ${value} ${messageSuffix}`, "✅");
    }

    async deleteLinkedList(value, position, mode = 'value') {
        if (this.data.length === 0) {
            this.showMessage("Linked list is empty", "❌");
            return;
        }

        const deleteMode = mode || 'value';
        let removeIndex = -1;
        let removedValue = null;

        if (deleteMode === 'beginning') {
            removeIndex = 0;
        } else if (deleteMode === 'end') {
            removeIndex = this.data.length - 1;
        } else if (deleteMode === 'position') {
            if (!Number.isInteger(position)) {
                this.showMessage("Please provide a valid position for deletion", "❌");
                return;
            }
            if (position < 0 || position >= this.data.length) {
                this.showMessage("Position out of range for deletion", "❌");
                return;
            }
            removeIndex = position;
        } else {
            removeIndex = this.data.indexOf(value);
            if (removeIndex === -1) {
                this.showMessage(`${value} not found in linked list`, "❌");
                return;
            }
        }

        removedValue = this.data[removeIndex];

        const messageSuffix = deleteMode === 'beginning'
            ? "from the beginning"
            : deleteMode === 'end'
                ? "from the end"
                : deleteMode === 'position'
                    ? `from position ${removeIndex}`
                    : `value ${value}`;

        const codeKey = deleteMode === 'beginning'
            ? 'linkedListDeleteBeginning'
            : deleteMode === 'end'
                ? 'linkedListDeleteEnd'
                : deleteMode === 'position'
                    ? 'linkedListDeletePosition'
                    : 'linkedListDelete';

        this.showMessage(`Deleting ${messageSuffix}`, "🗑️");
        this.updateCodeView(codeKey, removedValue, removeIndex);

        // Highlight node before removal
        const elements = this.structureStage.querySelectorAll('.node-data');
        if (elements[removeIndex]) {
            elements[removeIndex].classList.add('deleting');
            await this.sleep(this.speed);
        }

        this.data.splice(removeIndex, 1);
        await this.renderLinkedList();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully deleted ${removedValue} ${messageSuffix}`, "✅");
    }

    async searchLinkedList(value) {
        this.showMessage(`Searching for ${value} in linked list...`, "🔍");
        this.updateCodeView('linkedListSearch', value);
        
        const elements = this.structureStage.querySelectorAll('.linkedlist-node');
        let found = false;
        
        for (let i = 0; i < this.data.length; i++) {
            if (elements[i]) {
                this.updateLinkedListPtr(i);
                const nodeDataEl = elements[i].querySelector('.node-data');
                if (nodeDataEl) nodeDataEl.classList.add('highlight');
                await this.sleep(this.speed);
                
                if (this.data[i] === value) {
                    if (nodeDataEl) {
                        nodeDataEl.classList.remove('highlight');
                        nodeDataEl.classList.add('success');
                    }
                    this.showMessage(`Found ${value} at position ${i}`, "✅");
                    found = true;
                    break;
                } else {
                    if (nodeDataEl) nodeDataEl.classList.remove('highlight');
                }
            }
        }
        
        if (!found) {
            this.showMessage(`${value} not found in linked list`, "❌");
        }
    }

    // Stack-specific Peek operation
    async peekStack() {
        if (this.data.length === 0) {
            this.showMessage("Stack is empty", "❌");
            return;
        }
        this.showMessage("Peeking TOP element", "👀");
        const elements = this.structureStage.querySelectorAll('.stack-element');
        if (elements.length > 0) {
            const topIdx = elements.length - 1;
            elements[topIdx].classList.add('highlight');
            await this.sleep(this.speed);
            elements[topIdx].classList.remove('highlight');
            elements[topIdx].classList.add('success');
            await this.sleep(this.speed / 2);
            elements[topIdx].classList.remove('success');
            this.showMessage(`TOP = ${this.data[this.data.length - 1]}`, "✅");
        }
    }

    async traverseLinkedList() {
        this.showMessage("Traversing linked list...", "🔄");
        
        const elements = this.structureStage.querySelectorAll('.linkedlist-node');
        
        for (let i = 0; i < this.data.length; i++) {
            if (elements[i]) {
                this.updateLinkedListPtr(i);
                const nodeDataEl = elements[i].querySelector('.node-data');
                if (nodeDataEl) nodeDataEl.classList.add('highlight');
                
                const traversalItem = document.createElement('div');
                traversalItem.className = 'traversal-item';
                traversalItem.textContent = this.data[i];
                traversalItem.style.animationDelay = `${i * 100}ms`;
                this.traversalOutput.appendChild(traversalItem);
                
                await this.sleep(this.speed);
                if (nodeDataEl) nodeDataEl.classList.remove('highlight');
            }
        }
        
        this.showMessage("Linked list traversal completed", "✅");
    }

    async peekQueue() {
        if (this.data.length === 0) {
            this.showMessage("Queue is empty", "❌");
            return;
        }
        const elements = this.structureStage.querySelectorAll('.queue-element');
        const frontIdx = 0;
        const rearIdx = elements.length - 1;
        // Highlight FRONT
        if (elements[frontIdx]) {
            elements[frontIdx].classList.add('highlight');
            this.showMessage(`FRONT = ${this.data[0]}`, "👈");
            await this.sleep(this.speed);
            elements[frontIdx].classList.remove('highlight');
        }
        // Highlight REAR
        if (elements[rearIdx] && rearIdx !== frontIdx) {
            elements[rearIdx].classList.add('highlight');
            this.showMessage(`REAR = ${this.data[this.data.length - 1]}`, "👉");
            await this.sleep(this.speed);
            elements[rearIdx].classList.remove('highlight');
        }
        this.showMessage("Front/Rear highlighted", "✅");
    }

    async renderLinkedList() {
        this.structureStage.innerHTML = '<div class="linkedlist-container"></div>';
        const container = this.structureStage.querySelector('.linkedlist-container');
        
        for (let i = 0; i < this.data.length; i++) {
            const nodeContainer = document.createElement('div');
            nodeContainer.className = 'linkedlist-node';
            
            const nodeData = document.createElement('div');
            nodeData.className = 'ds-element node-data';
            nodeData.textContent = this.data[i];
            
            const pointer = document.createElement('div');
            pointer.className = i === this.data.length - 1 ? 'node-pointer null' : 'node-pointer';
            
            nodeContainer.appendChild(nodeData);
            // Always append pointer; last node shows NULL
            nodeContainer.appendChild(pointer);
            
            // Add HEAD label to first node
            if (i === 0) {
                const head = document.createElement('div');
                head.className = 'head-label';
                head.textContent = 'HEAD';
                nodeContainer.appendChild(head);
            }
            
            container.appendChild(nodeContainer);
            await this.sleep(50);
        }
        // Reset traversal pointer indicator
        this.currentLLPtr = null;
    }

    updateLinkedListPtr(index) {
        const nodes = this.structureStage.querySelectorAll('.linkedlist-node');
        if (!nodes.length) return;
        if (this.currentLLPtr !== null && nodes[this.currentLLPtr]) {
            const oldPtr = nodes[this.currentLLPtr].querySelector('.ptr-label');
            if (oldPtr) oldPtr.remove();
        }
        this.currentLLPtr = index;
        const node = nodes[index];
        if (node) {
            const ptr = document.createElement('div');
            ptr.className = 'ptr-label';
            ptr.textContent = 'PTR';
            node.appendChild(ptr);
        }
    }

    async moveLLPtrTo(index) {
        // Moves PTR from head to index, step-by-step
        for (let i = 0; i <= index; i++) {
            this.updateLinkedListPtr(i);
            await this.sleep(this.speed / 1.5);
        }
    }

    // Binary Tree Operations
    async insertBinaryTree(value) {
        this.showMessage(`Inserting ${value} into binary tree`, "➕");
        this.updateCodeView('binaryTreeInsert', value);
        
        if (!this.treeRoot) {
            this.treeRoot = { value, left: null, right: null, id: Date.now() };
            this.data = [value];
        } else {
            this.insertIntoBinaryTree(this.treeRoot, value);
            this.data.push(value);
        }
        
        await this.renderBinaryTree();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully inserted ${value}`, "✅");
    }

    insertIntoBinaryTree(node, value) {
        // Insert level by level (complete binary tree)
        const queue = [node];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (!current.left) {
                current.left = { value, left: null, right: null, id: Date.now() };
                return;
            } else if (!current.right) {
                current.right = { value, left: null, right: null, id: Date.now() };
                return;
            } else {
                queue.push(current.left);
                queue.push(current.right);
            }
        }
    }

    async insertBST(value) {
        this.showMessage(`Inserting ${value} into BST`, "➕");
        this.updateCodeView('bstInsert', value);
        
        if (!this.treeRoot) {
            this.treeRoot = { value, left: null, right: null, id: Date.now() };
            this.data = [value];
        } else {
            this.insertIntoBST(this.treeRoot, value);
            this.data.push(value);
        }
        
        await this.renderBinaryTree();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully inserted ${value}`, "✅");
    }

    insertIntoBST(node, value) {
        if (value < node.value) {
            if (!node.left) {
                node.left = { value, left: null, right: null, id: Date.now() };
            } else {
                this.insertIntoBST(node.left, value);
            }
        } else if (value > node.value) {
            if (!node.right) {
                node.right = { value, left: null, right: null, id: Date.now() };
            } else {
                this.insertIntoBST(node.right, value);
            }
        }
    }

    async deleteBST(value) {
        if (!this.treeRoot) {
            this.showMessage("Tree is empty", "❌");
            return;
        }
        
        this.showMessage(`Deleting ${value} from tree`, "🗑️");
        this.updateCodeView('bstDelete', value);
        
        this.treeRoot = this.deleteFromBST(this.treeRoot, value);
        this.data = this.data.filter(v => v !== value);
        
        await this.renderBinaryTree();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully deleted ${value}`, "✅");
    }

    deleteFromBST(node, value) {
        if (!node) return null;
        
        if (value < node.value) {
            node.left = this.deleteFromBST(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteFromBST(node.right, value);
        } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            const minRight = this.findMin(node.right);
            node.value = minRight.value;
            node.right = this.deleteFromBST(node.right, minRight.value);
        }
        
        return node;
    }

    findMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    async searchTree(value) {
        if (!this.treeRoot) {
            this.showMessage("Tree is empty", "❌");
            return;
        }
        
        this.showMessage(`Searching for ${value} in tree...`, "🔍");
        this.updateCodeView('treeSearch', value);
        
        const found = await this.searchInTree(this.treeRoot, value);
        
        if (found) {
            this.showMessage(`Found ${value} in tree`, "✅");
        } else {
            this.showMessage(`${value} not found in tree`, "❌");
        }
    }

    async searchInTree(node, value) {
        if (!node) return false;
        
        const nodeElement = this.structureStage.querySelector(`[data-node-id="${node.id}"]`);
        if (nodeElement) {
            nodeElement.classList.add('highlight');
            await this.sleep(this.speed);
        }
        
        if (node.value === value) {
            if (nodeElement) {
                nodeElement.classList.remove('highlight');
                nodeElement.classList.add('success');
            }
            return true;
        }
        
        if (nodeElement) {
            nodeElement.classList.remove('highlight');
        }
        
        if (this.currentStructure === 'bst') {
            if (value < node.value) {
                return await this.searchInTree(node.left, value);
            } else {
                return await this.searchInTree(node.right, value);
            }
        } else {
            return await this.searchInTree(node.left, value) || await this.searchInTree(node.right, value);
        }
    }

    async traverseTree() {
        if (!this.treeRoot) {
            this.showMessage("Tree is empty", "❌");
            return;
        }
        
        this.showMessage("Traversing tree (in-order)...", "🔄");
        await this.inOrderTraversal(this.treeRoot);
        this.showMessage("Tree traversal completed", "✅");
    }

    async inOrderTraversal(node) {
        if (!node) return;
        
        await this.inOrderTraversal(node.left);
        
        const nodeElement = this.structureStage.querySelector(`[data-node-id="${node.id}"]`);
        if (nodeElement) {
            nodeElement.classList.add('highlight');
        }
        
        const traversalItem = document.createElement('div');
        traversalItem.className = 'traversal-item';
        traversalItem.textContent = node.value;
        this.traversalOutput.appendChild(traversalItem);
        
        await this.sleep(this.speed);
        
        if (nodeElement) {
            nodeElement.classList.remove('highlight');
        }
        
        await this.inOrderTraversal(node.right);
    }

    async renderBinaryTree() {
        this.structureStage.innerHTML = '<div class="tree-container"></div>';
        const container = this.structureStage.querySelector('.tree-container');
        
        if (!this.treeRoot) return;
        
        const levels = this.getTreeLevels(this.treeRoot);
        
        levels.forEach((level, levelIndex) => {
            const levelDiv = document.createElement('div');
            levelDiv.className = 'tree-level';
            
            level.forEach(node => {
                if (node) {
                    const nodeElement = document.createElement('div');
                    nodeElement.className = 'ds-element tree-node';
                    nodeElement.textContent = node.value;
                    nodeElement.setAttribute('data-node-id', node.id);
                    levelDiv.appendChild(nodeElement);
                } else {
                    const emptyNode = document.createElement('div');
                    emptyNode.className = 'tree-node-empty';
                    emptyNode.style.width = '50px';
                    emptyNode.style.height = '50px';
                    levelDiv.appendChild(emptyNode);
                }
            });
            
            container.appendChild(levelDiv);
        });
    }

    getTreeLevels(root) {
        if (!root) return [];
        
        const levels = [];
        const queue = [{ node: root, level: 0 }];
        
        while (queue.length > 0) {
            const { node, level } = queue.shift();
            
            if (!levels[level]) {
                levels[level] = [];
            }
            
            levels[level].push(node);
            
            if (node) {
                queue.push({ node: node.left, level: level + 1 });
                queue.push({ node: node.right, level: level + 1 });
            }
        }
        
        return levels;
    }

    clearStructure() {
        this.data = [];
        this.treeRoot = null;
        this.treeNodes.clear();
        this.structureStage.innerHTML = '';
        this.memoryBlocks.innerHTML = '';
        this.traversalResult.classList.remove('show');
        this.updateSize();
        this.showMessage("Structure cleared", "🗑️");
    }

    addRandom() {
        const value = Math.floor(Math.random() * 90) + 10;
        this.operationValue.value = value;
        this.performOperation('insert');
    }

    updateCodeView(operation, value, position) {
        const codeExamples = {
            arrayInsert: `// Array Insert at position ${typeof position==='number'?position:'k'}\narray.splice(${position || 0}, 0, ${value});\n// Time: O(n), Space: O(1)`,
            arrayDelete: `// Array Delete at position ${typeof position==='number'?position:'k'}\narray.splice(${position || 0}, 1);\n// Time: O(n), Space: O(1)`,
            stackPush: `// Stack Push\nstack.push(${value});\n// Time: O(1), Space: O(1)`,
            stackPop: `// Stack Pop\nlet value = stack.pop();\n// Time: O(1), Space: O(1)`,
            queueEnqueue: `// Queue Enqueue\nqueue.push(${value});\n// Time: O(1), Space: O(1)`,
            queueDequeue: `// Queue Dequeue\nlet value = queue.shift();\n// Time: O(1), Space: O(1)`,
            linearSearch: `// Linear Search\nfor (let i = 0; i < array.length; i++) {\n  if (array[i] === ${value}) {\n    return i;\n  }\n}\nreturn -1;\n// Time: O(n), Space: O(1)`,
            linkedListInsert: `// Linked List Insert\nclass Node {\n  constructor(data) {\n    this.data = ${value};\n    this.next = null;\n  }\n}\n// Time: O(1), Space: O(1)` ,
            linkedListInsertBeginning: `// Linked List Insert at beginning\nconst newNode = new Node(${value});\nnewNode.next = head;\nhead = newNode;\n// Time: O(1)` ,
            linkedListInsertEnd: `// Linked List Insert at end\nconst newNode = new Node(${value});\nlet current = head;\nwhile (current.next) {\n  current = current.next;\n}\ncurrent.next = newNode;\n// Time: O(n)` ,
            linkedListInsertPosition: `// Linked List Insert at position ${position || 0}\nconst newNode = new Node(${value});\nlet current = head;\nlet idx = 0;\nwhile (idx < ${position || 0} - 1) {\n  current = current.next;\n  idx++;\n}\nnewNode.next = current.next;\ncurrent.next = newNode;\n// Time: O(n)` ,
            linkedListDelete: `// Linked List Delete\nif (current.data === ${value}) {\n  previous.next = current.next;\n}\n// Time: O(n), Space: O(1)`,
            linkedListDeleteBeginning: `// Linked List Delete beginning\nif (head) {\n  head = head.next;\n}\n// Time: O(1)` ,
            linkedListDeleteEnd: `// Linked List Delete end\nlet current = head;\nlet prev = null;\nwhile (current.next) {\n  prev = current;\n  current = current.next;\n}\nif (prev) {\n  prev.next = null;\n}\n// Time: O(n)` ,
            linkedListDeletePosition: `// Linked List Delete at position ${position || 0}\nlet current = head;\nlet idx = 0;\nwhile (idx < ${position || 0}) {\n  prev = current;\n  current = current.next;\n  idx++;\n}\nprev.next = current.next;\n// Time: O(n)` ,
            binaryTreeInsert: `// Binary Tree Insert\nif (!root.left) {\n  root.left = new Node(${value});\n} else if (!root.right) {\n  root.right = new Node(${value});\n}\n// Time: O(n), Space: O(1)`,
            bstInsert: `// BST Insert\nif (${value} < root.data) {\n  root.left = insert(root.left, ${value});\n} else {\n  root.right = insert(root.right, ${value});\n}\n// Time: O(log n), Space: O(log n)`,
            bstDelete: `// BST Delete\nif (${value} < root.data) {\n  root.left = delete(root.left, ${value});\n} else if (${value} > root.data) {\n  root.right = delete(root.right, ${value});\n}\n// Time: O(log n), Space: O(log n)`,
            treeSearch: `// Tree Search\nif (root.data === ${value}) return root;\nreturn search(root.left, ${value}) || search(root.right, ${value});\n// Time: O(n), Space: O(h)`
        };
        
        this.codeContent.textContent = codeExamples[operation] || '// Select an operation to see code';
    }

    disableButtons() {
        this.insertBtn.disabled = true;
        this.deleteBtn.disabled = true;
        this.searchBtn.disabled = true;
        this.traverseBtn.disabled = true;
    }

    enableButtons() {
        this.insertBtn.disabled = false;
        this.deleteBtn.disabled = false;
        this.searchBtn.disabled = false;
        this.traverseBtn.disabled = false;
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DataStructureVisualizer();
});
