export const guideJa = {
  'nav.charts': '分布から見る',
  'nav.guide': 'ケースから探す',
  'guide.eyebrow': 'はじめての確率分布',
  'guide.title': '知りたいことから、分布を見つけよう。',
  'guide.intro':
    '名前や数式を知らなくても大丈夫。身近なケースから、使えそうな分布とその理由を探せます。',
  'guide.step1': '知りたい量を選ぶ',
  'guide.step2': '近いケースを選ぶ',
  'guide.step3': '条件を確認して試す',
  'guide.category.all': 'すべて',
  'guide.category.outcome': '起きる・起きない',
  'guide.category.count': '何件・何回',
  'guide.category.waiting': 'いつまで待つ',
  'guide.category.measurement': '大きさ・ばらつき',
  'guide.category.proportion': '割合の不確かさ',
  'guide.choose': 'ケースを見る',
  'guide.back': 'ケース一覧に戻る',
  'guide.candidate': 'このケースで考えられる分布',
  'guide.why': 'なぜこの分布？',
  'guide.conditions': '使う前に確かめること',
  'guide.caution': '合わないことがある場面',
  'guide.parameters': 'グラフで試すときの読み方',
  'guide.open': 'この分布をグラフで試す',
  'guide.alternative': '知りたいこと・条件が違うなら',
  'guide.note':
    'ここで紹介するのは候補です。実データの形や、出来事が起こる仕組みを確認して選びましょう。',
  'guide.references': '分布の定義を詳しく読む（英語）',
  'guide.chartNote': 'グラフの値は説明用です。自分の条件に合わせて調整してください。',
  'guide.docTitle': 'ケースから探す | 確率分布ビジュアライザー',
  'guide.metaDescription':
    '問い合わせ件数、待ち時間、成約率などのケースから、使えそうな確率分布を探せます。理由と前提を確認し、グラフで試しましょう。',
  'guide.case.bernoulli.title': '1回の広告表示で、クリックされる？',
  'guide.case.bernoulli.summary': 'クリックする・しない、検査の合格・不合格など、結果が2つの場面。',
  'guide.case.bernoulli.why': '1回の結果を「起きた＝1、起きなかった＝0」で表します。',
  'guide.case.bernoulli.conditions': '結果が2つに分かれ、起きる確率 p を設定できること。',
  'guide.case.bernoulli.caution': '結果が3種類以上ある場合は、この分布だけでは表せません。',
  'guide.case.bernoulli.alternative': '何回も表示したときのクリック数を知りたいなら',
  'guide.case.bernoulli.parameters': 'p はクリックされる確率。0.3なら30%です。',
  'guide.case.binomial.title': '10件の商談で、何件成約する？',
  'guide.case.binomial.summary': '成約数、メールの開封数、製品100個のうちの不良品数。',
  'guide.case.binomial.why': '決めた回数のうち、条件を満たした回数を数えます。',
  'guide.case.binomial.conditions':
    '試行回数が決まっていて、各試行が独立し、成功確率が同じとみなせること。',
  'guide.case.binomial.caution':
    '顧客ごとに成約率が大きく違う場合や、結果が互いに影響する場合は見直しが必要です。',
  'guide.case.binomial.alternative': '成約「数」ではなく、成約「率」の不確かさを知りたいなら',
  'guide.case.binomial.parameters':
    'n は商談件数、p は1件の成約率。まず n と p を自分のケースに合わせます。',
  'guide.case.poisson.title': '1時間に、何件の問い合わせが来る？',
  'guide.case.poisson.summary': '問い合わせ件数、来客数、一定区間での不具合の件数。',
  'guide.case.poisson.why': '一定の時間や範囲に起こる出来事の件数を表します。',
  'guide.case.poisson.conditions':
    '出来事が独立に起き、対象の時間・範囲で平均の発生ペースが一定とみなせること。',
  'guide.case.poisson.caution':
    '昼と夜でペースが違う場合は分けて考えます。件数の分散（ばらつきの指標）が平均より大きい場合は、負の二項分布も候補です。',
  'guide.case.poisson.alternative': '人や場所によって発生ペースがばらつくなら',
  'guide.case.poisson.parameters': 'λ はその時間内の平均件数。1時間平均5件なら λ＝5です。',
  'guide.case.negbinomial.title': 'お客さんごとの来店回数に、大きな差がある',
  'guide.case.negbinomial.summary': '来店回数、購入回数、投稿数など、少数の人に回数が偏る場面。',
  'guide.case.negbinomial.why':
    '発生ペースに個人差がある件数を、ポアソン分布より大きなばらつきで表せます。',
  'guide.case.negbinomial.conditions':
    '例として、各人の回数がポアソン分布に従い、その発生ペースがガンマ分布でばらつく場合に使えます。',
  'guide.case.negbinomial.caution':
    'ゼロが特別に多い仕組みや、時間とともに変化するペースは、別のモデルが必要なこともあります。',
  'guide.case.negbinomial.alternative': '全員の発生ペースがほぼ同じと考えられるなら',
  'guide.case.negbinomial.parameters':
    'このグラフでは r と p で形を調整します。平均は r(1−p)/p。p を下げると分散／平均の比が大きくなります。',
  'guide.case.geometric.title': '初めて当たるまで、何回外れる？',
  'guide.case.geometric.summary': 'ガチャの外れ回数、初成約までの不成立回数。',
  'guide.case.geometric.why': '初めて成功するまでの「失敗回数」を数えます。',
  'guide.case.geometric.conditions': '毎回の試行が独立で、成功確率が変わらないこと。',
  'guide.case.geometric.caution':
    'このサイトの横軸は失敗回数です。成功した回も含む試行回数は＋1。天井や確率アップのある抽選にはそのまま使えません。',
  'guide.case.geometric.alternative': '回数ではなく、次の出来事までの時間を知りたいなら',
  'guide.case.geometric.parameters':
    'p は1回あたりの当選率。失敗回数0は「1回目で当たる」という意味です。',
  'guide.case.exponential.title': '次の問い合わせまで、何分待つ？',
  'guide.case.exponential.summary': '来客やリクエストの到着間隔など、次の1件までの時間。',
  'guide.case.exponential.why': '一定ペースでランダムに起きる出来事の、次の1回までの待ち時間です。',
  'guide.case.exponential.conditions':
    '発生が独立で、平均の発生率が一定であること。すでに待った長さによって、これからの待ち時間の分布は変わりません。',
  'guide.case.exponential.caution':
    '予約時刻が決まっている来客や、古くなるほど壊れやすい機器の寿命にはそのまま使えません。',
  'guide.case.exponential.alternative': '何件か発生するまでの合計時間を知りたいなら',
  'guide.case.exponential.parameters': 'λ は1分あたりの平均発生回数。平均待ち時間は 1/λ 分です。',
  'guide.case.gamma.title': '3件の対応が終わるまで、合計何分？',
  'guide.case.gamma.summary': '同じ性質の対応を順に進めるときの合計時間。',
  'guide.case.gamma.why': '独立で同じ発生率の指数分布に従う時間を足すと、ガンマ分布になります。',
  'guide.case.gamma.conditions':
    '件数 k が整数の場合にこの「時間の合計」の読み方ができます。1件ごとの時間が独立で同じ指数分布に従うことが前提です。',
  'guide.case.gamma.caution':
    '実際の作業がほぼ定時で終わる場合や、作業時間が互いに影響する場合は、この前提を確認してください。',
  'guide.case.gamma.alternative': '合計ではなく、倍率の積み重ねで長くなる時間なら',
  'guide.case.gamma.parameters': 'k は件数、θ は1件の平均時間。合計の平均は k×θ です。',
  'guide.case.normal.title': '製品の寸法は、どのくらいばらつく？',
  'guide.case.normal.summary': '寸法や測定誤差など、平均付近が多く左右に似た形で広がる量。',
  'guide.case.normal.why': '中心付近が多い、左右対称の釣鐘型のばらつきを表します。',
  'guide.case.normal.conditions':
    'データがほぼ左右対称で単峰、極端な外れ値が多くないことを確かめます。',
  'guide.case.normal.caution':
    '負の値も取りうる分布です。0以上の量で平均が0に近い場合や、裾が長い場合には合わないことがあります。',
  'guide.case.normal.alternative': '0より大きく、一部だけとても大きい値なら',
  'guide.case.normal.parameters':
    'μ は平均、σ はばらつきの大きさ。グラフの初期例はテストの点数です。',
  'guide.case.lognormal.title': '応答時間は普段短いのに、ときどき長い',
  'guide.case.lognormal.summary': '応答時間や価格など、0より大きく、右側に長く広がる量。',
  'guide.case.lognormal.why':
    '値の対数を取ったときに正規分布になる量を表します。倍率の積み重ねで生まれることがあります。',
  'guide.case.lognormal.conditions':
    '値がすべて正で、対数を取ったデータがほぼ正規分布になることを確認します。',
  'guide.case.lognormal.caution':
    '「右に長い形」だけでは決まりません。ガンマ分布などとも実データへの当てはまりを比較します。',
  'guide.case.lognormal.alternative': '独立した所要時間の足し算として説明できるなら',
  'guide.case.lognormal.parameters':
    'μ と σ は元の時間ではなく、対数を取った値の平均と標準偏差です。',
  'guide.case.beta.title': '本当の成約率は、どのくらい確か？',
  'guide.case.beta.summary': '少ない観測から成功率を考える、A/Bテストの率の不確かさ。',
  'guide.case.beta.why': '0〜1の間にある確率そのものの不確かさを表せます。',
  'guide.case.beta.conditions':
    '成功・失敗を独立な同じ成功率の試行とし、その率にベータ事前分布を置くと、観測後もベータ分布になります。',
  'guide.case.beta.caution':
    '成約件数そのものの分布ではありません。事前分布の選び方で結果が変わり、これだけでA/Bテストの優劣は決まりません。',
  'guide.case.beta.alternative': '成約率が決まったときの成約件数を知りたいなら',
  'guide.case.beta.parameters':
    '一様な事前分布なら、α＝成功数＋1、β＝失敗数＋1。グラフのスライダー範囲内で試せます。',
  'guide.categoryLabel': '01　どんな量を知りたいですか？',
  'guide.caseLabel': '02　近いケースを選んでみましょう',
  'guide.detailLabel': '03　このケースを分布につなげる',
  'guide.categoryHint': '絵を手がかりに選んでください。どこからでも試せます。',
  'guide.category.outcome.hint': '1回の結果が2つに分かれる',
  'guide.category.count.hint': 'ある範囲の中で数える',
  'guide.category.waiting.hint': '次の出来事までを測る',
  'guide.category.measurement.hint': '数値の広がりを見る',
  'guide.category.proportion.hint': '率そのものの確かさを見る',
  'guide.illustration': '仕組みのイメージ（観測データではありません）',
  'guide.scene.bernoulli': '1回の表示 → クリックする / しない',
  'guide.scene.binomial': '10回のうち3回成功 → 数えるのは成功の数',
  'guide.scene.poisson': '1時間に5件 → 時間を区切って件数を数える',
  'guide.scene.negbinomial': '同じ期間でも、人ごとに回数が違う',
  'guide.scene.geometric': '外れ → 外れ → 当たり：失敗回数は2',
  'guide.scene.exponential': '今から次の1件までの時間を見る',
  'guide.scene.gamma': '1件目 ＋ 2件目 ＋ 3件目の所要時間',
  'guide.scene.normal': '中心付近が多く、左右に似た広がり',
  'guide.scene.lognormal': '小さな値が多く、一部だけとても大きい',
  'guide.scene.beta': '0%〜100%の間で、率のありそうな範囲を見る',
  'guide.next': '条件と候補を見る →',
  'guide.showAll': 'すべてのケースを見る',
} as const;
