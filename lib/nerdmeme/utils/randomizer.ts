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
  // const memeArr = [worlds[randomIndex()], worlds[randomIndex()]];

  // while(memeArr[1] === memeArr[0]) {
  //   memeArr.pop();
  //   memeArr.push(worlds[randomIndex()]);
  // }

  // memeArr.push(worlds[randomIndex()]);

  // while(
  //   memeArr[2] === memeArr[0] || 
  //   memeArr[2] === memeArr[1]
  // ) {
  //   memeArr.pop();
  //   memeArr.push(worlds[randomIndex()]);
  // }

  // memeArr.push(worlds[randomIndex()]);

  // while(
  //   memeArr[3] === memeArr[0] || 
  //   memeArr[3] === memeArr[1] || 
  //   memeArr[3] === memeArr[2]
  // ) {
  //   memeArr.pop();
  //   memeArr.push(worlds[randomIndex()]);
  // }
  
  return memeArr;
};


// export default { randomizer };
