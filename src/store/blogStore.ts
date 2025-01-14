import { Blog } from "@/interface";
import { create } from "zustand";

type BlogState = {
  blog: Blog | null;
  setBlog: (blog: null | Blog) => void;
};

export const useStore = create<BlogState>((set, get) => ({
  blog: null,
  setBlog: (blog) => set({ blog }),
}));

export function useBlogStore() {
  return useStore((state) => state);
}
