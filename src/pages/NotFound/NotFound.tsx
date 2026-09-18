import { Container } from '../../components/ui/Container';
import { ButtonLink } from '../../components/ui/Button';
import { Seo } from '../../components/ui/Seo';

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <Seo title="Page not found" noIndex />
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">This page doesn't exist</h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-content-secondary">
        The link may be wrong, or the page may have moved. The projects archive is a good place to
        pick back up.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink to="/">Back to home</ButtonLink>
        <ButtonLink to="/projects" variant="secondary">
          Browse projects
        </ButtonLink>
      </div>
    </Container>
  );
}
