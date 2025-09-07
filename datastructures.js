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
                    search: this.searchLinear.bind(this),
                    traverse: this.traverseLinear.bind(this),
                    render: this.renderStack.bind(this)
                });
            }
            if (this.features.queue) {
                this.modules.set('queue', {
                    insert: this.insertQueue.bind(this),
                    delete: this.deleteQueue.bind(this),
                    search: this.searchLinear.bind(this),
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
        
        // Update UI based on structure
        if (this.currentStructure === 'array') {
            this.positionGroup.classList.remove('hidden');
        } else {
            this.positionGroup.classList.add('hidden');
        }
        
        this.clearStructure();
        this.updateStepInfo(`${info.name} selected - Ready for operations`);
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

    // Operation handlers with modular approach
    async insert() {
        if (this.isRunning) return;
        
        const value = parseInt(this.operationValue.value);
        if (isNaN(value)) {
            this.showMessage("Please enter a valid number", "❌");
            return;
        }
        
        this.isRunning = true;
        this.traversalResult.classList.remove('show');
        
        try {
            await this.executeModuleMethod(this.currentStructure, 'insert', value);
        } catch (error) {
            console.error('Insert operation error:', error);
            this.showMessage("Insert operation failed", "❌");
        }
        
        this.operationValue.value = '';
        this.isRunning = false;
    }

    async delete() {
        if (this.isRunning) return;
        
        const value = parseInt(this.operationValue.value);
        
        this.isRunning = true;
        this.traversalResult.classList.remove('show');
        
        try {
            await this.executeModuleMethod(this.currentStructure, 'delete', value);
        } catch (error) {
            console.error('Delete operation error:', error);
            this.showMessage("Delete operation failed", "❌");
        }
        
        this.operationValue.value = '';
        this.isRunning = false;
    }

    async search() {
        if (this.isRunning) return;
        
        const value = parseInt(this.operationValue.value);
        if (isNaN(value)) {
            this.showMessage("Please enter a valid number", "❌");
            return;
        }
        
        this.isRunning = true;
        this.traversalResult.classList.remove('show');
        
        try {
            await this.executeModuleMethod(this.currentStructure, 'search', value);
        } catch (error) {
            console.error('Search operation error:', error);
            this.showMessage("Search operation failed", "❌");
        }
        
        this.operationValue.value = '';
        this.isRunning = false;
    }

    async traverse() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.traversalOutput.innerHTML = '';
        this.traversalResult.classList.add('show');
        
        try {
            await this.executeModuleMethod(this.currentStructure, 'traverse');
        } catch (error) {
            console.error('Traverse operation error:', error);
            this.showMessage("Traverse operation failed", "❌");
        }
        
        this.isRunning = false;
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

    clearStructure() {
        this.data = [];
        this.treeRoot = null;
        this.treeNodes = new Map();
        this.structureStage.innerHTML = '';
        this.memoryBlocks.innerHTML = '';
        this.traversalResult.classList.remove('show');
        this.updateSize();
        this.showMessage("Structure cleared", "🗑️");
    }

    async performOperation(operation) {
        if (this.isRunning) return;
        
        const value = parseInt(this.operationValue.value);
        const position = parseInt(this.positionValue.value);
        
        if (operation !== 'traverse' && operation !== 'clear' && isNaN(value)) {
            this.showMessage("Please enter a valid value", "⚠️");
            return;
        }
        
        this.isRunning = true;
        this.disableButtons();
        
        try {
            switch (operation) {
                case 'insert':
                    await this.executeModuleMethod(this.currentStructure, 'insert', value, position);
                    break;
                case 'delete':
                    await this.executeModuleMethod(this.currentStructure, 'delete', value, position);
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

    async deleteArray(position) {
        if (position >= this.data.length || this.data.length === 0) {
            this.showMessage("Invalid position or empty array", "❌");
            return;
        }
        
        const value = this.data[position];
        this.showMessage(`Deleting element at position ${position}`, "🗑️");
        this.updateCodeView('arrayDelete', value, position);
        
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
        
        // Highlight top element
        const elements = this.structureStage.querySelectorAll('.ds-element');
        if (elements.length > 0) {
            elements[0].classList.add('deleting');
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
        
        for (let i = this.data.length - 1; i >= 0; i--) {
            const element = document.createElement('div');
            element.className = 'ds-element stack-element';
            element.textContent = this.data[i];
            
            if (i === this.data.length - 1) {
                element.innerHTML += '<div class="stack-pointer">← TOP</div>';
            }
            
            element.style.animationDelay = `${(this.data.length - 1 - i) * 100}ms`;
            container.appendChild(element);
            await this.sleep(50);
        }
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
    async insertLinkedList(value) {
        this.showMessage(`Inserting ${value} into linked list`, "➕");
        this.updateCodeView('linkedListInsert', value);
        
        this.data.push(value);
        await this.renderLinkedList();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully inserted ${value}`, "✅");
    }

    async deleteLinkedList(value) {
        const index = this.data.indexOf(value);
        if (index === -1) {
            this.showMessage(`Value ${value} not found in linked list`, "❌");
            return;
        }
        
        this.showMessage(`Deleting ${value} from linked list`, "🗑️");
        this.updateCodeView('linkedListDelete', value);
        
        this.data.splice(index, 1);
        await this.renderLinkedList();
        this.updateSize();
        this.updateMemoryView();
        
        this.showMessage(`Successfully deleted ${value}`, "✅");
    }

    async searchLinkedList(value) {
        this.showMessage(`Searching for ${value} in linked list...`, "🔍");
        this.updateCodeView('linkedListSearch', value);
        
        const elements = this.structureStage.querySelectorAll('.node-data');
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
            this.showMessage(`${value} not found in linked list`, "❌");
        }
    }

    async traverseLinkedList() {
        this.showMessage("Traversing linked list...", "🔄");
        
        const elements = this.structureStage.querySelectorAll('.node-data');
        
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
        
        this.showMessage("Linked list traversal completed", "✅");
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
            if (i < this.data.length - 1) {
                nodeContainer.appendChild(pointer);
            }
            
            container.appendChild(nodeContainer);
            await this.sleep(50);
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
            arrayInsert: `// Array Insert at position ${position || 0}\narray.splice(${position || 0}, 0, ${value});\n// Time: O(n), Space: O(1)`,
            arrayDelete: `// Array Delete at position ${position || 0}\narray.splice(${position || 0}, 1);\n// Time: O(n), Space: O(1)`,
            stackPush: `// Stack Push\nstack.push(${value});\n// Time: O(1), Space: O(1)`,
            stackPop: `// Stack Pop\nlet value = stack.pop();\n// Time: O(1), Space: O(1)`,
            queueEnqueue: `// Queue Enqueue\nqueue.push(${value});\n// Time: O(1), Space: O(1)`,
            queueDequeue: `// Queue Dequeue\nlet value = queue.shift();\n// Time: O(1), Space: O(1)`,
            linearSearch: `// Linear Search\nfor (let i = 0; i < array.length; i++) {\n  if (array[i] === ${value}) {\n    return i;\n  }\n}\nreturn -1;\n// Time: O(n), Space: O(1)`,
            linkedListInsert: `// Linked List Insert\nclass Node {\n  constructor(data) {\n    this.data = ${value};\n    this.next = null;\n  }\n}\n// Time: O(1), Space: O(1)`,
            linkedListDelete: `// Linked List Delete\nif (current.data === ${value}) {\n  previous.next = current.next;\n}\n// Time: O(n), Space: O(1)`,
            linkedListSearch: `// Linked List Search\nwhile (current !== null) {\n  if (current.data === ${value}) return current;\n  current = current.next;\n}\n// Time: O(n), Space: O(1)`,
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
