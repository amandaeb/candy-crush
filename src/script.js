document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;

    const candyColor = [
        'orangered',
        'yellow',
        'orange',
        'darkorchid',
        'springgreen',
        'dodgerblue'
    ]
    //create board
    function createBoard(){
        for (let i = 0; i < width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColor.length)
            square.style.backgroundColor = candyColor[randomColor]
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

    //drag the candy
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(){
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }

    function dragOver(e){
        e.preventDefault()
        console.log(this.id, 'dragOver')
    }
    function dragEnter(e){
        e.preventDefault()
        console.log(this.id, 'dragEnter')
    }
    function dragLeave(){
        console.log(this.id, 'dragLeave')
    }
    function dragDrop(){
        console.log(this.id, 'dragdrop');
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

    function dragEnd(){
        console.log(this.id, 'dragend')
        //what is a valid move
        let validMoves = [
            squareIdBeingDragged -1, squareIdBeingDragged -width, squareIdBeingDragged +1, 
            squareIdBeingDragged +width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced);
        
        if(squareIdBeingReplaced && validMove){
            squareIdBeingReplaced = null
        }else if (squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }

    //checking for matches
    //check for row of three 20.32
    function checkRowForThree(){
        for (i = 0; i < 61; i++){
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';
            
            if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score += 3;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    checkRowForThree();

    function checkColumnForThree(){
        for (i = 0; i < 47; i++){
            let columnOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score += 3;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    checkColumnForThree();

    window.setInterval(function(){
        checkRowForThree()
        checkColumnForThree()
    }, 100);
});