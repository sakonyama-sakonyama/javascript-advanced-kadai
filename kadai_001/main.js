//変数の初期化
let untyped = '';
let typed ='';
let score = 0;

//必要なHTML要素の取得をし、定数に代入
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typecount = document.getElementById('typecount');

//複数のテキストを格納する配列
const textLists = [
  'Hello World',
  'This is my App',
  'How are you?',
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming',
  'Happy Birthday!',
  'Congratulations!'
];

//ランダムなテキストを表示する機能：関数createTextを定義する
//const createText = () => {};
const createText = () => {
  //正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  //配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random()*textLists.length);
  untyped =textLists[random];
  untypedfield.textContent = untyped;
};


//キー入力の判定ができる機能 : 関数keyPress
//const keyPress = e => {}; 
//※イベントオブジェクトは、通常eやeventという引数で渡される
const keyPress = e => {
  //誤タイプの場合
  if(e.key !== untyped.substring(0,1)){
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    } ,100);
    return;
  }
  //正タイプの場合
  score++;
  //typecountの数を書き換える
  typecount.textContent = score;
  typed += untyped.substring(0,1); //先頭の文字をtypedに移動（追加）　終了インデックスの1つ前までなので0のみ抽出
  untyped = untyped.substring(1);  //インデックス１以降全てを引数とする（終了インデックスがないから）
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  //テキストがなくなったら新しいテキストを表示
  if(untyped === ''){
    createText();
  }
};

//タイピングスキルのランク判定をする機能
//const rankCheck = score => {};
const rankCheck = score => {
  //テキストを格納する変数を作る
  let text = '';
  //スコアに応じて異なるメッセージを変数テキストに格納する
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です`;
    //　\n　・・・JavaScriptにおける文字列の改行を表す！
  } else if(score < 200){
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です`;
  } else if(score < 300){
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です`;
  } else if(score >= 300){
    text = `あなたのランクはSです。\nおめでとうございます!`
  }
  //生成したメッセージといっしょに文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};



//ゲームを終了する機能
//const gameOver = id => {};
const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

  //OKボタンが押されたらリロードする
  if(result == true){
    window.location.reload();
  }
};

//カウントダウンタイマーの機能
//const timer = () => {};
const timer = () => {
  //タイマー部分のp要素を取得する
  let time = count.textContent;
  const id = setInterval(() => {
    //カウントダウンする ※　--　・・・デクリメント演算子「１減らす」
    time--;
    count.textContent = time;
    //カウントが０になったら停止
    if(time <= 0) {
      gameOver(id);
    }
  },1000);
};
/* コード内の const id = setInterval(() =>の idは、
setInterval関数によって生成されたタイマーの識別子（ID）を保存するための変数。
この識別子は、後でそのタイマーを制御（例えば停止）するために使用される。

setInterval関数は指定したコールバック関数を一定間隔で繰り返し実行するためのタイマーを設定する。
このタイマーをクリア（停止）するためには、この識別子が必要です。識別子は、clearInterval関数に渡されます。

コード全体で何が起こっているのか、もう一度詳しく説明します。
let time = count.textContent;
　・・・HTMLのp要素（count）のテキストコンテンツを取得して time変数に保存。
const id = setInterval(() => { ... }, 1000);
　・・・setInterval関数にコールバック関数と間隔を渡す。
　　　　setInterval関数はタイマーの識別子 idを返す。
　　　　タイマーが1秒ごとにコールバック関数を実行。

time--　で、time変数の値を1ずつ減らし、
count.textContent = time;　で、HTMLのp要素のテキストコンテンツを更新。
if(time <= 0) { clearInterval(id); }　で、timeが0以下になった場合にタイマーを停止します。

idという変数は、この特定のタイマーを管理するためのIDを保持しており、
そのIDを使用して clearInterval(id)を呼び出すことにより、タイマーを停止することができます。*/



//ゲームスタート時の処理
start.addEventListener('click',() => {
  timer();
  createText();
  
  //スタートボタンを非表示にする
  start.style.display = 'none';
  //キーボードのイベント処理
  document.addEventListener('keypress',keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';