const worlds = ['star-wars', 'star-trek', 'harry-potter', 'lotr', 'marvel', 'xena', 'battlestar-galactica'];

const randomIndex = () => (Math.floor(Math.random() * worlds.length));

export const randomizer = () => {
  const memeArr = [worlds[randomIndex()]]
  while(memeArr.length < 4) {
    let newWorld = worlds[randomIndex()]
    if(!memeArr.includes(newWorld)) {
      memeArr.push(newWorld)
    }
  }
  
  return memeArr;
}
