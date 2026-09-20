# Fix — banner marquee wasn't actually scrolling

Two files, both overwrite existing ones. `npm run dev` after copying, no
rules changes, no redeploy.

```
tailwind.config.js
src/components/layout/AnnouncementBanner.tsx
```

## What was actually wrong

Not just a speed problem — the marquee only duplicated the message **once**
side-by-side, then scrolled by 50% of that (short) combined width. For a
short message, that combined width was *narrower than the banner itself*, so
the "scroll" was a barely-visible few-pixel drift, not a sweep across the
bar — the animation was genuinely running, it just had almost nothing to
move.

Fixed by repeating the message 6 times back-to-back (separated by a small
dot), which guarantees the scrolling track is always wider than the banner
regardless of how short the message is — this is the standard robust way to
build a ticker/marquee, rather than relying on message length being "long
enough" by luck. Also sped the loop up from 16s to 9s.
