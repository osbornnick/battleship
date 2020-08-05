const { shipFactory } = require('./Ship');

test('ship has length, hits, and sunk', () => {
    const expectedShip = {
        length: 1,
        hits: [0],
    }
    expect(shipFactory(1)).toMatchObject(expectedShip)
})

test('ship can be hit', () => {
    let ship = shipFactory(2);
    ship.hit(1);
    expect(ship.hits[1]).toBe(1);
})

test('.hit() will throw error if out of bounds', () => {
    let ship = shipFactory(1);
    expect(() => {ship.hit(4)}).toThrow();

})

test('.isSunk() correctly evaluates sunken ship', () => {
    let ship = shipFactory(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBeTruthy();
})