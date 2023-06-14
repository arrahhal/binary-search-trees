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
    if (!root) {
      this.root = new Node(val);
    }
    if (val > root.data) {
      if (!root.right) {
        root.right = new Node(val);
        return;
      }
      this.insert(val, root.right);
    }
    if (val < root.data) {
      if (!root.left) {
        root.left = new Node(val);
        return;
      }
      this.insert(val, root.left);
    }
    return;
  }
  delete(val, root = this.root) {
    if (!root) {
      return null;
    }
    if (root.data < val) {
      root.right = this.delete(val, root.right);
      return root;
    }
    if (root.data > val) {
      root.left = this.delete(val, root.left);
      return root;
    }
    // root.data === val, so it needs to be deleted
    if (!root.left) {
      return root.right;
    }
    if (!root.right) {
      return root.left;
    }
    // Replace the value of the node to be deleted with the smallest value in its right subtree
    const minValue = this.minValue(root.right);
    root.data = minValue;
    // Delete the node with the smallest value in the right subtree
    root.right = this.delete(minValue, root.right);
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
    if (root === null) return null;
    if (root.data === val) return root;
    if (val > root.data) return this.find(val, root.right);
    if (val < root.data) return this.find(val, root.left);
  }
  levelOrder(callback) {
    if (!this.root) {
      if (callback) return;
      return [];
    }
    const queue = [this.root];
    const values = [];
    while (queue.length) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
    }
    if (!callback) {
      return values;
    }
  }
  preOrder(callback, root = this.root) {
    if (!root) return [];
    callback && callback(root);
    const left = this.preOrder(callback, root.left);
    const right = this.preOrder(callback, root.right);
    if (!callback) return [root.data, ...left, ...right];
  }
  inOrder(callback, root = this.root) {
    if (!root) return [];
    const left = this.inOrder(callback, root.left);
    callback && callback(root);
    const right = this.inOrder(callback, root.right);
    if (!callback) return [...left, root.data, ...right];
  }
  postOrder(callback, root = this.root) {
    if (!root) return [];
    const left = this.postOrder(callback, root.left);
    const right = this.postOrder(callback, root.right);
    callback && callback(root);
    if (!callback) return [...left, ...right, root.data];
  }
  height(node = this.root) {
    if (!node) return -1;
    const rightHeight = this.height(node.right);
    const leftHeight = this.height(node.left);
    return Math.max(rightHeight, leftHeight) + 1;
  }
  depth(node = this.root) {
    return this.height() - this.height(node);
  }
  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    }
    return false;
  }
  rebalance() {
    const currentTreeArr = this.inOrder();
    this.root = buildTree(currentTreeArr);
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

console.log('delete 8 from tree');
sampleTree.delete(8);
prettyPrint(sampleTree.root);

console.log('find node with value 67');
console.log(sampleTree.find(67));

console.log('levelOrder traversal array');
console.log(sampleTree.levelOrder());

console.log('preOrder traversal array');
console.log(sampleTree.preOrder());

console.log('postOrder traversal array');
console.log(sampleTree.postOrder());

console.log('inOrder traversal array');
console.log(sampleTree.inOrder());

console.log('tree height is');
console.log(sampleTree.height());

console.log('node with value of 4 depth is');
console.log(sampleTree.depth(sampleTree.find(4)));

console.log('delete node(23)');
sampleTree.delete(23);
prettyPrint(sampleTree.root);
console.log('check if the tree is balanced');
console.log(sampleTree.isBalanced());

// console.log('return 23 then check if tree is balanced');
// sampleTree.insert(23);
// prettyPrint(sampleTree.root);
// console.log(sampleTree.isBalanced());

console.log('reBalance the tree then check if balance');
sampleTree.rebalance();
prettyPrint(sampleTree.root);
console.log(sampleTree.isBalanced());

console.log('insert val = 90');
sampleTree.insert(90);
prettyPrint(sampleTree.root);
