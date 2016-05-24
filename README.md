# test-web-site


このプロジェクトのgulpで利用できるタスク

- jade/less/coffee のコンパイル
- watch ... ファイル更新を監視してコンパイル
- compress:dist ... gzip圧縮
- clean:dist ... 生成されたファイルを削除
- deploy ... ftpでアップロート


## packages.json について

devDependencies


## FTP について

gulp-ftp は古いようなので、vinyl-ftp を利用します



## 設定ファイルの管理方法


Pit を使って管理します。

利点:
- 多言語へ移植されている為、他の言語で書かれたプログラムからも共通の方法で利用できる
- 開発と本運用でのプロファイルの切り替え等にも対応ができます。


設定ファイルは ~/.pit/default.yaml へ記述

このプロジェクトでは、便宜上プロジェクト内に設定ファイルを置いてますが、
gitで管理する際や、GitHub に公開する際は特に、機密情報の扱いに注意が必要です。
一度公開されてしまった情報をキャンセルする事は、事実上不可能です。

公開レポジトリは、最低限の対策として
rebase で履歴を修正したのち、push --forceで強制上書きと対策出来ますが、
既に、他の場所へ広まってしまった場合は、手の施しようがありません。
サーバを変える、パスワードを変える等といったコストのかかる根本的な対策が必要です。
  

パスワードの暗号化については、別途対策する必要あり。SFTPの利用も検討。


## 設定ファイルの読み込み


```js
    pit.pitDir = '.';
    var config = pit.get('ftp.example.jp', 'config');
```

このサンプルでは、プロジェクト内の config.yaml を読み込むため、


```js
    var config = pit.get('ftp.ninjam.jp', 'ninjam-jp');
```

のように変更。~/.pit/ninjam-jp.yaml が読み込まれるようになります。


サブドメイン名は便宜上のセクション名として使うだけなので、
実際に DNS の設定等は必要ありません。

設定ファイルは YAML 形式で記述します。

```yaml
ftp.ninjam.jp:
    host: 127.0.0.1
    user: guest
    password: guest
    upload_path: public_html
```

