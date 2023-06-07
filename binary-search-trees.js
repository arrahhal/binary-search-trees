class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = buildTree(arr);
  }
}

function uniqueSortedArr(arr) {
  return arr
    .sort((a, b) => a - b)
    .filter((val, pos) => arr.indexOf(val) === pos);
}

function buildTree(arr = []) {
  arr = uniqueSortedArr(arr);
  const midIndex = Math.floor(arr.length / 2);
  if (arr.length === 0) return null;
  const root = new Node(arr[midIndex]);
  root.left = buildTree(arr.slice(0, midIndex));
  root.right = buildTree(arr.slice(midIndex + 1));
  return root;
}

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const sampleTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(prettyPrint(sampleTree.root));
