function ListNode(val) {
    this.val = val;
    this.next = null;
}

var mergeTwoLists = function(l1, l2) {
   let currentL1 = l1;
   let currentL2 = l2;
   
   let nextVal;
   if (currentL1.val <= currentL2.val) {
       nextVal = currentL1.val;
       currentL1 = currentL1.next;
   } else {
       nextVal = currentL2.val;
       currentL2 = currentL2.next;
   }
   
   let l3 = new ListNode(nextVal);
   let currentL3 = l3;
   
   while (currentL1.next !== null && currentL2.next !== null) {
   debugger
       if (currentL1.val <= currentL2.val) {
           nextVal = currentL1.val;
           currentL1 = currentL1.next;
       } else {
           nextVal = currentL2.val;
           currentL2 = currentL2.next;
       }
       
       let newNode = new ListNode(nextVal)
       
       currentL3.next = newNode;
       currentL3 = currentL3.next;
   }
   
   return l3;
};



let l1 = new ListNode(1)
l1.next = new ListNode(2)



let l2 = new ListNode(1)
l2.next = new ListNode(3)
mergeTwoLists(l1, l2)

