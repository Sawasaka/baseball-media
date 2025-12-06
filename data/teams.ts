/**
 * チームデータ（ローカル管理）
 * microCMS を使わず、TypeScript ファイルで直接管理する
 */

export type LeagueCode = 'boys' | 'senior' | 'young';

/**
 * Team 型定義
 * TeamCardコンポーネントと互換性のある形式
 */
export interface Team {
  id: string;                    // 一意のID
  name: string;                  // チーム名
  prefecture: string[];          // 都道府県（配列形式）
  area?: string;                 // 活動エリア（市区町村など）
  league: string[];              // リーグ名（配列形式、例: ['ボーイズ']）
  branch?: string;               // 所属支部
  catchcopy?: string;            // 1行キャッチコピー（事実に基づく）
  officialurl?: string;          // 公式サイトURL
  feature1?: string;             // 特徴タグ1
  feature2?: string;             // 特徴タグ2
  feature3?: string;             // 特徴タグ3
  representative?: string;       // 代表者名
}

/**
 * 大阪北支部 ボーイズリーグ チームデータ
 * 
 * データソース:
 * - ボーイズリーグ関西ブロック公式サイト (https://www.boys-kansai.com/)
 * - 各チーム公式サイト
 * - 球歴.com (https://www.kyureki.com/)
 * 
 * 注意: 公式URLは確認できたもののみ記載。キャッチコピーは公式サイトの情報に基づく。
 */
export const teams: Team[] = [
  {
    id: 'boys-osaka-kita-ikeda',
    name: '池田ボーイズ',
    prefecture: ['大阪府'],
    area: '池田市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '池田市を拠点に活動。団結・友情・勇気・規律・忍耐力の養成を目指す中学硬式野球チーム。',
    officialurl: 'https://www.ikedaboysbaseball.com/',
    representative: '川井 雅廣',
  },
  {
    id: 'boys-osaka-kita-ibaraki-naniwa',
    name: '茨木ナニワボーイズ',
    prefecture: ['大阪府'],
    area: '茨木市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '茨木市で活動。立浪和義（中日）、橋本清（巨人）らプロ野球選手を輩出した名門チーム。',
    officialurl: 'https://naniwaboys.com/',
    representative: '福田 幸男',
  },
  {
    id: 'boys-osaka-kita-katano',
    name: '大阪交野ボーイズ',
    prefecture: ['大阪府'],
    area: '交野市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '交野市を拠点に活動する中学硬式野球チーム。',
    officialurl: 'http://osaka-katanoboys.com/',
    representative: '森本 誠',
  },
  {
    id: 'boys-osaka-kita-osakakita',
    name: '大阪北ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市北区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '小学部・中学部を持つボーイズリーグチーム。多数の大会で優勝・準優勝の実績あり。',
    officialurl: 'http://osakakita1.cloudfree.jp/',
    representative: '佐藤 義治',
  },
  {
    id: 'boys-osaka-kita-shibashima',
    name: '大阪柴島ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市東淀川区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '大阪市東淀川区・柴島エリアを拠点に活動する中学硬式野球チーム。',
    officialurl: 'http://ikz.jp/hp/osaka-/',
    representative: '上村 邦夫',
  },
  {
    id: 'boys-osaka-kita-konohana',
    name: '大阪此花ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市此花区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '大阪市此花区を拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://www.netto.jp/konohana/',
    representative: '別所 伊織',
  },
  {
    id: 'boys-osaka-kita-higashi',
    name: '大阪東ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市東成区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '大阪市東成区を拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://osakahigashi.jimdofree.com/',
    representative: '関 克実',
  },
  {
    id: 'boys-osaka-kita-higashiyodogawa',
    name: '大阪東淀川ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市東淀川区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '大阪市東淀川区を拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://higashiyodogawa-boys.jimdofree.com/',
    representative: '岩曽 貴史',
  },
  {
    id: 'boys-osaka-kita-hokusetsu',
    name: '大阪北摂ボーイズ',
    prefecture: ['大阪府'],
    area: '豊中市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    representative: '川尻 伸一郎',
  },
  {
    id: 'boys-osaka-kita-osaka-minoo',
    name: '大阪箕面ボーイズ',
    prefecture: ['大阪府'],
    area: '箕面市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '平成3年創部。村上奉斗(ソフトバンク1位)らプロ選手を輩出。甲子園出場者多数の強豪。',
    officialurl: 'https://www.osakaminoboys.com/',
    representative: '山﨑 和喜心',
  },
  {
    id: 'boys-osaka-kita-miyakojima',
    name: '大阪都島ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市都島区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '大阪市都島区を拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://miyakojima-boys.jimdofree.com/',
    representative: '浜野 裕康',
  },
  {
    id: 'boys-osaka-kita-oyodo',
    name: '大淀ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市北区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: 'ジャイアンツカップ出場実績あり。勝田成(広島)らプロ選手を輩出。専用球場を保有。',
    officialurl: 'https://www.oyodoboys.com/',
    representative: '荒 彰慶',
  },
  {
    id: 'boys-osaka-kita-kitaosaka',
    name: '北大阪ボーイズ',
    prefecture: ['大阪府'],
    area: '箕面市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '日本少年野球連盟大阪北支部所属。箕面市を拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://kitaosaka-boys.com/',
    representative: '西浦 正宗',
  },
  {
    id: 'boys-osaka-kita-senriyama',
    name: '千里山ボーイズ',
    prefecture: ['大阪府'],
    area: '吹田市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '北摂地区を中心に活動。「文武両道」を基本とし、野球・勉強・学校生活をサポート。',
    officialurl: 'https://senriyamaboys.89dream.jp/',
    representative: '前澤 秀和',
  },
  {
    id: 'boys-osaka-kita-daitonawate',
    name: '大東畷ボーイズ',
    prefecture: ['大阪府'],
    area: '大東市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '大東市・四條畷市エリアを拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://www.instagram.com/daito_nawate_baseball/',
    representative: '西村 豪',
  },
  {
    id: 'boys-osaka-kita-takatsuki',
    name: '高槻ボーイズ',
    prefecture: ['大阪府'],
    area: '高槻市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '高槻市萩谷総合公園野球場を拠点に活動。「自分を試す チャンスは今！」',
    officialurl: 'https://www.takatsuki-boys.com/',
    representative: '横山 雅人',
  },
  {
    id: 'boys-osaka-kita-takatsuki-chuo',
    name: '関西高槻中央ボーイズ',
    prefecture: ['大阪府'],
    area: '高槻市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '高槻市を拠点に活動。野球を通じた人間形成を目指す中学硬式野球チーム。',
    officialurl: 'https://www.chuo-boys.com/',
    representative: '林 尚司',
  },
  {
    id: 'boys-osaka-kita-toyonaka',
    name: '豊中ボーイズ',
    prefecture: ['大阪府'],
    area: '豊中市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '豊中市で活動する伝統ある中学硬式野球チーム。',
    officialurl: 'https://www.netto.jp/alltoyonaka/',
    representative: '坂戸 康',
  },
  {
    id: 'boys-osaka-kita-nishiyodo',
    name: '西淀ボーイズ',
    prefecture: ['大阪府'],
    area: '大阪市西淀川区',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '1993年創部。矢倉グラウンドを拠点に活動。スローガンは「継続は力」。',
    officialurl: 'https://www.nishiyodoboys.jp/',
    representative: '林 春雄',
  },
  {
    id: 'boys-osaka-kita-neyagawa-nawate',
    name: '寝屋川畷ボーイズ',
    prefecture: ['大阪府'],
    area: '寝屋川市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '寝屋川市・四條畷市エリアを拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://www.netto.jp/neyagawanawate/',
    representative: '深田 暁生',
  },
  {
    id: 'boys-osaka-kita-hirakata',
    name: '枚方ボーイズ',
    prefecture: ['大阪府'],
    area: '枚方市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '日本一14回の超名門。ジャイアンツカップ4回、全国大会10回優勝。佐々木泰(ドラ1)ら輩出。',
    officialurl: 'https://www.all-hirakata.com/',
    representative: '堀田 稔',
  },
  {
    id: 'boys-osaka-kita-minoo',
    name: '箕面ボーイズ',
    prefecture: ['大阪府'],
    area: '箕面市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '箕面市を拠点に活動する中学硬式野球チーム。',
    officialurl: 'http://minohboys.com/',
    representative: '岡島 裕明',
  },
  {
    id: 'boys-osaka-kita-moriguchi',
    name: '守口ボーイズ',
    prefecture: ['大阪府'],
    area: '守口市',
    league: ['ボーイズ'],
    branch: '大阪北支部',
    catchcopy: '守口市を拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://mb-mb-mb.jimdofree.com/',
  },
  // ===================================
  // 大阪中央支部 ボーイズリーグ
  // ===================================
  {
    id: 'boys-osaka-chuo-kashiwara',
    name: '大阪柏原ボーイズ',
    prefecture: ['大阪府'],
    area: '柏原市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '柏原市を拠点に活動。地域に根ざした中学硬式野球チーム。',
    officialurl: 'https://www.ikz.jp/hp/kashibo/',
    representative: '堤花 利文',
  },
  {
    id: 'boys-osaka-chuo-yao',
    name: '大阪八尾ボーイズ',
    prefecture: ['大阪府'],
    area: '八尾市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '八尾フレンドとして活動。中学部8回・小学部18回の全国優勝を誇る名門チーム。',
    officialurl: 'https://www.yaofriend.com/',
    representative: '増田 俊之',
  },
  {
    id: 'boys-osaka-chuo-okibe',
    name: '意岐部ボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '東大阪市意岐部エリアを拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://www.ikz.jp/hp/allokb/',
    representative: '関谷 龍生',
  },
  {
    id: 'boys-osaka-chuo-kitakawachi-daito',
    name: '北河内大東ボーイズ',
    prefecture: ['大阪府'],
    area: '大東市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '1977年創部の伝統チーム。灰塚専用グラウンドを拠点に、初心者歓迎で基礎から丁寧に指導。',
    officialurl: 'https://kitakawachidaito-boys.jimdofree.com/',
    representative: '板野 俊彦',
  },
  {
    id: 'boys-osaka-chuo-nagase',
    name: 'ナガセボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '長瀬青少年運動広場・金岡公園野球場を拠点に活動。中学部・小学部があり、体験・見学随時受付中。',
    officialurl: 'https://nagase-tigers.amebaownd.com/',
    representative: '松嶋 誠二',
  },
  {
    id: 'boys-osaka-chuo-habikino',
    name: '羽曳野ボーイズ',
    prefecture: ['大阪府'],
    area: '羽曳野市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '2015年ジャイアンツカップ全国制覇。ダルビッシュ有・太田椋らプロ選手を輩出する超名門。',
    officialurl: 'https://habikino-boys.com/',
    representative: '羽山 武志',
  },
  {
    id: 'boys-osaka-chuo-higashiosaka-kawachi',
    name: '東大阪河内ボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '2007年創部。「失敗を恐れず・言い訳をせず」選手のやる気を重視し夢をサポート。',
    officialurl: 'http://braves-boys.jp/',
    representative: '神代 一幸',
  },
  {
    id: 'boys-osaka-chuo-higashiosaka-kita',
    name: '東大阪北ボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: 'オリックスカップ優勝・関西秋季本戦出場。十三駅徒歩10分の専用グラウンドで充実の設備。',
    officialurl: 'https://higashiosakakita-boys.net/',
    representative: '橋口 博文',
  },
  {
    id: 'boys-osaka-chuo-higashiosaka-nagata',
    name: '東大阪長田ボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '「心こそ大切なれ」2018年創部。元プロ野球選手が直接指導し、選手個人の能力向上と勝利にこだわる。',
    officialurl: 'https://nagata-boys.net/',
    representative: '山崎 慎太郎',
  },
  {
    id: 'boys-osaka-chuo-higashiosaka-hanazono',
    name: '東大阪花園ボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '中学部・小学部・育成部の3部門構成。市内5つのグラウンドで活動、高校進学サポートも充実。',
    officialurl: 'https://www.higasioosakahanazonoboys.org/',
    representative: '山崎 哲也',
  },
  {
    id: 'boys-osaka-chuo-higashiosaka-fuse',
    name: '東大阪布施ボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '創部60年以上の伝統チーム。全国選手権・ジャイアンツカップ予選に出場、大阪市塾代助成事業対応。',
    officialurl: 'https://hosakafuseboys.89dream.jp/',
    representative: '立住 雅志',
  },
  {
    id: 'boys-osaka-chuo-hiraoka',
    name: '枚岡ボーイズ',
    prefecture: ['大阪府'],
    area: '東大阪市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '中学部・小学部の2部門構成。女子選手も活躍、枚岡ボーイズ杯を主催する伝統チーム。',
    officialurl: 'https://hiraoka.89dream.jp/',
    representative: '中川 雅仁',
  },
  {
    id: 'boys-osaka-chuo-fujiidera',
    name: '藤井寺ボーイズ',
    prefecture: ['大阪府'],
    area: '藤井寺市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '春季全国大会BEST8。関西秋季大会支部第一代表。JUNIOR ALL JAPAN主将・関西選抜を輩出。',
    officialurl: 'https://www.fujiideraboys.com/',
    representative: '辻野 輝',
  },
  {
    id: 'boys-osaka-chuo-matsubara',
    name: '松原ボーイズ',
    prefecture: ['大阪府'],
    area: '松原市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '旧オール松原。中学部専用の天美西公園グランドを拠点に、小学部・中学部で活動。進路サポートも充実。',
    officialurl: 'http://jhs.matsubara-boys.net/',
    representative: '鹿島 剛',
  },
  {
    id: 'boys-osaka-chuo-yao-chuo',
    name: '八尾中央ボーイズ',
    prefecture: ['大阪府'],
    area: '八尾市',
    league: ['ボーイズ'],
    branch: '大阪中央支部',
    catchcopy: '八尾市を拠点に活動する中学硬式野球チーム。',
    officialurl: 'https://www4.hp-ez.com/hp/yao-bc-boys',
    representative: '長嶺 和久',
  },
];

/**
 * チーム検索用ヘルパー関数
 */

// 全チームを取得
export function getAllTeams(): Team[] {
  return teams;
}

// リーグでフィルタ（文字列 or リーグコード）
export function getTeamsByLeague(league: string): Team[] {
  const leagueName = league === 'boys' ? 'ボーイズ' : league === 'senior' ? 'シニア' : league === 'young' ? 'ヤング' : league;
  return teams.filter(team => team.league.includes(leagueName));
}

// 都道府県でフィルタ
export function getTeamsByPrefecture(prefecture: string): Team[] {
  return teams.filter(team => team.prefecture.includes(prefecture));
}

// リーグ + 都道府県でフィルタ
export function getTeamsByLeagueAndPrefecture(league: string, prefecture: string): Team[] {
  const leagueName = league === 'boys' ? 'ボーイズ' : league === 'senior' ? 'シニア' : league === 'young' ? 'ヤング' : league;
  return teams.filter(team => team.league.includes(leagueName) && team.prefecture.includes(prefecture));
}

// 支部でフィルタ
export function getTeamsByBranch(branch: string): Team[] {
  return teams.filter(team => team.branch === branch);
}

// IDでチームを取得
export function getTeamById(id: string): Team | undefined {
  return teams.find(team => team.id === id);
}
