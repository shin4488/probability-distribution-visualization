/**
 * 日本語辞書。キー構成:
 *   ui.*                     画面共通の文言
 *   dist.<id>.name           分布名
 *   dist.<id>.tagline        グラフ上部の1行説明。汎用的・抽象的な説明と
 *                            他の分布との関係(導出・極限・合成)を書く
 *   dist.<id>.param.<key>    パラメータのラベル
 *   dist.<id>.usecase        活用例。具体的・実用的な場面を書き、{...}には
 *                            DistributionDef.useCaseValues()の現在値が
 *                            ロケール書式で埋め込まれる
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
  'ui.histogram': '標本シミュレーション',
  'ui.histogramHelp':
    'この分布に従う乱数を「標本サイズ」の個数だけ生成し、その分布(ヒストグラム)を理論値のグラフに重ねます。標本サイズを増やすほど理論の形に近づいていく様子(大数の法則)を観察できます。',
  'ui.helpLabel': 'ヘルプ',
  'ui.sampleSize': '標本サイズ',
  'ui.regenerate': '標本を引き直す',
  'ui.usecaseTitle': '活用例',
  'ui.chartDensity': '確率密度',
  'ui.chartMass': '確率',
  'ui.chartHistogram': '標本',
  'ui.langLabel': '言語',

  'dist.bernoulli.name': 'ベルヌーイ分布',
  'dist.bernoulli.tagline':
    'あらゆる二値の出来事の最小単位。1回の試行が確率pで起きる(1)、確率1-pで起きない(0)',
  'dist.bernoulli.param.p': '成功確率 p',
  'dist.bernoulli.usecase':
    'クリック率{pPct}%の広告が1回表示されたとき、クリックされる(1)確率は{pPct}%、されない(0)確率は{qPct}%です。100回表示すれば平均{per100}回クリックされます。コインの表裏、検査の合否、成約の有無など、確率的な「はい/いいえ」の場面すべてに現れます。',

  'dist.binomial.name': '二項分布',
  'dist.binomial.tagline':
    '同じ試行をn回繰り返したときの成功回数。ベルヌーイ試行をn個足し合わせたもの',
  'dist.binomial.param.n': '試行回数 n',
  'dist.binomial.param.p': '成功確率 p',
  'dist.binomial.usecase':
    '成約率{pPct}%の商談を{n}件行うと、成約数は平均{mean}件、約95%の確率で{lo}〜{hi}件に収まります。メールの開封数、製造ロットの不良品数、A/Bテストのコンバージョン数の「起こりうる幅」の見積もりに使えます。',

  'dist.geometric.name': '幾何分布',
  'dist.geometric.tagline':
    '最初の成功が出るまでの失敗回数。ベルヌーイ試行の繰り返しから生まれ、指数分布の離散版にあたる',
  'dist.geometric.param.p': '成功確率 p',
  'dist.geometric.usecase':
    '排出率{pPct}%のガチャで当たりを引くまでの外れ回数は平均{mean}回(当たりは平均{trials}回目)です。それでも{streak}回連続で外れる確率が{streakPct}%残ります。初成約までの営業訪問数、最初の不良品が見つかるまでの検査数など「初めての成功はいつ来るか」の見積もりに使えます。',

  'dist.poisson.name': 'ポアソン分布',
  'dist.poisson.tagline':
    '一定の時間・範囲に「まれな出来事」が起きる回数。機会の数nがとても多く、1回ごとの確率pがごく小さい二項分布が行き着く形で、平均λ=npだけで決まる',
  'dist.poisson.param.lambda': '平均発生回数 λ',
  'dist.poisson.usecase':
    '1時間あたり平均{lambda}件の問い合わせが届くコールセンターでは、{capacity}件まで捌ける体制を用意しても、それを超える確率が約{overflowPct}%残ります。「大勢の顧客がそれぞれ小さな確率で問い合わせてくる」という二項分布の状況でも、平均件数λ={lambda}さえ分かれば「何件起きる確率がどれくらいか」を見積もれます。サーバーへのリクエスト数、交通事故件数など「件数」の計画に広く使われます。',

  'dist.exponential.name': '指数分布',
  'dist.exponential.tagline':
    '次の出来事が起きるまでの待ち時間。ポアソン分布と表裏一体で、幾何分布の連続版にあたる',
  'dist.exponential.param.lambda': '発生率 λ(1分あたり)',
  'dist.exponential.usecase':
    '1分あたり平均{lambda}回起きる事象(平均間隔{mean}分)では、次の発生まで{waitLimit}分以上待たされる確率は約{waitPct}%です。窓口への客の到着間隔、機器が故障するまでの時間、サーバーへのリクエスト間隔など、待ち行列や信頼性の設計に使われます。',

  'dist.gamma.name': 'ガンマ分布',
  'dist.gamma.tagline':
    '一定レートで起きる出来事がk回発生するまでの合計待ち時間。指数分布をk個足し合わせたもの',
  'dist.gamma.param.shape': '形状 k(件数)',
  'dist.gamma.param.scale': '尺度 θ(1件あたりの平均)',
  'dist.gamma.usecase':
    '1件あたり平均{scale}分かかる対応をk={shape}件分こなすまでの合計時間のモデルで、平均{mean}分・標準偏差{sd}分です。コールセンターの総対応時間、保険金の支払総額、降水量など「正の値で右に裾を引く量」に幅広く当てはまります。',

  'dist.negbinomial.name': '負の二項分布',
  'dist.negbinomial.tagline':
    'r回目の成功が出るまでの失敗回数(幾何分布のr個の和)。発生ペースλがガンマ分布でばらつくポアソン分布の混合でもあり、「個人差のある回数」を表す',
  'dist.negbinomial.param.r': '成功回数 r',
  'dist.negbinomial.param.p': '成功確率 p',
  'dist.negbinomial.usecase':
    '全員が同じペースで購入するなら回数はポアソン分布に従いますが、実際のペースは人それぞれです。顧客ごとのペースλがガンマ分布に従ってばらつくとき、全体で観測される購入回数がこの負の二項分布になります。r={r}, p={p}では平均{mean}回、分散は平均の{overdispersion}倍(ポアソン分布は常に1倍)で、来店回数・事故件数・SNS投稿数のような「ポアソンより大きくばらつく回数データ」の定番モデルです。見方を変えると「成功率{pPct}%の試行で{r}回成功するまでの失敗回数」でもあり、幾何分布を{r}個足したもの(r=1なら幾何分布そのもの)です。',

  'dist.beta.name': 'ベータ分布',
  'dist.beta.tagline':
    '0〜1の値(割合・確率そのもの)の分布。独立なガンマ分布2つの比 X/(X+Y) から作られる',
  'dist.beta.param.alpha': '形状 α',
  'dist.beta.param.beta': '形状 β',
  'dist.beta.usecase':
    'α={alpha}, β={beta}は「成功{successes}回・失敗{failures}回を観測したあとのコンバージョン率の確からしさ」と読め、推定平均は{meanPct}%です。A/Bテストのベイズ評価や、データが少ない段階での成功率の不確かさの表現に使われます。観測が増えるほど山が鋭くなり、確信が強まる様子を試してみてください。',

  'dist.normal.name': '正規分布',
  'dist.normal.tagline':
    '多数の独立な要因の和が近づいていく先(中心極限定理)。平均のまわりに左右対称の釣鐘型',
  'dist.normal.param.mu': '平均 μ',
  'dist.normal.param.sigma': '標準偏差 σ',
  'dist.normal.usecase':
    '平均{mu}点・標準偏差{sigma}点のテストなら、約68%の人が{lo1}〜{hi1}点、約95%が{lo2}〜{hi2}点に収まります。身長や測定誤差のばらつき、模試の偏差値、品質管理の管理限界(±3σ)など、統計の実務のあらゆる場面の土台になっています。',

  'dist.lognormal.name': '対数正規分布',
  'dist.lognormal.tagline':
    '対数を取ると正規分布になる量。成長率のような「掛け算」の積み重ねで決まり、右に長い裾を引く',
  'dist.lognormal.param.mu': '対数平均 μ',
  'dist.lognormal.param.sigma': '対数標準偏差 σ',
  'dist.lognormal.usecase':
    '年収・住宅価格・Webページの応答時間のモデルです。μ={mu}, σ={sigma}のとき中央値は{median}ですが、平均は{mean}と大きめになります。「平均年収が実感より高く見える」のは、この右の長い裾に平均が引っ張られるためです。',
} as const;

export type MessageKey = keyof typeof ja;
