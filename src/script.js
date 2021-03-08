document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];

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
    function dragEnd(){
        console.log(this.id, 'dragend')
    }
    function dragOver(){
        console.log(this.id, 'dragOver')
    }
    function dragEnter(){
        console.log(this.id, 'dragEnter')
    }
    function dragLeave(){
        console.log(this.id, 'dragLeave')
    }
    function dragDrop(){
        console.log(this.id, 'dragdrop');
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id)
        squares[squareBeingDragged].style.backgroundColor = colorBeingReplaced;
    }
})