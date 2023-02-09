import Tree from './Tree';
import prettyPrint from './PrettyPrint';
const {log} = console;

const inputArray = [95, 52, 98, 90, 61, 94, 6, 64, 44, 26, 88, 82];

const testTree = new Tree(inputArray);

log(testTree.root);

prettyPrint(testTree.root);
