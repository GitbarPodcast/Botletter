export type Category = 'ARTICLE' | 'EVENT' | 'REPOSITORY' | 'VIDEO';

export interface Entry {
  title: string;
  link: string;
  shortText: string;
  image: string;
  sharedBy: string;
  category: Category;
  createdAt: Date;
}
