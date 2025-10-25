# React Test TODO（最小セット）

## ルーティング/エントリ
- it 'ルートでHomePageを表示する'
- it '/search?lat=..&lng=..でSearchResultsPageを表示する'
- it '不正パラメータ時にSearchResultsPageがnull返却→後段useEffectでトップへnavigateする'

## SearchResultsPage（振る舞い）
- it 'lat/lngが無いときトップへnavigateする'
- it 'mode=bookstoreでfetchBookstoresを呼び、bookstoresを状態に格納する（APIモック）'
- it 'mode=cafeでfetchCafesを呼び、cafesを状態に格納する（APIモック）'
- it 'activeBookstore設定後にfetchCafesNearBookstoreを呼ぶ（mode=bookstore）'
- it '初回cafes取得時に先頭のカフェをactiveCafeにセットする'
- it 'ローディング中はLoadingIconを表示する'
- it '「カフェも選ぶ」クリックでカフェリスト表示に切り替わる'
- it 'カフェクリックでURLSearchParamsにc_lat/c_lngを設定しmode=cafeに更新する'
- it 'ペア選択時にb_lat/b_lng/c_lat/c_lng/mode=pairへ更新する'

## コンポーネント
- it 'PlaceDetailCardはphotosを最大3枚だけ表示する（detailsモック）'
- it 'BookstoreCardで選択したstoreがactiveBookstoreに反映される'
- it 'CafeCardで選択したcafeがactiveCafeに反映される'
- it 'LikeButtonクリックが親カードのonClickを発火させない（イベント伝播停止）'

## コンテキスト/モーダル
- it 'Header variant="search"でSearchModalの開閉ができる（ModalContextモック）'
- it 'FooterNavigationが表示される'

## APIクライアント（ユニット）
- it 'places.js: fetchBookstores/fetchCafes/… は認証ヘッダなしでGETを呼ぶ（axiosモック）'
- it 'places.js: fetchPlaceDetails/get_details_bulkは公開APIとして呼べる'
- it 'places.js: fetchGeometryも公開APIとして呼ぶ（認証ヘッダ不要）'
- it 'places.js: like/unlike系は認証ヘッダを付与して呼ぶ'

---

# スキップ/除外（理由付き）
- it '地図(PlacesMap)の内部レンダリング詳細'
  - 理由: 外部SDK/Canvas依存でユニットテストの価値が低い。E2Eで地図の存在のみ確認予定。
- it 'Google Maps LoadScriptの読み込み完了ハンドリング'
  - 理由: ランタイム環境依存が強く、単体では有益性が低い。アプリ全体のマウントで代替。

---

# 気づいた不具合/改善メモ
- LikeButtonの新実装とAPIの戻り値の不一致
  - 現状`places.js: likePlace`は`like_id`（数値）を返却。一方`LikeButton`は`like?.id`想定で`currentLikeId`を更新しているため、like直後に`currentLikeId`が未設定となり、次のunlikeでエラーになる恐れ。
  - 対応案: (1) likePlaceの戻り値を`{ id: like_id }`に正規化、または (2) LikeButton側で`setCurrentLikeId(like?.id ?? like)`と数値も受ける。
- fetchGeometryのみ認証ヘッダを付けている
  - 他のPlaces APIが公開化されたのに対し不一致。`fetchGeometry`も認証ヘッダを外すと一貫。
- ファイル名の綴り: `pages/ConfimedPage.jsx`（タイポ）
  - エクスポートは`ConfirmedPage`で動作はするが、可読性/探索性が低下。`ConfirmedPage.jsx`へリネーム推奨。
- 文字化け/表示文言の乱れ
  - 一部日本語が文字化け（例: SearchResultsPage内のボタン文言など）。i18nやUTF-8保存の統一を検討。
