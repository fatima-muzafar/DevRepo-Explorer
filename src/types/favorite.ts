export interface FavoriteRepository {
  id: string
  name: string
  owner: string
  description: string | null
  stars: number
  language: string | null
  htmlUrl: string
  savedAt: string
}
