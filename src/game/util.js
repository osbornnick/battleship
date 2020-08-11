function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function createBoard() {
    let board = createArray(10, 10);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board[j][i] = {ship: false, indexInShip: null}
        }   
    }
    return board
}

module.exports = { createArray, createBoard };