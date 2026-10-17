import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Image } from '../../components/ui/Image';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { usePublishedPosts } from '../../hooks/useBlog';
import { formatDate } from '../../utils/formatting';
import { Badge } from '../../components/ui/Badge';

export default function BlogIndex() {
  const { data, loading, error, reload } = usePublishedPosts();

  return (
    <>
      <Seo
        title="ProjexiaHub Electronics Blog"
        description="Electronics guides, project build logs and practical notes from ProjexiaHub on embedded systems, IoT, automation, robotics and prototyping."
        path="/blog"
      />

      <PageIntro
        eyebrow="Ideas, guides & build notes"
        title="Blog"
        description="Practical electronics guides, build logs, and notes from projects in progress."
      />

      <Container className="py-12">
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="aspect-[4/3] w-full" />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && data?.length === 0 && (
          <EmptyState
            title="No posts yet"
            description="Build logs and notes will appear here once something is published."
          />
        )}

        {!loading && !error && data && data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="card group overflow-hidden transition-colors hover:border-line-strong"
              >
                {post.coverImageUrl && (
                  <div className="aspect-[16/10] overflow-hidden bg-surface-raised">
                    <Image
                      src={post.coverImageUrl}
                      alt={post.coverImageAlt || post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs text-content-muted">{formatDate(post.createdAt)}</p>
                    {post.category && <Badge tone="neutral">{post.category}</Badge>}
                    {post.featured && <Badge tone="accent">Featured</Badge>}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
