const { gameboardFactory } = require('./Gameboard');
const { shipFactory } = require('./Ship');

test('ships is empty object on start', () => {
    const {board} = gameboardFactory();
    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10);
})

test('can place ship on board', () => {
    const game = gameboardFactory();
    const length = 2;
    const pos = [5, 5];
    const [x, y] = pos;
    const orientation = "v";
    game.place(length, pos, orientation);
    expect(game.board[x][y].ship).toEqual(game.board[x][y+1].ship);
})

test('can hit ship', () => {
    const game = gameboardFactory();
    game.place(2, [5, 5], "h");
    game.receiveHit(6, 5);
    expect(game.board[6][5].ship.hits[1]).toBe(1);
})

test('hit can miss', () => {
    const game = gameboardFactory();
    game.receiveHit(0, 0);
    expect(game.misses[0]).toStrictEqual([0, 0])
})

test('game can report on all ships being sunk', () => {
    const game = gameboardFactory();
    game.place(1, [0, 0], "v");
    expect(game.isGameOver()).toBeFalsy();
    game.receiveHit(0, 0);
    expect(game.isGameOver()).toBeTruthy();
})

test('place refuses out of bounds placement', () => {
    const game = gameboardFactory();
    expect(() => {game.place(1, [9, 9])}).toThrow();
    expect(() => {game.place(2, [1, 9])}).toThrow();
})

test('cant place on occupied cell', () => {
    game = gameboardFactory();
    game.place(2, [1, 1]);
    expect(() => game.place(1, [1, 2])).toThrow();
})