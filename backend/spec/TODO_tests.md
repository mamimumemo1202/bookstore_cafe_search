# テストTODO一覧（RSpec it 見出し、日本語）

このファイルは追加すべきテスト観点のメモです。中身の実装は不要。影響が小さいもの・外部依存が大きいものはスキップ理由を併記します。

## 認証（Devise Token Auth）
- it 'サインアップで確認トークンが生成される'
- it 'ログインでaccess-token/client/uidヘッダが返る'
- it 'ログイン後にvalidate_tokenが200を返す'

## Likes API（api/v1/likes）
- it 'いいね作成でlikes_countがインクリメントされる'
- it '同一ユーザーの二重いいねは作成されない（ユニーク制約）'
- it 'いいね解除でlikes_countがデクリメントされる'
- it '認証なしのアクセスは401を返す'
- it 'typeが不正なら400を返す（invalid type）'
- it '他ユーザーのlikeは削除できない'

## Places API（api/v1/places）
- it 'indexがplace_id/name/address/likes_count/like_id/pair_like_id/lat/lng/photo_refを返す'
- it 'indexはtypeパラメータ（Bookstore/Cafe）で結果が切り替わる'
- it 'indexはbookstore_place_id指定時にpair_like_idが付与される（カフェ側）'
- it 'showが詳細（name/geometry/opening_hours等）を返す'
- it 'get_details_bulkが要求したplace_ids分の要素を返す'

### スキップ（外部API依存が大きい）
- it 'showのphotosは最大3枚に制限される'
  - 理由: Google Places APIのレスポンスに依存。WebMockで詳細モックを用意すれば可だが、影響はUI表示のみで小。後回し。

## Models
### Like
- it 'user/likeableの組み合わせでユニーク（スコープ付き一意）'
- it 'likeable_typeは[Bookstore/Cafe/Pair]のみ許可（inclusion）'

### Bookstore
- it 'place_idは必須・ユニーク・長さ255以下'

### Cafe
- it 'place_idは必須・ユニーク・長さ255以下'

### Pair
- it 'bookstore/cafeの両方が必須'
- it 'bookstore_idとcafe_idの組み合わせでユニーク'

## Services
### Places::Normalize
- it 'normalize_nearby_resultsがlat/lng/vicinity/photo_refを整形する'

### Places::BuildPayload
- it 'likes_countをcounts_mapから正しく埋め込む'
- it 'like_idをユーザーのlike_mapから正しく埋め込む'
- it 'pair_like_idをpair_mapから正しく埋め込む'

### スキップ（依存注入の工数がやや大）
- it 'SearchPlaces.callが外部クライアント→Normalize→BuildPayloadを連携する'
  - 理由: GooglePlacesClientモック、Lookup/Countsの多段スタブが必要。ユニット分割の検証で十分なため後回し。

## Clients
### GooglePlacesClient
- it 'fetch_place_geometryがgeometryのみ返す'
- it 'fetch_place_detailsがphotosを最大3件に制限する'
- it 'fetch_place_details_bulkがname/address/geometry/photo_refを返す'

### スキップ（ネットワーク依存）
- it '外部APIエラー時に例外・ロギングされる'
  - 理由: WebMockで再現可能だが、現状の機能影響は限定的。ネットワーク不安定時の回復戦略を設計後に追加予定。

## Controllers その他
### Api::V1::PlacesController
- it 'indexで例外時に500とエラーメッセージを返す'
- it 'get_details_bulkでplace_ids未指定なら400を返す'

### Api::V1::LikesController
- it 'createで未認証は401を返す'
- it 'destroyで他ユーザーのlikeは404/401を返す'

### スキップ（影響小）
- it 'PhotosController#showが200と画像を返す'
  - 理由: 表示用途で致命度低。E2E側で画像の存在を確認する方針により単体は後回し。

