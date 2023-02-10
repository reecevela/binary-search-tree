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
        const root = this.root;
        if (root === null) {
            return;
        }
        let deletedNode = null;
        let nodesToCheck = [root];
        if (this.root.data == data) {
            deletedNode = this.root;
        }
        //where I left off today
    }
}