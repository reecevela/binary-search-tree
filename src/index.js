import Tree from './Tree';
import prettyPrint from './PrettyPrint';
const {log} = console;

function generateRandomNumbers(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

const randomNumbers = generateRandomNumbers(25);
const testTree = new Tree(randomNumbers);

log(testTree.root);

prettyPrint(testTree.root);

log("Is the tree balanced?", testTree.isBalanced());
log("Level order:", testTree.levelOrder());
log("Preorder:", testTree.preorder());
log("Post order:", testTree.postorder());
log("In order:", testTree.inorder());

// Unbalance the tree
testTree.insert(101);
testTree.insert(102);
testTree.insert(103);
testTree.insert(104);
testTree.insert(105);

// Rebalance the tree
testTree.rebalance();

log("Is the tree balanced after rebalancing?", testTree.isBalanced());
log("Level order after rebalancing:", testTree.levelOrder());
log("Pre order after rebalancing:", testTree.preorder());
log("Post order after rebalancing:", testTree.postorder());
log("In order after rebalancing:", testTree.inorder());