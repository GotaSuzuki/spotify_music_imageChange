# 起動方法
npm run dev

node version
v20.16.0

# サービスの利用イメージ
Spotify APIを利用して、特定の音楽に合わせて、登録した画像が変化するwebアプリケーション  
フロントエンド：React  
バックエンド：Supabase  

Webサービス使用シチュエーション  
高校の文化祭や結婚式の際に、編集スキルのない人が、手軽にWeb上で音楽を用いたムービーを作成したい

サービスのイメージ  
利用者が画像ファイルをアップロードし、その順番を自由に設定できる  
再生ボタンによって、曲が再生し、特定の秒数で画像が変化する  
画像が切り替わる特定に秒数に関しては、開発者が曲に応じて固定させる（よって、上記の画像数や秒数は曲に応じて固定となる）  

# 画面と機能について
ホーム画面(Home.jsx)  
音楽再生画面(MainContainer.jsx)  
　音楽の再生機能  
　画像を全画面にする機能(react-easyfullscreen)  
画像アップロード画面(Images.jsx)  
　画像のアップロード機能  
　画像再生の順番変更機能(dnd-kit)  
画像一覧画面(ImagesList.jsx)  
　ユーザーのIDと一致する画像の一覧表示、削除機能  

# Supabaseの利用について  
　lib/supabase.jsに利用の認証を記載  
　ユーザー情報はsupabaseのAuthenticationを利用  
　画像の保存はStorageを利用  
　　ユーザーID + ユーザーがアップロードするファイル名で登録  
　　ユーザーID：上記のAuthenticationでそれぞれ自動生成されるもの  
　　ファイル名：ユーザーがそれぞれ登録しているもの  
　画像の取得方法  
　　ログインしているユーザーIDとStorageに保存されているファイル名のユーザーID部分が一致しているものを取得  
　　※Images.jsxでは16枚の画像のみを最近保存された順番に取得(音楽に合わせて16枚)  
　　※ImagesList.jsxではユーザーが保存している画像全てを取得  
