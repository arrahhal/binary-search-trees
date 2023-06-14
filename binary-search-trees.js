class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(arr = []) {
    const uniqueArr = [...new Set(arr)].sort((a, b) => a - b);
    const build = (start, end) => {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);
      const node = new Node(uniqueArr[mid]);
      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);
      return node;
    };
    return build(0, uniqueArr.length - 1);
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
    const minValue = this.minValueNode(root.right).data;
    root.data = minValue;
    // Delete the node with the smallest value in the right subtree
    root.right = this.delete(minValue, root.right);
    return root;
  }
  minValueNode(root = this.root) {
    let current = root;
    while (current.left) {
      current = root.left;
    }
    return current;
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
    this.root = this.buildTree(currentTreeArr);
  }
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
