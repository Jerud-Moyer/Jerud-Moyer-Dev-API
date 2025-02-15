export type MemeContentType = 'authors' | 'settings' | 'quotes' | 'images'

export type Meme = {
  author: string,
  setting: string,
  quote: string,
  image: string
}

export type ContentRequest = {
  world: string,
  content: string
}

export type StringIndexed = {
  [k: string]: string
}
