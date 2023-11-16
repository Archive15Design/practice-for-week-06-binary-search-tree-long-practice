const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  // base case, return current value if left child is empty
  if (rootNode.left === null) return rootNode.val;
  // recursive call to find deepest left node
  else return findMinBST(rootNode.left);

}

function findMaxBST (rootNode) {
  //base case, return if right child is null
  if (rootNode.right === null) return rootNode.val;
  //recursive call to traverse deeper to the right
  else return findMaxBST(rootNode.right);
}

function findMinBT (rootNode) {
  let queueu = [];
  queueu.push(rootNode);
  let currentNode;
  let min = rootNode.val;

  while (queueu.length > 0) {
    currentNode = queueu.shift();
    if (!currentNode) continue;

    if (currentNode.val < min) min = currentNode.val;
    queueu.push(currentNode.left);
    queueu.push(currentNode.right);
  }
  return min;
}

function findMaxBT (rootNode) {
  let stack = [];
  stack.push(rootNode);
  let currentNode;
  let max = rootNode.val;

  while (stack.length > 0) {
    currentNode = stack.pop();
    if (!currentNode) continue;

    if (currentNode.val > max) max = currentNode.val;
    stack.push(currentNode.right);
    stack.push(currentNode.left);
  }

  return max;
}

function getHeight (rootNode) {
  if (!rootNode)
    return -1;
  else if(rootNode.left === null && rootNode.right === null)
    return 0;
  else {

    let lDepth = getHeight(rootNode.left);
    let rDepth = getHeight(rootNode.right);

    if (lDepth > rDepth)
      return (lDepth + 1);
    else
      return (rDepth + 1);
  }
}

function balancedTree (rootNode) {

  if (!rootNode) return true;

  let lDepth = getHeight(rootNode.left);
  let rDepth = getHeight(rootNode.right);

  let balance;
  if (lDepth < rDepth)
    balance = rDepth - lDepth;
  else
    balance = lDepth - rDepth;

  if (
    balance <= 1
    && balancedTree(rootNode.left) === true
    && balancedTree(rootNode.right) === true
    )
    return true;
  else
    return false;

}

function countNodes (rootNode) {
  if (!rootNode) return 0;

  let nodeCount = 1;
  nodeCount += countNodes(rootNode.left);
  nodeCount += countNodes(rootNode.right);
  return nodeCount;
}

function getParentNode (rootNode, target) {

  if (!rootNode) return;
  if (rootNode.val === target) return null;

  let leftChild, rightChild;
  if (rootNode.left) {
    leftChild = rootNode.left.val;
  }
  if (rootNode.right){
    rightChild = rootNode.right.val;
  }

  if (leftChild === target || rightChild === target) return rootNode;

  let left, right;

  if (rootNode.left) {
    left = getParentNode(rootNode.left, target);
  }
  if (rootNode.right){
    right = getParentNode(rootNode.right, target);
  }

  if (left) return left;
  else if (right) return right;
  else return;

}

function inOrderPredecessor (rootNode, target) {
  if (!rootNode) return null;

  let stack = [rootNode];
  let current = rootNode;
  let prev = null;

  while (current || stack.length > 0) {

    // push all left-most values onto stack
    while (current){
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();

    // check if node is first in-order node
    if (current.val === target && prev === null) return null;

    // check if current node is target
    if (current.val === target)
      // return previous val
      return prev.val;

    // if no match is found, set prev and iterate to the right.
    prev = current;
    current = current.right;

  }

}

function search(rootNode, target) {
  let currentNode = rootNode;

  // iterate through tree until a null child is found.
  while (currentNode !== null) {
    // return true if currentNode has desired value
    if (currentNode.val === target) return true;

    // determine next node by comparing nodes value to target value
    if (currentNode.val < target) currentNode = currentNode.right;
    else if (currentNode.val > target) currentNode = currentNode.left;
  }

  return false;
}

function deleteNodeBST(rootNode, target) {
  let parent;

  // Do a traversal to find the node. Keep track of the parent
  if (search(rootNode, target))
    parent = getParentNode(rootNode, target);
  // Undefined if the target cannot be found
  else {
    return undefined;
  }

  // Set target based on parent
  let directionChild;
  if (!parent) target = rootNode;
  else if (parent.left && parent.left.val === target) {
    target = parent.left;
    directionChild = 'left';
  }
  else {
    target = parent.right;
    directionChild = 'right';
  }


  // Case 0: Zero children and no parent:
  if (parent === null && (target.left === null && target.right === null))
  //   return null
    return null;

  // Case 1: Zero children:
  if (target.left === null && target.right === null) {
    //   Set the parent that points to it to null
    if (parent.left.val === target.val) parent.left = null;
    else parent.right = null;
  }

  // Case 2: Two children:
  else if (target.left && target.right) {
    let successor = findMinBST(target.right);
    deleteNodeBST(rootNode, successor);
    target.val = successor;
  }

  // Case 3: One child:
  else if ( (target.left && !target.right) || (!target.left && target.right) ) {
      // find child
      let child;
      if (target.left)
        child = target.left;
      else
        child = target.right;

      //   Make the parent point to the child
      if (directionChild === 'left')
        parent.left = child;
      else
        parent.right = child;

  }

}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
