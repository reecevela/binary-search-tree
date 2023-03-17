import Node from "./Node";

export default class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }
    buildTree(arr) {
        // sort array and remove duplicates
        arr.sort(function(a, b) {
            return a - b;
        });
        let duplicates = [];
        let newArr = [];
        let i = 0;
        while (i < arr.length) {
            if (duplicates.indexOf(arr[i]) == -1) {
                newArr.push(arr[i]);
            }
            duplicates.push(arr[i]);
            i++;
        }
        
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = new Node(newArr[i]);
        }

        arr = newArr;

        function splitArrEvenly(nodes, start, end) {
            if (start > end) {
                return null;
            }
            let midpoint = Math.ceil((start + end) / 2)
            let middleNode = nodes[midpoint];

            middleNode.left = splitArrEvenly(nodes, start, midpoint - 1);
            middleNode.right = splitArrEvenly(nodes, midpoint + 1, end);

            return middleNode;
        }
        this.root = splitArrEvenly(arr, 0, arr.length - 1);

        return this.root;
    }
    insert(data) {
        const newNode = new Node(data);
        const root = this.root;
        if (root === null) {
            this.root = newNode;
        }
        let current = root;
        let done = false;
        while (!done) {
            if (newNode.data < current.data) {
                if (current.left) {
                    current = current.left;
                } else {
                    current.left = newNode;
                    done = true;
                    current = root;
                }
            } else {
                if (current.right) {
                    current = current.right;
                } else {
                    current.right = newNode;
                    done = true;
                    current = root;
                }
            }
        }
    }
    delete(data) {
        if (this.root === null) {
            return;
        }
    
        let current = this.root;
        let parent = null;
        let isLeftChild = false;
    
        // Find the node to delete and its parent
        while (current && current.data !== data) {
            parent = current;
            if (data < current.data) {
                current = current.left;
                isLeftChild = true;
            } else {
                current = current.right;
                isLeftChild = false;
            }
        }
    
        // If the node is not found
        if (current === null) {
            return;
        }
    
        // Case 1: Node with no children
        if (!current.left && !current.right) {
            if (current === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        // Case 2: Node with one child (left child)
        else if (!current.right) {
            if (current === this.root) {
                this.root = current.left;
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        }
        // Case 3: Node with one child (right child)
        else if (!current.left) {
            if (current === this.root) {
                this.root = current.right;
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }
        // Case 4: Node with two children
        else {
            // Find the minimum value node in the right subtree
            let minRight = current.right;
            let minRightParent = current;
    
            while (minRight.left) {
                minRightParent = minRight;
                minRight = minRight.left;
            }
    
            // Replace the current node's data with the minimum value node's data
            current.data = minRight.data;
    
            // Remove the minimum value node from the right subtree
            if (minRightParent === current) {
                minRightParent.right = minRight.right;
            } else {
                minRightParent.left = minRight.right;
            }
        }
    }
    
    find(value) {
        let current = this.root;
        while (current) {
            if (value === current.data) {
                return current;
            } else if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }
    levelOrder(fn) {
        let result = [];
        let queue = [this.root];
    
        while (queue.length) {
            let node = queue.shift();
            if (fn) {
                fn(node);
            } else {
                result.push(node.data);
            }
    
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        return result;
    }
    inorder(fn, node = this.root) {
        let result = [];
    
        if (node) {
            result = result.concat(this.inorder(fn, node.left));
            if (fn) {
                fn(node);
            } else {
                result.push(node.data);
            }
            result = result.concat(this.inorder(fn, node.right));
        }
        return result;
    }
    preorder(fn, node = this.root) {
        let result = [];
    
        if (node) {
            if (fn) {
                fn(node);
            } else {
                result.push(node.data);
            }
            result = result.concat(this.preorder(fn, node.left));
            result = result.concat(this.preorder(fn, node.right));
        }
        return result;
    }
    postorder(fn, node = this.root) {
        let result = [];
    
        if (node) {
            result = result.concat(this.postorder(fn, node.left));
            result = result.concat(this.postorder(fn, node.right));
            if (fn) {
                fn(node);
            } else {
                result.push(node.data);
            }
        }
        return result;
    }
    height(node) {
        if (!node) {
            return -1;
        }
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
    depth(node, current = this.root) {
        if (!node || !current) {
            return -1;
        }
        if (node.data < current.data) {
            return 1 + this.depth(node, current.left);
        } else if (node.data > current.data) {
            return 1 + this.depth(node, current.right);
        } else {
            return 0;
        }
    }
    isBalanced(node = this.root) {
        if (!node) {
            return true;
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right)
        );
    }
    rebalance() {
        const nodes = this.inorder();
        this.root = this.buildTree(nodes);
    }    
}