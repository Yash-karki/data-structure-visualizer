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

export class SortingAlgorithms {
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