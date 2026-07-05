/**
 * 対数ガンマ関数 ln Γ(x)。Lanczos近似(g=7, n=9)。
 * Γ(x)そのものはx>171で倍精度からあふれるため、
 * 二項係数・ガンマ/ベータ密度などは全て対数空間で計算してからexpする。
 */
const LANCZOS_G = 7;
const LANCZOS_COEF = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
  -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
  1.5056327351493116e-7,
];

export function lnGamma(x: number): number {
  if (x < 0.5) {
    // 反射公式で 0 < x < 0.5 を x > 0.5 に帰着させる
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - lnGamma(1 - x);
  }
  const z = x - 1;
  let sum = LANCZOS_COEF[0];
  for (let i = 1; i < LANCZOS_G + 2; i++) {
    sum += LANCZOS_COEF[i] / (z + i);
  }
  const t = z + LANCZOS_G + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(sum);
}

export function lnFactorial(n: number): number {
  return lnGamma(n + 1);
}

/** ln C(n, k) */
export function lnChoose(n: number, k: number): number {
  return lnFactorial(n) - lnFactorial(k) - lnFactorial(n - k);
}

/** ln B(a, b) = lnΓ(a) + lnΓ(b) - lnΓ(a+b) */
export function lnBeta(a: number, b: number): number {
  return lnGamma(a) + lnGamma(b) - lnGamma(a + b);
}
