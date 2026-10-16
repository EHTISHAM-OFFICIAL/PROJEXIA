import { SITE } from '../../constants/site';

type WordmarkProps = {
  size?: 'sm' | 'md';
};

export function Wordmark({ size = 'md' }: WordmarkProps) {
  const iconSize = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/favicon.svg"
        alt=""
        width={32}
        height={32}
        className={`rounded-lg ${iconSize}`}
      />
      <span className={`font-display font-bold tracking-tight text-content ${textSize}`}>
        {SITE.name}
      </span>
    </span>
  );
}
