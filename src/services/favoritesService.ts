import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, type DocumentData } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { FavoriteRepository } from '../types/favorite'

const getFavoritesCollectionRef = (uid: string) => collection(db, 'users', uid, 'favorites')

const getFavoriteDocRef = (uid: string, repositoryId: string) =>
  doc(db, 'users', uid, 'favorites', repositoryId)

const normalizeFavorite = (data: DocumentData, repositoryId: string): FavoriteRepository => ({
  id: repositoryId,
  name: typeof data.name === 'string' ? data.name : '',
  owner: typeof data.owner === 'string' ? data.owner : data.owner?.login ?? '',
  description: typeof data.description === 'string' ? data.description : null,
  stars: Number(data.stars ?? 0),
  language: typeof data.language === 'string' ? data.language : null,
  htmlUrl: typeof data.htmlUrl === 'string' ? data.htmlUrl : '',
  savedAt: typeof data.savedAt === 'string' ? data.savedAt : new Date().toISOString(),
})

export const saveFavorite = async (uid: string, repository: FavoriteRepository): Promise<void> => {
  if (!uid) {
    throw new Error('A user id is required to save a favorite.')
  }

  const favoriteRef = getFavoriteDocRef(uid, repository.id)

  await setDoc(favoriteRef, {
    ...repository,
    savedAt: repository.savedAt ?? new Date().toISOString(),
  })
}

export const removeFavorite = async (uid: string, repositoryId: string): Promise<void> => {
  if (!uid) {
    throw new Error('A user id is required to remove a favorite.')
  }

  await deleteDoc(getFavoriteDocRef(uid, repositoryId))
}

export const getFavorites = async (uid: string): Promise<FavoriteRepository[]> => {
  if (!uid) {
    throw new Error('A user id is required to fetch favorites.')
  }

  const favoritesSnapshot = await getDocs(getFavoritesCollectionRef(uid))
  return favoritesSnapshot.docs.map((favoriteDoc) => normalizeFavorite(favoriteDoc.data(), favoriteDoc.id))
}

export const isFavorite = async (uid: string, repositoryId: string): Promise<boolean> => {
  if (!uid) {
    throw new Error('A user id is required to check a favorite.')
  }

  const favoriteDoc = await getDoc(getFavoriteDocRef(uid, repositoryId))
  return favoriteDoc.exists()
}
