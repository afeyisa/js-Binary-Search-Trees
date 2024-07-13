class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BSTree{
    #root
    constructor(){
        this.#root = null;
    }

    #creatbst(s , e ,array){

        if(s > e) return null;

        let mid =  Math.floor(( s + e ) / 2);

        let root = new Node( array[mid] );
         root.left = this.#creatbst(s, mid-1,array);
         root.right = this.#creatbst(mid+1 , e ,array);

         return root;

    }


    buildTree(array){
        let uniqueArray = [...new Set(array)].sort((a, b) => a - b);
        let s = 0;
        let e = uniqueArray.length - 1;

        this.#root = this.#creatbst(s, e ,uniqueArray);
        return this.#root;

    }


    insert(value){

        let newNode = new Node(value);
        if(!this.#root)
            {
                this.#root = newNode;
            }
        else{
            let pointer = this.#root;
            while(pointer){
                if( value < pointer.data){
                    if( !pointer.left ){
                        pointer.left = newNode;
                        break
                    }
                    pointer = pointer.left

                }
                else if(value > pointer.data){
                    if( !pointer.right ){
                        pointer.right = newNode;
                        break
                    }
                    pointer = pointer.right

                }
                else break;
            }
        }

    }



    find(value){
        let pointer = this.#root;
            while(pointer){
                if( value < pointer.data){
            
                    pointer = pointer.left

                }
                else if(value > pointer.data){
                   
                    pointer = pointer.right

                }
                else return pointer;
            }
            return null;

    }

    levelOrder(){
        let visited = []
        let levelO = []
        visited.push(this.#root);
       

        while(visited.length > 0){
            let ptr = visited.shift();
            if(ptr){
                levelO.push(ptr.data);
                visited.push(ptr.left);
                visited.push(ptr.right);
            }
        }
        return levelO;

    }


    inOrder(){
        let node = this.#root
        let arr =[]
        const traverse = (node)=>{
            if(!node)return;
            traverse(node.left);
            arr.push(node.data)
            traverse(node.right);
        }
        traverse(node);
        return arr;

    }
    preOrder(){
        let node = this.#root
        let arr =[]
        const traverse = (node)=>{
            if(!node)return;
            arr.push(node.data);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(node);
        return arr;
    }
    postOrder(){
        let node = this.#root
        let arr =[]
        const traverse = (node)=>{
            if(!node)return;
            traverse(node.left);
            traverse(node.right);
            arr.push(node.data)

        }
        traverse(node);
        return arr;

    }


    height(node){

        
        const maxDepth = (node)=>{
            if (node == null)
                return 0;
            else {
                /* compute the depth of each subtree */
               let lDepth = maxDepth(node.left);
               let rDepth = maxDepth(node.right);
         
                /* use the larger one */
                if (lDepth > rDepth)
                    return (lDepth + 1);
                else
                    return (rDepth + 1);
            }

        }
        return maxDepth(node);
      

    }

    depth(value){

        let treenode = this.#root;
        let d = 0;
        let isElement = false;
        const findDp =(treenode, node)=>{
            if(!treenode ){
                return ;
            }
            else if(treenode.data > node ){
                d++;
                findDp(treenode.left, node)

            }
            else if(treenode.data < node ){
                d++;
                findDp(treenode.right, node);

            }
            else{
                isElement = true;
                return ;
            }
        }
        findDp(treenode , value)
       return isElement ? d : -1;

       
    }
    
    isBalanced(){

        let node = this.#root;
        let b = true;
        const checkB =(node)=>{
            if(!node) return
            let hl = this.height(node.left);
            let hr = this.height(node.right);
            if(hl-hr > 1 || hl-hr < -1) {
                b = false;
                return; }
            if(b){
                checkB(node.left)
            }
            if(b){
                checkB(node.right)
            }

            }

        checkB(node)
        return b;

    }

    rebalance(){
        let node = this.#root
        let arr =[]
        const traverse = (node)=>{
            if(!node)return;
            traverse(node.left);
            arr.push(node.data)
            traverse(node.right);
        }
        traverse(node);
       this.buildTree(arr);



    }

    print(){

        let node = this.#root;
       
        const prettyPrint = (node, prefix = "", isLeft = true) => {
            if (node === null) {
              return;
            }
            if (node.right !== null) {
              prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.left !== null) {
              prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
          };
          prettyPrint(node)

    }

    
    deleteItem(value){

      
            let nodeptr = this.#root;
            let p = this.#root;
            let isleft = false;
            if( value < nodeptr.data){
            
                nodeptr = nodeptr.left;
                isleft = true

            }
            else if(value > nodeptr.data){
               
                nodeptr = nodeptr.right;
                isleft = false;

            }


            while(nodeptr){
                if( value < nodeptr.data){
            
                    nodeptr = nodeptr.left;
                    if(isleft){
                        p = p.left;

                    }
                    else p = p.right;
                    isleft = true
                   
    
                }
                else if(value > nodeptr.data){
                   
                    nodeptr = nodeptr.right;
                    if(isleft){
                        p = p.left;
                    }
                    else p = p.right;
                    isleft = false;
    
                }
                else break;
            }
           
        if(nodeptr){
            if(!nodeptr.left && !nodeptr.right){
                p.left = null;
                    
                    }
            else if(!nodeptr.left && nodeptr.right){
                console.log(p.data)
                p.right = nodeptr.right;
                }

            else if(nodeptr.left && !nodeptr.right){
                p.left =  nodeptr.left;
                }


            else if(nodeptr.left && nodeptr.right)
            {
               
                // second option, i think this is better way to delete a node!
                let parent    = nodeptr;
                let successor = nodeptr.right;

                while(successor.left)
                { 

                    parent    = successor;
                    successor = successor.left;

                }

                nodeptr.data = successor.data;

                if(successor.right){   
                    if(nodeptr === parent){
                        nodeptr.right = successor.right

                    }
                    else{
                        parent.left = successor.right;
                    }
                }
                else{
                    parent.left =  null;
                }

             
    }

    else throw(new console.error("Error attempting to delete non-existent node"));

        }
    

    }
 


}


