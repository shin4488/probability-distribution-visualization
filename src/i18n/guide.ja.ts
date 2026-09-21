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
  'guide.open': 'この分布をグラフで試す',
  'guide.alternative': 'ほかの分布との使い分け',
  'guide.references': '分布の定義を詳しく読む',
  'guide.docTitle': 'ケースから探す | 確率分布ビジュアライザー',
  'guide.metaDescription':
    '問い合わせ件数、待ち時間、成約率などのケースから、使えそうな確率分布を探せます。理由と前提を確認し、グラフで試しましょう。',
  'guide.case.bernoulli.title': '1回の広告表示で、クリックされる？',
  'guide.case.bernoulli.summary': 'クリックする・しない、検査の合格・不合格など、結果が2つの場面。',
  'guide.case.bernoulli.why':
    '広告を1回表示したときの「クリックする／しない」を表します。クリックなら1、クリックしなければ0として扱います。検査の合格・不合格にも使えます。',
  'guide.case.bernoulli.conditions':
    '1回の結果が「クリックされる／されない」のような2択になるときに使えます。クリックされる確率を決めれば、両方の結果がどれくらい起きそうかを表せます。',
  'guide.case.bernoulli.caution':
    '結果が3種類以上ある場合は、そのままでは表せません。また、何回も表示したときのクリック数を知りたい場合は、二項分布を見てみましょう。',
  'guide.case.bernoulli.alternative': '何回も表示したときのクリック数を知りたいなら',
  'guide.case.binomial.title': '10件の商談で、何件成約する？',
  'guide.case.binomial.summary': '成約数、メールの開封数、製品100個のうちの不良品数。',
  'guide.case.binomial.why':
    '10件の商談のうち、何件が成約するかを表します。決めた回数の中で成功した回数を数えるので、メールの開封数や、製品100個のうちの不良品数にも使えます。',
  'guide.case.binomial.conditions':
    '商談を何件行うかが先に決まっていて、どの商談も同じくらい成約しそうなときに使えます。1件の成約や不成立が、ほかの商談の結果を左右しないことも前提です。',
  'guide.case.binomial.caution':
    '例えば、1社の採用を知った別の会社も採用しやすくなる場合、商談の結果は互いに影響しています。また、既存客と新規客で成約率が大きく違う場合も、全商談を同じ成約率の二項分布で表すと、実際の件数のばらつきと合わないことがあります。',
  'guide.case.binomial.alternative': '成約「数」ではなく、成約「率」の不確かさを知りたいなら',
  'guide.case.poisson.title': '1時間に、何件の問い合わせが来る？',
  'guide.case.poisson.summary': '問い合わせ件数、来客数、一定区間での不具合の件数。',
  'guide.case.poisson.why':
    '問い合わせを1時間ごとに数えたとき、0件、1件、2件…がそれぞれどのくらい起きそうかを表します。来客数や、一定区間にある不具合の件数にも使えます。',
  'guide.case.poisson.conditions':
    '問い合わせを1時間ずつ区切って数えるなら、比べる各1時間で平均件数がほぼ同じで、その1時間の途中でも来るペースが変わらないことが前提です。1件の問い合わせが別の問い合わせを引き起こさないことも必要です。',
  'guide.case.poisson.caution':
    '昼は1時間に平均20件、夜は平均2件なら、昼と夜を別々の分布で表します。さらに同じ時間帯に絞っても、問い合わせが集中する日とほとんど来ない日の差がポアソン分布の予測より大きい場合は、より大きなばらつきを表せる負の二項分布を検討します。',
  'guide.case.poisson.alternative': '人や場所によって発生ペースがばらつくなら',
  'guide.case.negbinomial.title': 'お客さんごとの来店回数に、大きな差がある',
  'guide.case.negbinomial.summary': '来店回数、購入回数、投稿数など、少数の人に回数が偏る場面。',
  'guide.case.negbinomial.why':
    '1か月の来店回数が、ほとんど来ない人から何度も来る人まで大きく違う場合に使います。ポアソン分布では表しきれない件数のばらつきも表せます。購入回数や投稿数にも同じ考え方が使えます。',
  'guide.case.negbinomial.conditions':
    '同じ期間で比べても、よく来るお客さんと、たまにしか来ないお客さんがいる場面で候補になります。各人の件数はポアソン分布、その来店ペースの個人差はガンマ分布で表す、という考え方が一例です。',
  'guide.case.negbinomial.caution':
    '「そもそも来店しない人」が別の理由で多い場合や、時期によって来店ペースが変わる場合は、その仕組みも考える必要があります。',
  'guide.case.negbinomial.alternative': '全員の発生ペースがほぼ同じと考えられるなら',
  'guide.case.geometric.title': '初めて当たるまで、何回外れる？',
  'guide.case.geometric.summary': 'ガチャの外れ回数、初成約までの不成立回数。',
  'guide.case.geometric.why':
    '抽選で初めて当たるまでに、何回外れるかを表します。商談で初めて成約するまでの不成立回数も同じように数えられます。',
  'guide.case.geometric.conditions':
    '毎回の当選確率が同じで、前の結果が次の結果に影響しないときに使えます。「何回も外れたから、次は当たりやすい」という仕組みがないことが前提です。',
  'guide.case.geometric.caution':
    '数えるのは当たるまでの「外れ回数」です。1回目で当たれば0回、3回目で当たれば2回です。当たりを含む抽選回数を知るには1を足します。一定回数で必ず当たる仕組みや、途中で当選確率が上がる抽選には、そのまま使えません。',
  'guide.case.geometric.alternative': '回数ではなく、次の出来事までの時間を知りたいなら',
  'guide.case.exponential.title': '次の問い合わせまで、何分待つ？',
  'guide.case.exponential.summary': '来客やリクエストの到着間隔など、次の1件までの時間。',
  'guide.case.exponential.why':
    '問い合わせがランダムに来るとき、次の1件まで何分待つかを表します。来客やリクエストが届くまでの待ち時間にも使えます。',
  'guide.case.exponential.conditions':
    '問い合わせを待つ時間帯を通じて、平均的な発生ペースが変わらず、問い合わせ同士が影響しないことが前提です。「すでに10分待ったから、そろそろ来るはず」とは考えず、今からさらに待つ時間の見込みは、待ち始めたときと同じです。',
  'guide.case.exponential.caution':
    '予約客のように到着時刻が決まっている場合には向きません。機器が壊れるまでの時間に使う場合も、劣化によって故障しやすくなる機器の寿命は、指数分布ではうまく表せません。',
  'guide.case.exponential.alternative': '何件か発生するまでの合計時間を知りたいなら',
  'guide.case.gamma.title': '3件の対応が終わるまで、合計何分？',
  'guide.case.gamma.summary': '同じ性質の対応を順に進めるときの合計時間。',
  'guide.case.gamma.why':
    '3件の対応を順に行うとき、終わるまでの合計時間を表します。1件ずつの所要時間が同じ指数分布に従い、互いに影響しなければ、合計はガンマ分布になります。例えば1件の平均が2分なら、3件の合計は平均6分です。',
  'guide.case.gamma.conditions':
    '各対応の平均時間が同じで、1件が長引いてもほかの対応時間に影響しないことが必要です。また、各対応の所要時間を指数分布で表せることを確認します。単に時間を足せば必ずガンマ分布になるわけではありません。',
  'guide.case.gamma.caution':
    '毎回ほぼ同じ時間で終わる作業や、前の作業の遅れが次の作業に影響する場合は、この使い方には合いません。',
  'guide.case.gamma.alternative': '合計ではなく、倍率の積み重ねで長くなる時間なら',
  'guide.case.normal.title': '製品の寸法は、どのくらいばらつく？',
  'guide.case.normal.summary': '寸法や測定誤差など、平均付近が多く左右に似た形で広がる量。',
  'guide.case.normal.why':
    '製品の寸法や測定誤差が、平均に近い値ほど多く、平均から離れるほど少なくなる場合に使います。平均を中心に左右対称の釣鐘型のばらつきを表します。',
  'guide.case.normal.conditions':
    '寸法をたくさん測ったときに、平均付近が多く、左右にほぼ同じように広がるデータに使います。山が1つで、極端に離れた値が少ないかを確認してください。',
  'guide.case.normal.caution':
    'この分布は負の値も含みます。必ず0以上になる量を扱うときや、一部だけとても大きな値が出るときは、モデルが不自然な値を予測しないか確認しましょう。',
  'guide.case.normal.alternative': '0より大きく、一部だけとても大きい値なら',
  'guide.case.lognormal.title': '応答時間は普段短いのに、ときどき長い',
  'guide.case.lognormal.summary': '応答時間や価格など、0より大きく、右側に長く広がる量。',
  'guide.case.lognormal.why':
    '応答時間のように、値は必ず0より大きく、普段は小さいのに、ときどき非常に大きくなる量の候補です。いくつもの要因が「何倍」という形で積み重なる場合に現れることがあります。',
  'guide.case.lognormal.conditions':
    '時間や価格のように、値が必ず0より大きいときに候補になります。さらに、値の対数を取ると、左右対称の釣鐘型に近づくかを確かめます。',
  'guide.case.lognormal.caution':
    '右側に裾が長い分布は、ほかにもあります。ガンマ分布などと比べて、実際のデータにどれが合うかを確かめてください。',
  'guide.case.lognormal.alternative': '独立した所要時間の足し算として説明できるなら',
  'guide.case.beta.title': '本当の成約率は、どのくらい確か？',
  'guide.case.beta.summary': '少ない観測から成功率を考える、A/Bテストの率の不確かさ。',
  'guide.case.beta.why':
    '商談の成約・不成立の記録から、本当の成約率がどのくらいかを考えます。例えば10件中3件の成約だけでは、成約率が正確に30%だとは言い切れません。ベータ分布は、0%から100%の各成約率がどのくらいありそうかを表します。',
  'guide.case.beta.conditions':
    '各商談の成約率が同じで、1件の結果がほかの結果に影響しないことを仮定します。データを見る前に「どの成約率がありそうか」をベータ分布で表し、成約・不成立の記録を加えて、その見積もりを更新します。',
  'guide.case.beta.caution':
    'データが少ないと、「どの成約率も同じくらいありそう」と始めるか、過去の経験から「30%前後だろう」と始めるかで、同じ記録からでも推定結果が変わります。A/Bテストで比べるときは、この最初の設定と集まったデータの量も確認します。',
  'guide.case.beta.alternative': '成約率が決まったときの成約件数を知りたいなら',
  'guide.categoryLabel': '01　何を知りたいですか？',
  'guide.caseLabel': '02　近いケースを選んでください',
  'guide.detailLabel': '03　分布と使い方',
  'guide.category.outcome.hint': '1回の結果が2つに分かれる',
  'guide.category.count.hint': 'ある範囲の中で数える',
  'guide.category.waiting.hint': '次の出来事までを測る',
  'guide.category.measurement.hint': '数値の広がりを見る',
  'guide.category.proportion.hint': '率そのものの確かさを見る',
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
