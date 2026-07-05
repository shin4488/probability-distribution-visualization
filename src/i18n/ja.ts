/**
 * 日本語辞書。キー構成:
 *   ui.*                     画面共通の文言
 *   dist.<id>.name           分布名
 *   dist.<id>.tagline        1行の説明
 *   dist.<id>.param.<key>    パラメータのラベル
 *   dist.<id>.usecase        活用例。{...}にはDistributionDef.useCaseValues()の
 *                            現在値がロケール書式で埋め込まれる
 * この辞書が全キーの正であり、英語辞書はsatisfiesで同じキー集合を強制される。
 */
export const ja = {
  'ui.title': '確率分布ビジュアライザー',
  'ui.tagline': 'パラメータを動かして、分布の形と使いどころを体感する',
  'ui.themeToDark': 'ダークモードに切り替え',
  'ui.themeToLight': 'ライトモードに切り替え',
  'ui.filterLabel': '表示する分布',
  'ui.showAll': 'すべて表示',
  'ui.reset': 'リセット',
  'ui.resetTitle': 'すべての設定を初期状態に戻す',
  'ui.allHidden': 'すべての分布が非表示です。上のボタンから表示する分布を選んでください。',
  'ui.dragHint': 'ドラッグして並び替え',
  'ui.hideCard': 'このカードを非表示',
  'ui.mean': '平均',
  'ui.sd': '標準偏差',
  'ui.histogram': '標本ヒストグラム',
  'ui.sampleSize': '標本サイズ',
  'ui.regenerate': '標本を引き直す',
  'ui.usecaseTitle': '活用例',
  'ui.chartDensity': '確率密度',
  'ui.chartMass': '確率',
  'ui.chartHistogram': '標本',
  'ui.langLabel': '言語',

  'dist.normal.name': '正規分布',
  'dist.normal.tagline': '平均のまわりに左右対称にばらつく、最も基本的な連続分布',
  'dist.normal.param.mu': '平均 μ',
  'dist.normal.param.sigma': '標準偏差 σ',
  'dist.normal.usecase':
    'テストの点数・身長・測定誤差のように、小さな要因が多数足し合わさる量は正規分布に近づきます。平均{mu}・標準偏差{sigma}なら、全体の約68%が{lo1}〜{hi1}に、約95%が{lo2}〜{hi2}に収まります。偏差値や品質管理の管理限界(±3σ)はこの性質を利用しています。',

  'dist.binomial.name': '二項分布',
  'dist.binomial.tagline': '成功率pの試行をn回繰り返したときの成功回数',
  'dist.binomial.param.n': '試行回数 n',
  'dist.binomial.param.p': '成功確率 p',
  'dist.binomial.usecase':
    '成約率{pPct}%の商談を{n}件行うと、成約数は平均{mean}件、約95%の確率で{lo}〜{hi}件に収まります。メールの開封数、製造ロットの不良品数、A/Bテストのコンバージョン数の「起こりうる幅」の見積もりに使えます。',

  'dist.poisson.name': 'ポアソン分布',
  'dist.poisson.tagline': '一定の時間・範囲に「まれな出来事」が起きる回数',
  'dist.poisson.param.lambda': '平均発生回数 λ',
  'dist.poisson.usecase':
    '1時間あたり平均{lambda}件の問い合わせが届くコールセンターでは、{capacity}件まで捌ける体制を用意しても、それを超える確率が約{overflowPct}%残ります。サーバーへのリクエスト数、交通事故件数、システム障害の発生数など「件数」の計画に広く使われます。',

  'dist.bernoulli.name': 'ベルヌーイ分布',
  'dist.bernoulli.tagline': '「起きる(1) / 起きない(0)」の1回きりの試行',
  'dist.bernoulli.param.p': '成功確率 p',
  'dist.bernoulli.usecase':
    'クリック率{pPct}%の広告が1回表示されたとき、クリックされる(1)確率は{pPct}%、されない(0)確率は{qPct}%です。コインの表裏、検査の合否、成約の有無など、あらゆる二値の出来事の最小単位で、100回繰り返せば平均{per100}回起こります(これを足し合わせたものが二項分布です)。',

  'dist.exponential.name': '指数分布',
  'dist.exponential.tagline': '次の出来事が起きるまでの待ち時間',
  'dist.exponential.param.lambda': '発生率 λ(1分あたり)',
  'dist.exponential.usecase':
    '1分あたり平均{lambda}回起きる事象(平均間隔{mean}分)では、次の発生まで{waitLimit}分以上待たされる確率は約{waitPct}%です。窓口への客の到着間隔、機器が故障するまでの時間、サーバーへのリクエスト間隔のモデルとして、待ち行列や信頼性の設計に使われます。',

  'dist.beta.name': 'ベータ分布',
  'dist.beta.tagline': '0〜1の割合・確率そのものを表す分布',
  'dist.beta.param.alpha': '形状 α',
  'dist.beta.param.beta': '形状 β',
  'dist.beta.usecase':
    'α={alpha}, β={beta}は「成功{successes}回・失敗{failures}回を観測したあとのコンバージョン率の確からしさ」と読め、推定平均は{meanPct}%です。A/Bテストのベイズ評価や、データが少ない段階での成功率の不確かさの表現に使われます。観測が増えるほど山が鋭くなり、確信が強まる様子を試してみてください。',

  'dist.gamma.name': 'ガンマ分布',
  'dist.gamma.tagline': '待ち時間の合計。右に裾を引く正の量',
  'dist.gamma.param.shape': '形状 k(件数)',
  'dist.gamma.param.scale': '尺度 θ(1件あたりの平均)',
  'dist.gamma.usecase':
    '1件あたり平均{scale}分かかる対応を{count}件終えるまでの合計時間のモデルで、平均{mean}分・標準偏差{sd}分です。コールセンターの総対応時間、保険金の支払総額、降水量など「正の値で右に裾を引く量」に幅広く当てはまります。',

  'dist.lognormal.name': '対数正規分布',
  'dist.lognormal.tagline': '掛け算で増減する量。右に長い裾を引く',
  'dist.lognormal.param.mu': '対数平均 μ',
  'dist.lognormal.param.sigma': '対数標準偏差 σ',
  'dist.lognormal.usecase':
    '年収・住宅価格・Webページの応答時間のように、成長率などの「掛け算」の積み重ねで決まる量のモデルです。μ={mu}, σ={sigma}のとき中央値は{median}ですが、平均は{mean}と大きめになります。「平均年収が実感より高く見える」のは、この右の長い裾に平均が引っ張られるためです。',
  'dist.negbinomial.name': '負の二項分布',
  'dist.negbinomial.tagline': 'r回成功するまでの失敗回数。幾何分布をr個合成(合計)したもの',
  'dist.negbinomial.param.r': '成功回数 r',
  'dist.negbinomial.param.p': '成功確率 p',
  'dist.negbinomial.usecase':
    '成約率{pPct}%の営業で{r}件の契約を取るまでに断られる回数のモデルです。断られる回数は平均{mean}回で、訪問は成功分を合わせて平均{totalTrials}件必要になります。この分布は「成功確率{pPct}%のベルヌーイ試行を繰り返し、1回成功するまでの失敗数」を表す幾何分布を{r}個足し合わせて合成したものです(二項分布が「回数を固定して成功数を数える」のに対し、こちらは「成功数を固定して回数を数える」裏返しの関係)。ポアソン分布よりばらつきが大きい件数データ(過分散)のモデルとしても使われます。',
} as const;

export type MessageKey = keyof typeof ja;
