export interface RepositoryOwner {
  login: string
  avatar_url: string
}

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  language: string | null
  topics: string[]
  owner: RepositoryOwner
  created_at: string
  updated_at: string
}

export interface SearchResponse {
  total_count: number
  items: Repository[]
}
