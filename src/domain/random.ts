/** [0, 1) の一様乱数を返す関数。全サンプラーはこの型にだけ依存する */
export type Rng = () => number;

/**
 * mulberry32: シード可能な32bit PRNG。
 * 暗号用途ではなく可視化用途なので、速度と再現性(テストで同じ列を再生できること)を優先。
 */
export function mulberry32(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 4294967296);
}

/** 標準正規分布 N(0,1)。Box-Muller法 */
export function sampleStandardNormal(rng: Rng): number {
  // rng()が0を返すとlog(0)=-∞になるため下駄を履かせる
  const u1 = Math.max(rng(), Number.MIN_VALUE);
  const u2 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/**
 * ガンマ分布 Gamma(shape, 1)。Marsaglia-Tsang法。
 * shape < 1 は棄却率が悪化するため、shape+1で生成してから
 * u^(1/shape) を掛けて補正する標準的なブースト手法を使う。
 */
export function sampleStandardGamma(rng: Rng, shape: number): number {
  if (shape < 1) {
    const u = Math.max(rng(), Number.MIN_VALUE);
    return sampleStandardGamma(rng, shape + 1) * u ** (1 / shape);
  }
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    const z = sampleStandardNormal(rng);
    const v = (1 + c * z) ** 3;
    if (v <= 0) continue;
    const u = Math.max(rng(), Number.MIN_VALUE);
    if (Math.log(u) < 0.5 * z * z + d - d * v + d * Math.log(v)) {
      return d * v;
    }
  }
}

/**
 * ポアソン分布。Knuthの積算法。
 * e^(-λ)がアンダーフローしないよう、λが大きい場合は500ずつ分割して合成する
 * (Poisson(a+b) = Poisson(a) + Poisson(b) の再生性を利用)。
 */
export function samplePoisson(rng: Rng, lambda: number): number {
  let count = 0;
  let remaining = lambda;
  while (remaining > 500) {
    count += knuthPoisson(rng, 500);
    remaining -= 500;
  }
  return count + knuthPoisson(rng, remaining);
}

function knuthPoisson(rng: Rng, lambda: number): number {
  const limit = Math.exp(-lambda);
  let k = 0;
  let product = rng();
  while (product > limit) {
    k += 1;
    product *= rng();
  }
  return k;
}

/**
 * 幾何分布(最初の成功が出るまでの失敗回数)。逆関数法。
 * 負の二項分布のサンプラーもこれをr個合計して作られる(再生性)。
 */
export function sampleGeometric(rng: Rng, p: number): number {
  if (p >= 1) return 0;
  return Math.floor(Math.log(1 - rng()) / Math.log(1 - p));
}
