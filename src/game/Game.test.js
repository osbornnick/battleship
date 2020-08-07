const Game = require('./Game');

test('Game has players', () => {
    const g = new Game();
    expect(g.players).toBeTruthy();
})

test('game can toggle whoseTurn', () => {
    const g = new Game();
    g.toggleWhoseTurn();
    expect(g.whoseTurn).toBe(2);
})

test('player receiving returns other player after turn switch', () => {
    const p1 = {order: 1};
    const p2 = {order: 2};
    const g = new Game([p1, p2]);
    expect(g.playerReceiving()).toBe(p2);
    g.toggleWhoseTurn();
    expect(g.playerReceiving()).toBe(p1);
})

test('initialize board sets locations correctly', () => {
    const g = new Game();
    g.initializeBoard(g.players[0].gameboard);
    expect(g.players[0].gameboard.loc(6, 9).ship.length).toBe(4);
})