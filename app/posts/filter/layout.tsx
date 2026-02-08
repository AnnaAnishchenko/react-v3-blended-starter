import css from './layout.module.css';

type LayoutPostsProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function LayoutPosts({ sidebar, children }: LayoutPostsProps) {
  return (
    <main className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <div className={css.postsWrapper}>{children}</div>
    </main>
  );
}
