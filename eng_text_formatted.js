/* 
 * 2019.3.14 var 1.3 twitter @fgf_by_T 正規表現対応
 *
 *
 * ピリオドまでの１文を１行に整形するSakuraエディタ用マクロです。
 * ページ指定"(p.252)"は改行せず、ダブルクォートで囲まれたピリオドは次のダブルクォート後に改行します。
 *
 * 以下のフォルダに置いて、
 * C:\Users\<UserName>\AppData\Roaming\sakura\
 * 設定→共通設定→マクロで選択、設定を押下してください。
 * ツール→登録済みマクロから使用できます。
 * ショートカット登録は同じく共通設定からキー割り当て、外部マクロで。
 *
 * どうせ誰でも数分で書ける程度のコードなのでどう扱ってもかまいませんが、
 * 使用して何かトラブル等あったとしても作者は責任取りませんのであしからず。
 * 2019.3.14 正規表現対応しました。
 */

// 指定したテキストの改行を消し、ピリオドや？、！で改行しなおす。
// "test text."のように"で囲われた場合は最後の"で改行。
// 注意：test text."test text!"のような場合、以下のようになってしまう。
// test test."
// test test!"
// in  z_text 選択テキスト
// ret 整形されたテキスト
function text_formatted(z_text) {
	
	// 正規表現でずばっと解決
	return z_text.replace(/(\r?\n)|([^\(p|\sp]\.\"*|\?\"*|\!\"*)/g, 
			function() {
				if(/\r?\n/.test(arguments[0])){
					return ' ';
				} else{
					return arguments[0] + "\r\n";
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