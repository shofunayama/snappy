# snappy

## 📖 概要
Snappyは、Next.jsで構築された最新のWebアプリケーションです。
shadcn/uiコンポーネントとTailwind CSSを使用して、美しく使いやすいユーザーインターフェースを提供しています。

## 🛠️ 使用技術

### コアテクノロジー
- **Next.js 16.0.3** - Reactベースのフルスタックフレームワーク
- **React 19.2.0** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS 4.1.9** - ユーティリティファーストのCSSフレームワーク

### UIコンポーネント
- **Radix UI** - アクセシブルなUIコンポーネント群
- **shadcn/ui** - カスタマイズ可能なコンポーネントライブラリ
- **Lucide React** - アイコンライブラリ

### その他のライブラリ
- **React Hook Form** - フォーム管理
- **Zod** - スキーマバリデーション
- **next-themes** - ダークモード対応
- **Recharts** - チャート描画
- **Sonner** - トースト通知

## 📁 プロジェクト構成

```
snappy/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ
│   └── register/          # 登録ページ
│       └── page.tsx
├── components/            # Reactコンポーネント
│   ├── header.tsx         # ヘッダーコンポーネント
│   ├── hero-section.tsx   # ヒーローセクション
│   ├── search-panel.tsx   # 検索パネル
│   ├── top-models.tsx     # トップモデル表示
│   ├── featured-shops.tsx # 注目ショップ表示
│   ├── registration-cta.tsx # 登録CTA
│   └── ui/                # shadcn/ui コンポーネント
│       ├── button.tsx     # ボタン
│       ├── card.tsx       # カード
│       ├── input.tsx      # 入力フィールド
│       └── ...            # その他のUIコンポーネント
├── hooks/                 # カスタムReactフック
│   ├── use-mobile.ts      # モバイル判定フック
│   └── use-toast.ts       # トースト通知フック
├── lib/                   # ユーティリティ
│   └── utils.ts           # 共通ユーティリティ関数
├── public/                # 静的ファイル
├── styles/                # スタイルファイル
├── components.json        # shadcn/ui 設定
├── next.config.mjs        # Next.js 設定
├── package.json           # 依存関係定義
├── tsconfig.json          # TypeScript 設定
└── tailwind.config.js     # Tailwind CSS 設定
```

## 🚀 セットアップ方法

### 前提条件
以下のソフトウェアがインストールされている必要があります：
- **Node.js** 18.0以上
- **pnpm** (推奨) または npm/yarn

### インストール手順

1. **リポジトリのクローン**
```bash
git clone https://github.com/snappy-dev-team/snappy.git
cd snappy
```

2. **依存関係のインストール**
```bash
pnpm install
```

1. **開発サーバーの起動**
```bash
pnpm dev
```

1. **ブラウザでアクセス**
```
http://localhost:3000
```

開発サーバーが起動し、ブラウザで確認できます。

## 📝 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | 開発サーバーを起動します（ホットリロード有効） |
| `pnpm build` | 本番用にアプリケーションをビルドします |
| `pnpm start` | ビルドされたアプリケーションを起動します |
| `pnpm lint` | コードの品質チェックを実行します |

## 🎨 主な機能

### トップページ (`app/page.tsx`)
- **ヘッダー** - ナビゲーションとブランディング
- **ヒーローセクション** - メインビジュアルとキャッチコピー
- **検索パネル** - 商品・サービス検索機能
- **トップモデル** - 人気モデルの表示
- **注目ショップ** - おすすめショップの紹介
- **登録CTA** - ユーザー登録への誘導

### コンポーネント
`components/ui/` ディレクトリには、再利用可能なUIコンポーネントが50個以上含まれています：
- ボタン、カード、フォーム要素
- モーダル、ドロップダウン、ツールチップ
- テーブル、タブ、アコーディオン
- チャート、カレンダー、カルーセル
など

## 🎯 開発のヒント

### 新しいページの追加
`app/` ディレクトリに新しいフォルダを作成し、`page.tsx` を追加します：
```
app/
└── your-page/
    └── page.tsx
```

### 新しいコンポーネントの作成
`components/` ディレクトリに新しいファイルを作成します：
```tsx
// components/your-component.tsx
export default function YourComponent() {
  return <div>Hello!</div>
}
```

### UIコンポーネントの使用
既存のshadcn/uiコンポーネントをインポートして使用します：
```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Example() {
  return (
    <Card>
      <Button>クリック</Button>
    </Card>
  )
}
```

### スタイリング
Tailwind CSSのユーティリティクラスを使用します：
```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold">タイトル</h1>
</div>
```

## 🔧 設定ファイル

- **`next.config.mjs`** - Next.jsの動作設定
- **`tsconfig.json`** - TypeScriptのコンパイル設定
- **`components.json`** - shadcn/uiの設定
- **`tailwind.config.js`** - Tailwind CSSのカスタマイズ

## 📦 パッケージマネージャー

このプロジェクトは **pnpm** を使用していますが、npm や yarn でも動作します。
pnpmをインストールするには：
```bash
npm install -g pnpm
```
