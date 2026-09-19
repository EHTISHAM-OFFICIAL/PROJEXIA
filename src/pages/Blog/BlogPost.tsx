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
      <Container className="py-16">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-6 h-10 w-2/3" />
        <Skeleton className="mt-8 aspect-[16/9] w-full" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
        <ErrorState message={error} onRetry={reload} />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-16">
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
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.coverImageUrl}
        type="article"
      />

      <Container className="pt-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All posts
        </Link>
      </Container>

      <Container className="pb-16 pt-6">
        <p className="font-mono text-xs text-content-muted">{formatDate(post.createdAt)}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        {post.coverImageUrl && (
          <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface-raised">
            <Image src={post.coverImageUrl} alt={post.title} eager className="aspect-[16/9] w-full object-cover" />
          </div>
        )}

        <div className="mt-10 max-w-prose">
          <Prose text={post.body} />
        </div>
      </Container>
    </>
  );
}
