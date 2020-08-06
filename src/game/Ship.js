const shipFactory = (length) => ({
    length,
    hits: new Array(length).fill(0),
    hit(position) {
        if (position > this.length) {
            throw new Error(`${position} out of range on ship with length ${this.length}`)
        }
        this.hits[position] = 1
    },
    isSunk() {
        return this.hits.every((val) => val === 1)
    },
})

module.exports = { shipFactory }