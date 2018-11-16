const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const getRandomRange = (max, min) =>
  Math.floor(Math.random() * Math.floor(max - min) + min)

export { getRandomInt }
