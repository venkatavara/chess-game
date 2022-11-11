let chessBoard = document.getElementById("chessBoard");
x=1;y=1;

for(let i =1;i<65;i++){

    let box = document.createElement("div");
    let img = document.createElement("img");
    //  img.setAttribute("src","#");
    img.classList.add("imgPiece");
    img.setAttribute("alt","");
    box.appendChild(img);
    box.setAttribute("class","chessBoxs")
    box.classList.add("box");
    box.setAttribute("data-xindex",x);
    box.setAttribute("data-yindex",y);
    chessBoard.appendChild(box);
    // box.innerText="("+x+","+y+")";
    if((x+y)%2==0){
        box.style.backgroundColor=" rgb(110, 21, 14)"
    }
    else{
        box.style.backgroundColor=" rgb(193, 150, 85)"
    }

    
    x++;
    if(x>8){
        x=1;
        y++;
    }
}

const showMoves = (piece)=>{
    const moves = piece.moves;
    moves.forEach(m=>{
        for(const box of boxes){
            if(m.x == box.dataset.xindex && m.y == box.dataset.yindex){
                if(box.dataset.color ==piece.color){
                    box.classList.add("cantkill")
                }
                else{
                    box.classList.add("cankill")

                }
                if(box.dataset.color ==""|| box.dataset.color == null||box.dataset.color==undefined){
                    box.classList.remove("cankill")
                    box.classList.add("possibleMove")

                }
                
            }
        }
    })
}
const resetPossibleMoves = (piece) =>{
    const moves = piece.moves;
    moves.forEach(m=>{
        for(const box of boxes){
        
            if(m.x == box.dataset.xindex && m.y == box.dataset.yindex){
                box.classList.remove("possibleMove");
                box.classList.remove("cantkill")
                box.classList.remove("cankill")
            }
        }
    })

}


class piece  {
        constructor(color,name,initialX,initialY,image){

            this.name = name;
            this.image = image;
            this.color = color;
            this.initialpos = {
                x:initialX,
                y:initialY
            }
            this.currentpos = {
                x:initialX,
                y:initialY
            };
            this.image = image;
            this.moves=[];
            
           

        }
    }
    class Pawn extends piece{
        constructor(color,name,initialX,initialY,image){
            super(color,name,initialX,initialY,image);
        }

        getPossibleMoves=()=>{
            if(this.color=="black"){
                this.moves.push({
                    x:this.currentpos.x,
                    y:this.currentpos.y + 1

                })
            }
            else{
                this.moves.push({
                    x:this.currentpos.x,
                    y:this.currentpos.y - 1
                })
            }
            showMoves(this)
        }

    }
    class Rook extends piece{
        constructor(color,name,initialX,initialY,image){
            super(color,name,initialX,initialY,image);
        }

        getPossibleMoves=()=>{
            if(this.moves.length){
                validateRookMoves(this);
                showMoves(this);
                return;
            }
            let x = 7,y=7;
            while(x>0){
                let newX = this.currentpos.x+x;
                if(newX>8){
                    newX-=8;

                }
                this.moves.push({
                    x:newX,
                    y:this.currentpos.y
                });
                x--;
            }
            while(y>0){
                let newY = this.currentpos.y+y;
                if(newY>8){
                    newY-=8;
                }
                this.moves.push({
                    x:this.currentpos.x,
                    y:newY
                });
                y--;
            }
            validateRookMoves(this);
            showMoves(this);
        }
        

    }
    class Knight extends piece{
        constructor(color,name,initialX,initialY,image){
            super(color,name,initialX,initialY,image);
        }
        getPossibleMoves = ()=>{
            let newX,newY;
            newX = this.currentpos.x+2;
            newY = this.currentpos.y-1;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            newX = this.currentpos.x+2;
            newY = this.currentpos.y+1;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            newX = this.currentpos.x-2;
            newY = this.currentpos.y-1;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            newX = this.currentpos.x-2;
            newY = this.currentpos.y+1;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            newX = this.currentpos.x+1;
            newY = this.currentpos.y+2;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            newX = this.currentpos.x-1;
            newY = this.currentpos.y+2;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            newX = this.currentpos.x+1;
            newY = this.currentpos.y-2;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            newX = this.currentpos.x-1;
            newY = this.currentpos.y-2;
            if(newX > 0 && newX < 9 && newY > 0 && newY < 9)this.moves.push({x:newX,y:newY});
            showMoves(this);
        }
    }
    class Bishop extends piece{
        constructor(color,name,initialX,initialY,image){
            super(color,name,initialX,initialY,image);
        }
       getPossibleMoves=()=>{
        if(this.moves.length){
            showMoves(this);
            return;
        }
        let x =7;y=1;
        let newX,newY;
        while(x>0){
            newX = this.currentpos.x+x;
            newY = this.currentpos.y+x;
            if(newX>0&&newX<9&&newY>0&&newY<9){
                this.moves.push({x:newX,y:newY});
            }
            x--;

        }
        while(y<7){
            newX = this.currentpos.x-y;
            newY = this.currentpos.y-y;
            if(newX>0&&newX<9&&newY>0&&newY<9){
                this.moves.push({x:newX,y:newY});
            }
            y++;

        }
        x=7,y=1;
        while(y<7){
            newX = this.currentpos.x+y;
            newY = this.currentpos.y-y;
            if(newX>0&&newX<9&&newY>0&&newY<9){
                this.moves.push({x:newX,y:newY});
            }
            y++;

        }
       
        while(x>0){
            newX = this.currentpos.x-x;
            newY = this.currentpos.y+x;
            if(newX>0&&newX<9&&newY>0&&newY<9){
                this.moves.push({x:newX,y:newY});
            }
            x--;

        }
        showMoves(this);
    
       }
    }
    class Queen extends piece{
        constructor(color,name,initialX,initialY,image){
            super(color,name,initialX,initialY,image);
        }
        getPossibleMoves=()=>{
            if(this.moves.length){
                showMoves(this);
                return;
            }
            let x =7;y=1;
            let newX,newY;
            while(x>0){
                newX = this.currentpos.x+x;
                newY = this.currentpos.y+x;
                if(newX>0&&newX<9&&newY>0&&newY<9){
                    this.moves.push({x:newX,y:newY});
                }
                x--;
    
            }
            while(y<7){
                newX = this.currentpos.x-y;
                newY = this.currentpos.y-y;
                if(newX>0&&newX<9&&newY>0&&newY<9){
                    this.moves.push({x:newX,y:newY});
                }
                y++;
    
            }
            x=7,y=1;
            while(y<7){
                newX = this.currentpos.x+y;
                newY = this.currentpos.y-y;
                if(newX>0&&newX<9&&newY>0&&newY<9){
                    this.moves.push({x:newX,y:newY});
                }
                y++;
    
            }
           
            while(x>0){
                newX = this.currentpos.x-x;
                newY = this.currentpos.y+x;
                if(newX>0&&newX<9&&newY>0&&newY<9){
                    this.moves.push({x:newX,y:newY});
                }
                x--;
    
            }

             x = 7,y=7;
            while(x>0){
                let newX = this.currentpos.x+x;
                if(newX>8){
                    newX-=8;

                }
                this.moves.push({
                    x:newX,
                    y:this.currentpos.y
                });
                x--;
            }
            while(y>0){
                let newY = this.currentpos.y+y;
                if(newY>8){
                    newY-=8;
                }
                this.moves.push({
                    x:this.currentpos.x,
                    y:newY
                });
                y--;
            }
    }
}
    class King extends piece{
        constructor(color,name,initialX,initialY,image){
            super(color,name,initialX,initialY,image);
        }
        getPossibleMoves = () => {
            let newX, newY;
            newX = this.currentpos.x - 1;
            newY = this.currentpos.y - 1;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            newX = this.currentpos.x - 1;
            newY = this.currentpos.y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            newX = this.currentpos.x - 1;
            newY = this.currentpos.y + 1;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            newX = this.currentpos.x;
            newY = this.currentpos.y - 1;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            newX = this.currentpos.x;
            newY = this.currentpos.y + 1;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            newX = this.currentpos.x + 1;
            newY = this.currentpos.y + 1;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            newX = this.currentpos.x + 1;
            newY = this.currentpos.y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            newX = this.currentpos.x + 1;
            newY = this.currentpos.y - 1;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            showMoves(this);
        }
    


    }
     const pb1 = new Pawn("black","Black pawn",1,2,"./media/b_pawn.svg")
     const pb2 = new Pawn("black","Black pawn",2,2,"./media/b_pawn.svg")
     const pb3 = new Pawn("black","Black pawn",3,2,"./media/b_pawn.svg")
     const pb4 = new Pawn("black","Black pawn",4,2,"./media/b_pawn.svg")
     const pb5 = new Pawn("black","Black pawn",5,2,"./media/b_pawn.svg")
     const pb6 = new Pawn("black","Black pawn",6,2,"./media/b_pawn.svg")
     const pb7 = new Pawn("black","Black pawn",7,2,"./media/b_pawn.svg")
     const pb8 = new Pawn("black","Black pawn",8,2,"./media/b_pawn.svg")

     const pw1 = new Pawn("white","White pawn",1,7,"./media/w_pawn.svg")
     const pw2 = new Pawn("white","White pawn",2,7,"./media/w_pawn.svg")
     const pw3 = new Pawn("white","White pawn",3,7,"./media/w_pawn.svg")
     const pw4 = new Pawn("white","White pawn",4,7,"./media/w_pawn.svg")
     const pw5 = new Pawn("white","White pawn",5,7,"./media/w_pawn.svg")
     const pw6 = new Pawn("white","White pawn",6,7,"./media/w_pawn.svg")
     const pw7 = new Pawn("white","White pawn",7,7,"./media/w_pawn.svg")
     const pw8 = new Pawn("white","White pawn",8,7,"./media/w_pawn.svg")

     const rook1 =new Rook("black","Black Rook",1,1,"./media/b_rook.svg")
     const rook2 =new Rook("black","Black Rook",8,1,"./media/b_rook.svg")
     const rook3 =new Rook("white","White Rook",1,8,"./media/w_rook.svg")
     const rook4 =new Rook("white","White Rook",8,8,"./media/w_rook.svg")

     const knight1 = new Knight("black","Black Knight",2,1,"./media/b_knight.svg")
     const knight2 = new Knight("black","Black Knight",7,1,"./media/b_knight.svg")
     const knight3 = new Knight("white","White Knight",2,8,"./media/w_knight.svg")
     const knight4 = new Knight("white","White Knight",7,8,"./media/w_knight.svg")

     const  Bishop1 = new  Bishop ("black","Black Bishop",3,1,"./media/b_bishop.svg")
     const  Bishop2 = new  Bishop ("black","Black Bishop",6,1,"./media/b_bishop.svg")
     const  Bishop3 = new  Bishop ("white","White Bishop",3,8,"./media/w_bishop.svg")
     const  Bishop4 = new  Bishop ("white","White Bishop",6,8,"./media/w_bishop.svg")

     const  queen1 = new  Queen ("black","Black Queen",4,1,"./media/b_queen.svg")
     const  queen2 = new  Queen ("white","White Queen",4,8,"./media/w_queen.svg")

     const  king1 = new  King ("black","Black King",5,1,"./media/b_king.svg")
     const  king2 = new  King ("white","White King",5,8,"./media/w_king.svg")



     
     const boxes = document.getElementsByClassName("box");
     const piecArr = [pb1,pb2,pb3,pb4,pb5,pb6,pb7,pb8,pw1,pw2,pw3,pw4,pw5,pw6,pw7,pw8,rook1,rook2,rook3,rook4,knight1,knight2,knight3,knight4,Bishop1,Bishop2,Bishop3,Bishop4,queen1,queen2, king1, king2 ];


     piecArr.forEach(p =>{
        for(const box of boxes){
            if(p.initialpos.x ==box.dataset.xindex && p.initialpos.y == box.dataset.yindex){
                box.firstChild.setAttribute("src",p.image);
                box.setAttribute("data-name",p.name);
                box.setAttribute("data-color",p.color);
                box.addEventListener("mouseenter",p.getPossibleMoves);
                box.addEventListener("mouseleave",()=>resetPossibleMoves(p));

            
            }
        }
     });
     const findDistance=(a,b)=>{
        return Math.sqrt((Math.pow((a.x-b.x),2)+Math.pow((a.y-b.y),2)));
    }
    
    const validateRookMoves=(piece)=>{
        let current=piece.currentPos;
        let moves=piece.moves;
        moves=moves.sort((a,b)=>findDistance(a,current)-findDistance(b,current));
        let directions={
            up:[],
            down:[],
            left:[],
            right:[]
        }
    
        moves.forEach(m=>{
            if(m.y>current.y&&m.x==current.x){
                directions.down=[...directions.down,m]
            }
            if(m.y<current.y&&m.x==current.x){
                directions.up=[...directions.up,m]
            }
            if(m.y==current.y&&m.x>current.x){
                directions.right=[...directions.right,m]
            }
            if(m.y==current.y&&m.x>current.x){
                directions.left=[...directions.left,m]
            }
        })
        console.log(directions);
    }

     


    
    


   


