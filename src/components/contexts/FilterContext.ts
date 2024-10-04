import { create } from 'zustand'

type State = {
    phrase: string
    category: string
}

type Action = {
    updatePhrase: (phrase: State['phrase']) => void
    updateCategory: (id: State['category']) => void
}

export const useFilter = create<State & Action>((set) => ({
    phrase: '',
    category: 'all',
    updatePhrase: (phrase: string) => set({ phrase: phrase }),
    updateCategory: (id: string) => set({ category: id }),
}))
