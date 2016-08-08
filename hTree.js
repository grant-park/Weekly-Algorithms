/*
 * Construct an H-tree, given its center (x and y coordinates), 
 * starting_length and depth. You can assume that you have a drawLine method. 
 * 
 */
(function(){
    'use strict';

    function drawLine(xOne, yOne, xTwo, yTwo) {
        // draws line, assume implementation available
    };

    function drawHTree(x,y,length,depth) {
        if (depth === 0) return;

        var root2 = Math.sqrt(2);
        var sidesLength = length/root2;
        var x0 = x - length/2,
            x1 = x + length/2,
            y0 = y - sidesLength/2,
            y1 = y + sidesLength/2;
        
        // draw initial 'H'
        drawLine(x0,y0,x0,y1);
        drawLine(x1,y0,x1,y1);
        drawLine(x0,y,x1,y);

        var newLength = sidesLength/root2;
        drawHTree(x0,y1,newLength,depth-1);
        drawHTree(x0,y0,newLength,depth-1);
        drawHTree(x1,y1,newLength,depth-1);
        drawHTree(x1,y0,newLength,depth-1);
    };

})();
/*
 * Runtime Complexity: Every call of drawHTree invokes 9 expressions of O(1) 
 * and 4 calls of drawHTree until depth (denoted as D) reaches 0, 
 * therefore T(D) = 9 + 4 * T(D-1), meaning T(D) = O(4^D), 
 * where T is the time complexity function and D is the depth of the H-Tree.
 * 
 * Space Complexity: Recursive calls will add overhead since we store 
 * recursive calls in the execution stack. The space occupied in the 
 * stack will be O(D) in the worst case scenario. The stack space occupied 
 * will be no more than O(D) since a sibling drawHTree will not called before
 * the current one being executed returns (i.e. finishes its execution).
 */


