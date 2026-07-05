// Viteの設定。devサーバ(npm run dev)・本番ビルド(npm run build)・
// テストランナー(vitest。下のtestブロックを読む)の3つがこの1ファイルを共有する。
/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // 相対パスにすることで、GitHub Pagesのプロジェクトページ
  // (https://<user>.github.io/<repo>/)でもローカルでもビルド設定を変えずに動く
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    // 0.0.0.0にバインドする。devサーバはDockerコンテナ内で動くため、
    // localhostのみだとホストのブラウザから届かない
    host: true,
  },
  test: {
    // テスト対象はUI非依存の純TS(src/domain, src/state)のみなのでDOM環境は不要。
    // jsdom等を入れずnode環境で高速に回す
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
