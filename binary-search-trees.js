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
  levelOrder(callback) {
    if (!this.root) return [];
    const queue = [this.root];
    const results = [];
    while (queue.length !== 0) {
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      if (callback) callback(queue[0]);
      else results.push(queue[0].data);
      queue.shift();
    }
    if (!callback) return results;
  }
  preOrder(callback, root = this.root) {
    if (!root) return [];
    if (callback) callback(root);
    const left = this.preOrder(callback, root.left);
    const right = this.preOrder(callback, root.right);
    if (!callback) return [root.data, ...left, ...right];
  }
  inOrder(callback, root = this.root) {
    if (!root) return [];
    const left = this.inOrder(callback, root.left);
    if (callback) callback(root);
    const right = this.inOrder(callback, root.right);
    if (!callback) return [...left, root.data, ...right];
  }
  postOrder(callback, root = this.root) {
    if (!root) return [];
    const left = this.postOrder(callback, root.left);
    const right = this.postOrder(callback, root.right);
    if (callback) callback(root);
    if (!callback) return [...left, ...right, root.data];
  }
  height(node = this.root) {
    if (!node) return -1;
    const right = this.height(node.right);
    const left = this.height(node.left);
    return left > right ? left + 1 : right + 1;
  }
  depth(node = this.root) {
    return this.height() - this.height(node);
  }
  isBalanced(node = this.root) {
    if (!node) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      const left = this.isBalanced(node.left);
      const right = this.isBalanced(node.right);
      return left ? right : left;
    }
    return false;
  }
  rebalance() {
    const currentTree = this.inOrder();
    this.root = buildTree(currentTree);
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
console.log(sampleTree.depth(sampleTree.find(3)));

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
