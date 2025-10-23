## 📚 書店 × カフェ 検索アプリ

本サービスは、本屋とその周辺のカフェを一度に検索できるWebアプリです。

「読書のあとにくつろげるカフェを探したい」「立ち寄る書店の近くで作業したい」というニーズに応えます。

## アプリURL

[~~https://bookstore-cafe-search.pages.dev~~](https://bookstore-cafe-search.pages.dev/)

※会員登録なしでご利用いただけます。

※会員限定の画面や機能は以下のテストユーザーをご利用ください。

テストユーザー：

`ID: testuser1`

`PW: Test123456789`

## 機能一覧

- **ユーザー機能**
    - サインアップ・ログイン・ログアウト
    - マイページ（プロフィール確認）
    - パスワードリセット
- **検索機能**
    - 単体検索：本屋のみ、またはカフェのみを検索
    - ペア検索：検索した本屋を起点に徒歩圏内のカフェを検索
    - 現在地・キーワードからの検索
    - 検索結果を地図のピンとカード一覧で表示
    - カードから詳細情報ページへアクセス
- **ペア機能**
    - 本屋とカフェのペア作成
    - ペアごとの詳細情報表示
- **いいね機能**
    - 本屋・カフェ単体へのいいね
    - 本屋とカフェペアへのいいね
    - マイリストでカテゴリ別にいいねを確認
- **ルート表示機能**
    - 各スポット詳細からワンタップで Google マップに遷移

## UIイメージ

順次追加予定

## 使用技術

| カテゴリー | 技術名 |
| --- | --- |
| **Frontend** | React(19.0), Vite(6.3.1), React Router DOM(7.5.2), Tailwind CSS(4.1.5), Heroicons, Axios |
| **Backend** | Ruby(3.1.6), Ruby on Rails(7.2.2), HTTParty |
| **Infrastructure** | Render（APIデプロイ）, Cloudflare Pages（フロントエンド）, Neon(DBaaS) |
| **Database** | PostgreSQL |
| **Environment** | Docker(★★), Docker Compose, Node.js(★★), npm |
| **Testing** | Vitest, React Testing Library, RSpec |
| **Lint / Format** | ESLint, Prettier, RuboCop |
| **Version Control** | Git, GitHub |
| **External API** | Google Places API, Google Maps JavaScript API |

## ER図

[![image.png](attachment:77c8076f-f305-457e-bc42-a4207921fe1d:image.png)](https://github.com/mamimumemo1202/bookstore_cafe_search/issues/9#issue-3544105993)

Likeテーブルにはポリモーフィックを採用しており、いいねの対象であるbookstore, cafe, pairはlikeable_typeとlikeable_idで管理しております。

## インフラ構成図

https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB.drawio&dark=auto#R%3Cmxfile%3E%3Cdiagram%20name%3D%22%E3%83%9A%E3%83%BC%E3%82%B81%22%20id%3D%22KnWM5tLUaVSK3Mwh8btM%22%3E3VjbcpswEP0azbQPyXALhkewSZOZtOPW08urYmRQLRAVwpd8fVcgjDF2ms7kPn6wdLSSds%2Be3ZGN7HG2%2BSRwkX7mMWHIMuINsifIskzT8%2BBLIdsGcU2%2FARJBY23UATN6RzRoaLSiMSl7hpJzJmnRB%2Bc8z8lc9jAsBF%2F3zRac9W8tcEIGwGyO2RD9SWOZNqhnjTr8itAkbW82XR1fhltjHUmZ4piv9yA7QvZYcC6bUbYZE6bIa3lp9l2eWN05JkguH7IhvSq%2B82l6%2FSv3Ai9Nlz%2FurpdnLc0rzCodsfZWblsKSAyM6CkXMuUJzzGLOjQUvMpjou4xYNbZ3HBeAGgC%2BJtIudXpxZXkAKUyY3q1uVNddDI4DZW8EnNyX0RaJFgkRN5jN9qlALRLeEak2MI%2BQRiWdNX3A2sRJTu7jmcYaKr%2Fh%2FYB62PGq3jBIGDAp6CqElkugwDCmK5gmKjhh28Eg8YtYzYNPrbr4MCeySB7XW4U0euUSjIrcE3hGkr2WB5WREiyuT8TQ%2BbaDSNdALrgLUdLbN2Vj9nWRLpXOq7xVGQP2X7jGh89UOPeS2p8NGD9GwEGxVFdY8pA8EYwvX6tunYM45Xp2hsQ%2FIXw%2FBi9MyIgdkZKxXHBS5kIMvt681ao3s1froVY762F%2BA9sIScy9TwtxP836%2BWSyHnaUlpJRnMy3r0FFbjguRxzxkW9wYbPpXIhTASOKenWcp6rJC0oY4fmE8BLKfiSHBjHuEx3CVWap%2FByvMG3hE15SSWFcrQnt1xKnu0ZBIwmakGqtIdYz%2BbgC3THXsKV71oNIEE918GrK3FZNIEu6Eb5ERacqlOiFRxW6kPg4VmoDdkmUW%2F0c7wunfOqJKJ8nHK1DsrVG1bryBsWa4s9frHaR2TTNLrU7KnH%2FVOp13eYQRXQ%2FKzORwAWRrGpqWnXu87YHKPScPQgtXBW1glT55jOqYMiG3k28l09CPx6YKHA1YMQBi7yYTxBkYPCCfLHe%2B268aDvFcAqvhNNHPIr%2B%2BI61sg5KGHB6p8pKY1jkg%2Fa1mM8EZ2%2BYEz3SH83jvR358n6u%2FPqJQNPIxT5CIrLD2pFXKLAfC%2BKsK2Dx9VoqAj3WQVx8eoFMQlVh%2FAiFFygaKQaBgjjnejB8fp6sO0n0wNMu%2F9g6rW9f7Ls6C8%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E

## 開発の背景

外出先で時間が空いたときに、本屋に立ち寄ることがよくあります。

「気に入った本があれば、このまま近くのカフェで読みたい」と思っても、通常のマップアプリでは本屋とカフェを別々に検索する必要があり、ルートが定まらず結局行かないことがありました。

このように、“本屋 → カフェ” の流れが自然につながる導線がないことに不便さを感じ、本屋とカフェをペアで探せるアプリを作ろうと考えました。

また、技術的な面として外部APIを活用したアプリケーションを開発したいと考え、Google Places API を採用しました。
実際の店舗情報を取得し、地図上で表示・連携する構成を通して、外部データを扱う実践的な経験を積むことを目的としました。

本ポートフォリオ作成以前に MVC モデルで簡単な Web アプリケーションを開発しており、
当初は Rails でフロントエンドまで完結させる構成も検討しましたが、
近年主流となっている SPA 構成を意識し、モダンな開発スタイルを経験するために React を採用しました。

