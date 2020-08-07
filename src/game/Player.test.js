const { Player, AI } = require('./Player');
const { Gameboard } = require('./Gameboard');

test('Player has gameboard', () => {
    const p = new Player();
    expect(p.gameboard).toBeTruthy();
})

test('Player can make plays on enemy gameboard', () => {
    const p = new Player();
    const enemyGameboard = new Gameboard();
    const mockReceiveHit = jest.fn((x, y) => true)
    enemyGameboard.receiveHit = mockReceiveHit;
    p.move(1, 1, enemyGameboard);
    expect(mockReceiveHit.mock.calls.length).toBe(1);
})

test('AI can make moves', () => {
    const ai = new AI();
    const enemyGameboard = new Gameboard();
    const mockReceiveHit = jest.fn((x, y) => true)
    enemyGameboard.receiveHit = mockReceiveHit;
    ai.move(enemyGameboard);
    expect(mockReceiveHit.mock.calls.length).toBe(1);
})