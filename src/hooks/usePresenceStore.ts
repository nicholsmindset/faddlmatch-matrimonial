import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PresenceState = {
    membersId: string[];
    add: (id: string) => void;
    remove: (id: string) => void;
    set: (ids: string[]) => void;
    isOnline: (id: string) => boolean;
    getOnlineCount: () => number;
    clear: () => void;
}

const usePresenceStore = create<PresenceState>()(devtools(
    immer((set, get) => ({
        membersId: [],
        add: (id: string) => set((state) => {
            if (!state.membersId.includes(id)) {
                state.membersId.push(id);
            }
        }),
        remove: (id: string) => set((state) => {
            const index = state.membersId.indexOf(id);
            if (index > -1) {
                state.membersId.splice(index, 1);
            }
        }),
        set: (ids: string[]) => set((state) => {
            state.membersId = [...new Set(ids)]; // Remove duplicates
        }),
        isOnline: (id: string) => get().membersId.includes(id),
        getOnlineCount: () => get().membersId.length,
        clear: () => set((state) => {
            state.membersId = [];
        })
    })),
    { name: 'PresenceStore' }
))

export default usePresenceStore;

// Selector hooks for performance optimization
export const useIsOnline = (userId: string) => usePresenceStore((state) => state.isOnline(userId));
export const useOnlineCount = () => usePresenceStore((state) => state.getOnlineCount());