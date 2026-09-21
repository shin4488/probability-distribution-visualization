export const guideJa = {
  'nav.charts': '分布から見る',
  'nav.guide': 'ケースから探す',
  'guide.eyebrow': '使いどころから調べる',
  'guide.title': 'このケースには、どの確率分布？',
  'guide.step1': '知りたいことを選ぶ',
  'guide.step2': '具体例を見る',
  'guide.step3': '分布を試す',
  'guide.category.all': 'すべて',
  'guide.category.outcome': '起きる・起きない',
  'guide.category.count': '何件・何回',
  'guide.category.waiting': 'いつまで待つ',
  'guide.category.measurement': '大きさ・ばらつき',
  'guide.category.proportion': '割合の不確かさ',
  'guide.choose': 'ケースを見る',
  'guide.back': 'ケース一覧に戻る',
  'guide.candidate': '分布の候補',
  'guide.why': 'なぜこの分布？',
  'guide.conditions': '使える条件',
  'guide.caution': '注意点',
  'guide.parameters': 'グラフの見方',
  'guide.open': 'この分布をグラフで試す',
  'guide.alternative': 'ほかの分布との使い分け',
  'guide.references': '分布の定義を詳しく読む',
  'guide.docTitle': 'ケースから探す | 確率分布ビジュアライザー',
  'guide.metaDescription':
    '問い合わせ件数、待ち時間、成約率などのケースから、使えそうな確率分布を探せます。理由と前提を確認し、グラフで試しましょう。',
  'guide.case.bernoulli.title': '1回の広告表示で、クリックされる？',
  'guide.case.bernoulli.summary': 'クリックする・しない、検査の合格・不合格など、結果が2つの場面。',
  'guide.case.bernoulli.why': '1回の結果を「起きた＝1、起きなかった＝0」で表します。',
  'guide.case.bernoulli.conditions':
    '1回の結果が「クリックされる／されない」のような2択になるときに使えます。クリックされる確率を決めれば、両方の結果がどれくらい起きそうかを表せます。',
  'guide.case.bernoulli.caution':
    '結果が3種類以上ある場合は、そのままでは表せません。また、何回も表示したときのクリック数を知りたい場合は、二項分布を見てみましょう。',
  'guide.case.bernoulli.alternative': '何回も表示したときのクリック数を知りたいなら',
  'guide.case.bernoulli.parameters':
    'p はクリックされる確率です。例えば p＝0.3 は30%。p を大きくすると、「クリックされる」側の棒が高くなります。',
  'guide.case.binomial.title': '10件の商談で、何件成約する？',
  'guide.case.binomial.summary': '成約数、メールの開封数、製品100個のうちの不良品数。',
  'guide.case.binomial.why': '決めた回数のうち、条件を満たした回数を数えます。',
  'guide.case.binomial.conditions':
    '商談を何件行うかが先に決まっていて、どの商談も同じくらい成約しそうなときに使えます。1件の成約や不成立が、ほかの商談の結果を左右しないことも前提です。',
  'guide.case.binomial.caution':
    'お客さんによって成約の見込みが大きく違うときや、紹介などで結果がつながるときは、この前提に合うかを確かめましょう。',
  'guide.case.binomial.alternative': '成約「数」ではなく、成約「率」の不確かさを知りたいなら',
  'guide.case.binomial.parameters':
    'n は商談の件数、p は1件あたりの成約率です。例えば10件の商談なら n＝10。p＝0.3 にすると、成約率30%の場合を試せます。',
  'guide.case.poisson.title': '1時間に、何件の問い合わせが来る？',
  'guide.case.poisson.summary': '問い合わせ件数、来客数、一定区間での不具合の件数。',
  'guide.case.poisson.why': '一定の時間や範囲に起こる出来事の件数を表します。',
  'guide.case.poisson.conditions':
    '「1時間あたり」のように範囲をそろえて件数を数えるときに使えます。問い合わせが互いに影響せず、その間の平均的な発生ペースが一定と考えられることが前提です。',
  'guide.case.poisson.caution':
    '昼は多く夜は少ないなら、時間帯を分けて考えましょう。同じ条件でも件数が大きくばらつく場合は、負の二項分布も候補になります。',
  'guide.case.poisson.alternative': '人や場所によって発生ペースがばらつくなら',
  'guide.case.poisson.parameters':
    'λ は、決めた時間内に来る問い合わせの平均件数です。1時間に平均5件なら λ＝5。値を増やすと、多い件数のほうへ山が移動します。',
  'guide.case.negbinomial.title': 'お客さんごとの来店回数に、大きな差がある',
  'guide.case.negbinomial.summary': '来店回数、購入回数、投稿数など、少数の人に回数が偏る場面。',
  'guide.case.negbinomial.why':
    '発生ペースに個人差がある件数を、ポアソン分布より大きなばらつきで表せます。',
  'guide.case.negbinomial.conditions':
    '同じ期間で比べても、よく来るお客さんと、たまにしか来ないお客さんがいる場面で候補になります。各人の件数はポアソン分布、その来店ペースの個人差はガンマ分布で表す、という考え方が一例です。',
  'guide.case.negbinomial.caution':
    '「そもそも来店しない人」が別の理由で多い場合や、時期によって来店ペースが変わる場合は、その仕組みも考える必要があります。',
  'guide.case.negbinomial.alternative': '全員の発生ペースがほぼ同じと考えられるなら',
  'guide.case.negbinomial.parameters':
    'このグラフは r と p で形を変えます。平均回数は r(1−p)/p です。p を小さくすると、平均に対するばらつきが大きくなります。',
  'guide.case.geometric.title': '初めて当たるまで、何回外れる？',
  'guide.case.geometric.summary': 'ガチャの外れ回数、初成約までの不成立回数。',
  'guide.case.geometric.why': '初めて成功するまでの「失敗回数」を数えます。',
  'guide.case.geometric.conditions':
    '毎回の当選確率が同じで、前の結果が次の結果に影響しないときに使えます。「何回も外れたから、次は当たりやすい」という仕組みがないことが前提です。',
  'guide.case.geometric.caution':
    'このグラフが数えるのは、当たるまでの「外れ回数」です。当たりの1回も含めるなら＋1してください。天井や確率アップのある抽選には、そのまま使えません。',
  'guide.case.geometric.alternative': '回数ではなく、次の出来事までの時間を知りたいなら',
  'guide.case.geometric.parameters':
    'p は1回あたりの当選確率です。例えば p＝0.3 は30%。横軸の0は「外れなし」、つまり1回目で当たることを表します。',
  'guide.case.exponential.title': '次の問い合わせまで、何分待つ？',
  'guide.case.exponential.summary': '来客やリクエストの到着間隔など、次の1件までの時間。',
  'guide.case.exponential.why': '一定ペースでランダムに起きる出来事の、次の1回までの待ち時間です。',
  'guide.case.exponential.conditions':
    '問い合わせが互いに影響せず、平均的な発生ペースが一定と考えられるときに使えます。ここまで何分待ったかによって、これからの待ち時間の見込みが変わらないモデルです。',
  'guide.case.exponential.caution':
    '予約時刻が決まっている来客には向きません。機器の寿命に使う場合も、古くなるほど壊れやすいなら、別のモデルを考えましょう。',
  'guide.case.exponential.alternative': '何件か発生するまでの合計時間を知りたいなら',
  'guide.case.exponential.parameters':
    'λ は1分あたりの平均発生回数です。λ＝0.5 なら平均2分に1回。λ を大きくすると、次の1件までの待ち時間は短くなります。',
  'guide.case.gamma.title': '3件の対応が終わるまで、合計何分？',
  'guide.case.gamma.summary': '同じ性質の対応を順に進めるときの合計時間。',
  'guide.case.gamma.why': '独立で同じ発生率の指数分布に従う時間を足すと、ガンマ分布になります。',
  'guide.case.gamma.conditions':
    '各対応にかかる時間を指数分布で表せて、平均時間が同じと考えられるときに使えます。1件の対応時間がほかの対応時間に影響せず、その時間を順に足し合わせる場面です。',
  'guide.case.gamma.caution':
    '毎回ほぼ同じ時間で終わる作業や、前の作業の遅れが次の作業に影響する場合は、この前提から外れます。k を件数として読めるのは正の整数のときだけです。',
  'guide.case.gamma.alternative': '合計ではなく、倍率の積み重ねで長くなる時間なら',
  'guide.case.gamma.parameters':
    '3件の対応なら k＝3、1件の平均が2分なら θ＝2 にします。この場合、合計時間の平均は3×2＝6分です。',
  'guide.case.normal.title': '製品の寸法は、どのくらいばらつく？',
  'guide.case.normal.summary': '寸法や測定誤差など、平均付近が多く左右に似た形で広がる量。',
  'guide.case.normal.why': '中心付近が多い、左右対称の釣鐘型のばらつきを表します。',
  'guide.case.normal.conditions':
    '寸法をたくさん測ったときに、平均付近が多く、左右にほぼ同じように広がるデータに使います。山が1つで、極端に離れた値が少ないかを確認してください。',
  'guide.case.normal.caution':
    'この分布は負の値も含みます。必ず0以上になる量を扱うときや、一部だけとても大きな値が出るときは、モデルが不自然な値を予測しないか確認しましょう。',
  'guide.case.normal.alternative': '0より大きく、一部だけとても大きい値なら',
  'guide.case.normal.parameters':
    'μ は平均、σ はばらつきの大きさです。μ を動かすと山が左右に移り、σ を大きくすると山が広がります。グラフの初期値と活用例はテストの点数を使っています。',
  'guide.case.lognormal.title': '応答時間は普段短いのに、ときどき長い',
  'guide.case.lognormal.summary': '応答時間や価格など、0より大きく、右側に長く広がる量。',
  'guide.case.lognormal.why':
    '値の対数を取ったときに正規分布になる量を表します。倍率の積み重ねで生まれることがあります。',
  'guide.case.lognormal.conditions':
    '時間や価格のように、値が必ず0より大きいときに候補になります。さらに、値の対数を取ると、左右対称の釣鐘型に近づくかを確かめます。',
  'guide.case.lognormal.caution':
    '右側に裾が長い分布は、ほかにもあります。ガンマ分布などと比べて、実際のデータにどれが合うかを確かめてください。',
  'guide.case.lognormal.alternative': '独立した所要時間の足し算として説明できるなら',
  'guide.case.lognormal.parameters':
    'μ を増やすと全体の値が大きくなり、σ を増やすと大きな値のほうへ裾が広がります。μ と σ は、元の時間ではなく、対数を取った値の平均と標準偏差です。',
  'guide.case.beta.title': '本当の成約率は、どのくらい確か？',
  'guide.case.beta.summary': '少ない観測から成功率を考える、A/Bテストの率の不確かさ。',
  'guide.case.beta.why': '0〜1の間にある確率そのものの不確かさを表せます。',
  'guide.case.beta.conditions':
    '「成約する／しない」の結果から、まだわからない成約率を考えるときに使えます。各商談の結果が互いに影響せず、同じ成約率を持つと仮定し、率への事前の見込みをベータ分布で表します。',
  'guide.case.beta.caution':
    'ここで表すのは成約「数」ではなく、成約「率」への見込みです。最初にどんな見込みを置くかでも結果が変わるため、このグラフだけでA/Bテストの勝敗が決まるわけではありません。',
  'guide.case.beta.alternative': '成約率が決まったときの成約件数を知りたいなら',
  'guide.case.beta.parameters':
    '最初はどの率も同じくらいありそうだと考えるなら、α＝β＝1から始めます。成功1回・失敗4回を観測した例では、α＝2、β＝5にして試せます。',
  'guide.categoryLabel': '01　何を知りたいですか？',
  'guide.caseLabel': '02　近いケースを選んでください',
  'guide.detailLabel': '03　分布と使い方',
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
  'guide.next': '使える分布を見る →',
  'guide.showAll': 'すべてのケースを見る',
} as const;
