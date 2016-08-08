/*
 *Given an array arr of length n where each element is at most k places away from its sorted position,
 *Plan and code an efficient algorithm to sort arr.
 *Analyze the runtime and space complexity of your solution.
 */

(function(){
    'use strict';

    function Heap (arr) {
        this.content = [null];
        if (arr) arr.forEach(this.insert.bind(this));
    };

    Heap.prototype = {
        // returns the top val and sets it after
        peak: function(data) {return this.content[1]},
        insert: function(data) {
            this.bubble(this.content.push(data) - 1);
        },
        popMin: function() {
            var topVal = thisl.content[1];
            this.content[1] = this.content.pop();
            this.sink(1);
            return topVal;
        },
        bubble: function(i) {
            var parentIndex = Math.floor(i/2);
            if (this.content[parentIndex] > this.content[i]) {
                this.swap(i, parentIndex);
                this.bubble(parentIndex);
            }
        },
        sink: function(i) {
            var leftLesser = this.content[i*2] < this.content[i*2+1];
            var childIndex = leftLesser ? i*2 : i*2+1;

            if (this.content[childIndex] < this.content[i]) {
                this.swap(i, childIndex);
                this.sink(i);
            }
        },
        swap: function(i,j) {
            if (j<0) j += this.content.length;
            this.content[i] ^= this.content[j];
            this.content[j] ^= this.content[i];
            this.content[i] ^= this.content[j];
        }
    };
    
    function kHeapSort(arr, k) {
        var h = new Heap([]);
        n = arr.length;
        for (var i=0; i<k; i++) {
            h.insert(arr[i]);
        }
        for (var j=k+1; j<n-1; j++) {
            arr[i-(k+1)] = h.popMin();
            h.insert(arr[i]);
        }
        for (var z=0; z<k, z++) {
            arr[n-k-1 + z] = h.popMin();
        }
        return arr;
    };

})();

/*
 *Runtime complexity:
 *Building a heap takes linear O(k) for k+1 elements.
 *Operating the heap later involves extracting min on a min-heap / inserting to the heap. These actions take O(log k) each. We do at least one of these actions n times, so the cost here is O(n • log k).
 *the overall runtime complexity of the heap solution is O(n • log k). again, if k is constant, we may argue the complexity is close to linear.
 *
 *Space complexity:
 *we need to hold a min heap of  k+1 elements.
 *Since a heap is usually implemented with an array the space complexity is O(k+1).
 *However, we can implement and maintain the heap manually on our conceptual sliding window subarray. If we handled right, it can lead us to a constant O(1) space complexity.
 */
