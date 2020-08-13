const { gameboardFactory } = require('./Gameboard');
const { shipFactory } = require('./Ship');

test('ships is empty object on start', () => {
    const board = gameboardFactory().grid;
    expect(board.length).toBe(10);
    expect(board[9].length).toBe(10);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            expect(board[i][j].ship).toBeFalsy();
        }
    }
})

test('can place ship on board', () => {
    const game = gameboardFactory();
    const length = 2;
    const pos = [5, 5];
    const [x, y] = pos;
    const orientation = "v";
    game.place(length, pos, orientation);
    expect(game.grid[y][x].ship).toEqual(game.grid[y+1][x].ship);
})

test('places ship ONLY where specified', () => {
    const game = gameboardFactory();
    const length = 4;
    const pos = [5, 9];
    const [x, y] = pos;
    game.place(length, pos, "h");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (i >= 5 && i <= 8 && j === 9) {
                expect(game.grid[j][i].ship).toEqual(game.grid[y][x].ship);
            } else {
                expect(game.grid[j][i].ship).not.toEqual(game.grid[y][x].ship);
            }
        }
    }
})


test('can hit ship', () => {
    const game = gameboardFactory();
    const [x, y] = [5, 5]
    game.place(2, [x, y], "h");
    game.receiveHit(x+1, y);
    expect(game.grid[y][x+1].ship.hits[1]).toBe(1);
})

test('hit can miss', () => {
    const game = gameboardFactory();
    game.receiveHit(0, 0);
    game.receiveHit(1, 0);
    expect(game.misses[0]).toEqual([0, 0]);
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
    expect(() => {game.place(3, [9, 9])}).toThrow();
    expect(() => {game.place(2, [1, 9])}).toThrow();
})

test('cant place on occupied cell', () => {
    const game = gameboardFactory();
    game.place(2, [1, 1]);
    expect(() => game.place(1, [1, 2])).toThrow();
})

test('can move ship', () => {
    const game = gameboardFactory();
    game.place(2, [1, 1], "v");
    game.move([1, 1], [5, 1]);
    expect(game.grid[1][1].ship).toBeFalsy();
    expect(game.grid[2][5].ship).toBeTruthy();
    expect(game.grid[1][5].ship).toBeTruthy();
})