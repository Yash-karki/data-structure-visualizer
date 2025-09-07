# Algorithm & Data Structure Visualizer

A comprehensive, interactive web application for visualizing algorithms and data structures with beautiful animations and educational content designed for both beginners and advanced users.

## 🚀 Features

### 🎯 Three Main Visualizers

1. **Sorting Visualizer**
   - 6 sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
   - Real-time complexity analysis
   - Adjustable speed controls
   - Custom array input
   - Step-by-step explanations

2. **Searching Visualizer**
   - 4 search algorithms: Linear Search, Binary Search, Jump Search, Exponential Search
   - Visual step-by-step process
   - Performance comparisons
   - Sorted vs unsorted array handling
   - Range highlighting

3. **Data Structure Visualizer**
   - 6 data structures: Array, Stack, Queue, Linked List, Binary Tree, Binary Search Tree
   - Interactive operations (Insert, Delete, Search, Traverse)
   - Memory representation view
   - Code examples for each operation
   - Real-time complexity information

### ✨ User Experience Features

- **Beginner-Friendly**: Clear explanations and visual cues for non-technical users
- **Interactive Controls**: Pause, resume, speed adjustment, and step-by-step execution
- **Beautiful Animations**: Smooth transitions and color-coded operations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Educational Content**: Algorithm explanations, complexity analysis, and code examples

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Architecture**: Modular ES6 classes
- **Design**: Modern glassmorphism UI with gradient backgrounds

## 📁 Project Structure

```
DS_project/
├── landing.html          # Main landing page
├── landing.css           # Landing page styles
├── sorting.html          # Sorting visualizer
├── sorting.css           # Sorting visualizer styles
├── sorting.js            # Sorting algorithms implementation
├── searching.html        # Searching visualizer
├── searching.css         # Searching visualizer styles
├── searching.js          # Search algorithms implementation
├── datastructures.html   # Data structure visualizer
├── datastructures.css    # Data structure visualizer styles
├── datastructures.js     # Data structure implementations
├── helpers/
│   ├── sortingAlgorithms.js  # Alternative sorting implementations
│   └── util.js               # Utility functions
├── index.html            # Entry point (redirects to landing)
├── index.js              # Legacy sorting implementation
└── style.css             # Legacy styles
```

## 🎮 How to Use

### Getting Started
1. Open `landing.html` in a web browser or serve the files using a local server
2. Choose one of the three visualizers from the landing page
3. Follow the interactive controls to explore algorithms and data structures

### Sorting Visualizer
1. Select an algorithm from the dropdown
2. Choose array size or input custom values
3. Adjust animation speed
4. Click "Start Sorting" to begin visualization
5. Use pause/resume controls as needed

### Searching Visualizer
1. Select a search algorithm
2. Generate a sorted array or shuffle for linear search
3. Enter the value to search for
4. Click "Start Search" to see the algorithm in action
5. Observe the step-by-step process and range highlighting

### Data Structure Visualizer
1. Choose a data structure from the dropdown
2. Use operation buttons to insert, delete, search, or traverse
3. View memory representation and code examples
4. Observe real-time complexity information

## 🎨 Design Features

- **Modern UI**: Glassmorphism design with backdrop blur effects
- **Color Coding**: 
  - Blue: Normal elements
  - Orange: Currently comparing/processing
  - Red: Elements being swapped/deleted
  - Green: Sorted/found elements
  - Purple: Pivot elements (in algorithms like Quick Sort)
- **Smooth Animations**: CSS transitions and keyframe animations
- **Responsive Layout**: Adapts to different screen sizes

## 🧠 Educational Value

### For Beginners
- Visual step-by-step explanations
- Real-time complexity analysis
- Interactive learning experience
- Clear algorithm descriptions

### For Advanced Users
- Performance comparisons
- Code implementation examples
- Memory representation views
- Detailed complexity analysis

## 🔧 Customization

The application is highly customizable:
- Adjust animation speeds (5 levels)
- Custom input arrays
- Flexible array sizes
- Pause/resume functionality

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

## 🚀 Future Enhancements

- Graph algorithms (Dijkstra, BFS, DFS)
- More data structures (Hash Tables, Heaps)
- Algorithm comparison mode
- Export visualization as GIF/Video
- Interactive quiz mode
- Progress tracking

## 🤝 Contributing

This project is designed to be educational and extensible. Key areas for contribution:
- Additional algorithms
- More data structures
- UI/UX improvements
- Performance optimizations
- Educational content

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Educational Use

Perfect for:
- Computer Science students
- Coding bootcamps
- Algorithm study groups
- Technical interviews preparation
- Teaching data structures and algorithms

---

**Built with ❤️ for learning and education**
