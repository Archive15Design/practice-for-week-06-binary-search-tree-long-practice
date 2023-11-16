// Do not change this
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {

    constructor() {
      this.root = null;
    }

    insert(val, currentNode=this.root) {
      // empty tree base case
      if (!currentNode){
        this.root = new TreeNode(val);
        return;
      }

      // check if val is greater or lesser than currentNode
      if (val > currentNode.val) {
        // check if right side child is empty or recur insert
        let child = currentNode.right;
        if (child === null) currentNode.right = new TreeNode(val);
        else this.insert(val, currentNode.right);
      }
      else if (val < currentNode.val) {
        // check if left side child is empty or recur
        let child = currentNode.left;
        if (child === null) currentNode.left = new TreeNode(val);
        else this.insert(val, currentNode.left);
      }

    }

    search(val) {
      let currentNode = this.root;

      // iterate through tree until a null child is found.
      while (currentNode !== null) {
        // return true if currentNode has desired value
        if (currentNode.val === val) return true;

        // determine next node by comparing nodes value to target value
        if (currentNode.val < val) currentNode = currentNode.right;
        else if (currentNode.val > val) currentNode = currentNode.left;
      }

      return false;
    }


    preOrderTraversal(currentNode = this.root) {
      if (!currentNode) return;

      console.log(currentNode.val);

      this.preOrderTraversal(currentNode.left);
      this.preOrderTraversal(currentNode.right);
    }


    inOrderTraversal(currentNode = this.root) {
      if (!currentNode) return;

      this.inOrderTraversal(currentNode.left);
      console.log(currentNode.val);
      this.inOrderTraversal(currentNode.right);
    }


    postOrderTraversal(currentNode = this.root) {
      if (!currentNode) return;

      this.postOrderTraversal(currentNode.left);
      this.postOrderTraversal(currentNode.right);
      console.log(currentNode.val);
    }

      // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      let queueu = [];
      queueu.push(this.root);
      let currentNode;

      while (queueu.length > 0) {
        currentNode = queueu.shift();
        if (!currentNode) continue;

        console.log(currentNode.val);
        queueu.push(currentNode.left);
        queueu.push(currentNode.right);
      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      let stack = [];
      stack.push(this.root);
      let currentNode;

      while (stack.length > 0){
        currentNode = stack.pop();
        if (!currentNode) continue;

        console.log(currentNode.val);

        stack.push(currentNode.left);
        stack.push(currentNode.right);
      }
  }
  }

  module.exports = { BinarySearchTree, TreeNode };
