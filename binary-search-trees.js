class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }
  insert(val, root = this.root) {
    if (val > root.data) {
      if (root.right === null) root.right = new Node(val);
      else this.insert(val, root.right);
      return;
    }
    if (val < root.data) {
      if (root.left === null) root.left = new Node(val);
      else this.insert(val, root.left);
      return;
    }
  }
  delete(val) {
    this.root = this.deleteRec(val, this.root);
  }
  deleteRec(val, root = this.root) {
    if (root === null) return root;

    if (val > root.data) {
      root.right = this.deleteRec(val, root.right);
    } else if (val < root.data) {
      root.left = this.deleteRec(val, root.left);
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      root.data = this.minValue(root.right);
      root.right = this.deleteRec(root.data, root.right);
    }
    return root;
  }

  minValue(root = this.root) {
    let minVal = root.data;
    while (root.left !== null) {
      minVal = root.left.data;
      root = root.left;
    }
    return minVal;
  }
  find(val, root = this.root) {
    if (root.data === val) return root;

    if (val > root.data) return this.find(val, root.right);
    if (val < root.data) return this.find(val, root.left);
  }
  levelOrder(callback = (node) => node.data, root = this.root) {
    const queue = [root];
    const result = [];
    while (queue.length !== 0) {
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      result.push(callback(queue[0]));
      queue.shift();
    }
    return result;
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
prettyPrint(sampleTree.root);

sampleTree.delete(8);
prettyPrint(sampleTree.root);

console.log(sampleTree.find(23));
console.log(sampleTree.levelOrder());
