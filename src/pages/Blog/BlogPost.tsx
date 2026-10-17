import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Image } from '../../components/ui/Image';
import { ButtonLink } from '../../components/ui/Button';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Prose } from '../../components/projects/CaseStudySection';
import { usePost } from '../../hooks/useBlog';
import { formatDate } from '../../utils/formatting';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, loading, error, reload } = usePost(slug);

  if (loading) {
    return (
      <Container className="py-10 sm:py-16">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-5 h-9 w-3/4 sm:mt-6 sm:h-12" />
        <Skeleton className="mt-6 aspect-[16/9] w-full sm:mt-8" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-10 sm:py-16">
        <ErrorState message={error} onRetry={reload} />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-10 sm:py-16">
        <Seo title="Post not found" noIndex />
        <EmptyState
          title="That post isn't here"
          description="It may have been unpublished, or the link may be wrong."
          action={
            <ButtonLink to="/blog" size="sm">
              Back to the blog
            </ButtonLink>
          }
        />
      </Container>
    );
  }

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        description={post.metaDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.coverImageUrl}
        imageAlt={post.coverImageAlt || post.title}
        type="article"
        publishedTime={post.createdAt?.toDate().toISOString() ?? null}
        modifiedTime={post.updatedAt?.toDate().toISOString() ?? null}
        keywords={post.keywords}
      />

      <Container className="pt-6 sm:pt-10">
        <Link
          to="/blog"
          className="inline-flex min-h-10 items-center gap-2 rounded-md py-2 pr-3 text-sm text-content-secondary transition-colors hover:text-content"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All posts
        </Link>
      </Container>

      <Container className="pb-10 pt-4 sm:pb-16 sm:pt-6">
        <article className="min-w-0">
          <p className="font-mono text-xs text-content-muted">{formatDate(post.createdAt)}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          {post.coverImageUrl && (
            <div className="mt-6 overflow-hidden rounded-card border border-line bg-surface-raised sm:mt-8">
              <Image src={post.coverImageUrl} alt={post.coverImageAlt || post.title} eager className="aspect-[16/9] w-full object-cover" />
            </div>
          )}

          <div className="mt-7 max-w-prose sm:mt-10">
            <Prose text={post.body} />
          </div>
        </article>
      </Container>
    </>
  );
}
