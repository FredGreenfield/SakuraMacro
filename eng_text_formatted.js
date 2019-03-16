/* 
 * 2019.3.16 var 1.4 twitter @fgf_by_T 正規表現対応
 *
 * ピリオド、クエスチョン、エクスクラメーションまでの１文を１行に整形するSakuraエディタ用マクロです。
 * "test text."のように"で囲われた場合は最後の"で改行を行います。
 * また、ページ指定(p.252)のように見える単語は改行しません。
 * 動作を変えたい場合はtext_formatted関数の正規表現を変更してください。
 *
 * 注：He said."test text? yes test text!"のような場合、以下のようになってしまう。
 *     He said."
 *     test text?
 *     yes test text!"
 * 上記の動作は仕様とするので、問題がある場合は手で対応する事。
 *
 *
 * Sakuraエディタへの登録方法は、以下のフォルダに置いて、
 * C:\Users\<UserName>\AppData\Roaming\sakura\
 * 設定→共通設定→マクロで選択、設定を押下してください。
 * ツール→登録済みマクロから使用できます。
 * ショートカット登録は同じく共通設定からキー割り当て、外部マクロで。
 * 詳しくは、ネットを検索してください。
 *
 * どうせ誰でも数分で書ける程度のコードなのでどう扱ってもかまいませんが、
 * 使用して何かトラブル等あったとしても作者は責任取りませんのであしからず。
 */

/* 正規表現版。
 * 指定したテキストの改行を消し、ピリオドや？、！で改行しなおす。
 *
 * in  z_text 選択テキスト
 * ret 整形されたテキスト
 */ 
function text_formatted(z_text) {
	var z_retCode = "\r\n";
	
	// 正規表現でずばっと解決
	return z_text.replace(/(\r?\n)|(.*(?!\(p|\sp)\.\"*\s*|\?\"*\s*|\!\"*\s*)/g, 
			function() {
				if(/^(\r?\n)/.test(arguments[0])){ // 改行をスペースに変換
					return ' ';
				} else 
				if (/.+\r?\n/.test(arguments[0])) { // マッチした文章中に改行がある場合はスルー
					return arguments[0];
				} else{
					return arguments[0] + z_retCode; // マッチした文章に改行な無い場合は付与
				}
			});
}

// デバッグ用Alertファンクション
function alert(z_msg, z_title, z_type) {
    var z_shell = new ActiveXObject("WScript.Shell");
    return z_shell.Popup(z_msg, 0, z_title, z_type);
};

//==========
// MAIN
//==========
// 選択範囲のテキストを取得
var z_text = Editor.GetSelectedString(0);
// 変換後のテキストを出力
if ( z_text !== "" ) {
	Editor.InsText(text_formatted(z_text));
}