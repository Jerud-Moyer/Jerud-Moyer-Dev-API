import Artwork from "../models/Artwork"

export type ArtworkRow = {
  id: number,
  title: string,
  medium: string,
  dimensions: string,
  year: string,
  slug: string,
  is_featured: Boolean,
  series_id: string,
  series_name: string
}
