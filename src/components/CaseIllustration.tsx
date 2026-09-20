import { useId } from 'react';
import type { DistributionId } from '../domain/types';
import { type Locale, translate } from '../i18n';

/** Schematic observations, deliberately separate from the model's live parameters. */
export function CaseIllustration({ id, locale }: { id: DistributionId; locale: Locale }) {
  const titleId = useId();
  const dot = (x: number, y: number, filled = true) => (
    <circle
      key={`${x}-${y}`}
      cx={x}
      cy={y}
      r="7"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
    />
  );
  return (
    <svg
      viewBox="0 0 320 112"
      role="img"
      aria-labelledby={titleId}
      className="h-full w-full text-accent"
    >
      <title id={titleId}>{translate(locale, `guide.scene.${id}`)}</title>
      {id === 'bernoulli' && (
        <>
          <rect
            x="28"
            y="33"
            width="62"
            height="46"
            rx="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M43 47h32m-32 12h20M102 56h43l35-27h35m-70 27 35 27h35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="246" cy="29" r="18" fill="currentColor" />
          <path d="m238 29 5 5 10-11" stroke="var(--color-card)" strokeWidth="3" fill="none" />
          <circle cx="246" cy="83" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m240 77 12 12m0-12-12 12" stroke="currentColor" strokeWidth="2" />
        </>
      )}
      {id === 'binomial' &&
        Array.from({ length: 10 }, (_, position) => position).map((i) => (
          <rect
            key={i}
            x={47 + (i % 5) * 47}
            y={20 + Math.floor(i / 5) * 43}
            width="34"
            height="30"
            rx="7"
            fill={i < 3 ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            opacity={i < 3 ? 1 : 0.35}
          />
        ))}
      {(id === 'poisson' || id === 'exponential') && (
        <>
          <path
            d="M24 67h272M24 58v18m272-18v18"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.4"
          />
          {(id === 'poisson' ? [49, 85, 163, 192, 272] : [192, 272]).map((x) => dot(x, 67))}
          {id === 'poisson' ? (
            <path d="M25 27v-8h270v8" fill="none" stroke="currentColor" strokeWidth="2" />
          ) : (
            <>
              <path
                d="M25 25v55m0-49h160m-9-6 9 6-9 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="25" cy="67" r="5" fill="currentColor" />
            </>
          )}
        </>
      )}
      {id === 'negbinomial' &&
        [2, 9, 4].map((count, row) => (
          <g key={count}>
            <circle cx="37" cy={23 + row * 31} r="6" fill="currentColor" opacity="0.45" />
            <path
              d={`M26 ${38 + row * 31}q11-13 22 0`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.45"
            />
            {Array.from({ length: count }, (_, i) => dot(77 + i * 24, 28 + row * 31))}
          </g>
        ))}
      {id === 'geometric' && (
        <>
          <path d="M53 55h213" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          {[65, 160].map((x) => (
            <g key={x}>
              <circle
                cx={x}
                cy="55"
                r="22"
                fill="var(--color-card)"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d={`M${x - 7} 48l14 14m0-14-14 14`} stroke="currentColor" strokeWidth="2" />
            </g>
          ))}
          <circle cx="255" cy="55" r="22" fill="currentColor" />
          <path d="m245 55 7 7 13-15" stroke="var(--color-card)" strokeWidth="3" fill="none" />
        </>
      )}
      {id === 'gamma' && (
        <>
          {[
            { x: 26, w: 55 },
            { x: 86, w: 115 },
            { x: 206, w: 87 },
          ].map(({ x, w }, i) => (
            <rect
              key={x}
              x={x}
              y="32"
              width={w}
              height="32"
              rx="6"
              fill="currentColor"
              opacity={0.4 + i * 0.25}
            />
          ))}
          <path d="M26 77v9h267v-9" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
      )}
      {id === 'normal' &&
        [8, 16, 31, 51, 71, 83, 71, 51, 31, 16, 8]
          .map((h, i) => ({ h, x: 32 + i * 24 }))
          .map(({ h, x }) => (
            <rect
              key={x}
              x={x}
              y={98 - h}
              width="18"
              height={h}
              rx="3"
              fill="currentColor"
              opacity={0.4 + 0.6 * (h / 83)}
            />
          ))}
      {id === 'lognormal' &&
        [18, 29, 22, 35, 26, 87, 20, 31]
          .map((h, i) => ({ h, x: 32 + i * 33 }))
          .map(({ h, x }) => (
            <rect
              key={x}
              x={x}
              y={99 - h}
              width="20"
              height={h}
              rx="3"
              fill="currentColor"
              opacity={h / 120 + 0.25}
            />
          ))}
      {id === 'beta' && (
        <>
          <path d="M25 88h270" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          <path
            d="M25 88C50 88 75 88 105 35S160 36 183 65 235 86 295 88Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M25 88C50 88 75 88 105 35S160 36 183 65 235 86 295 88"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <text x="25" y="108" fontSize="13" fill="currentColor">
            0%
          </text>
          <text x="266" y="108" fontSize="13" fill="currentColor">
            100%
          </text>
        </>
      )}
    </svg>
  );
}
