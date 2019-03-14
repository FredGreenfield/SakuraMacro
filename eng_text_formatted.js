/* 
 * 2019.3.13 var 1.2 twitter @fgf_by_T
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
 */

// 指定位置のピリオドがページ指定か確認(前の文字が"(p"か" p"の場合)
// in  z_resText テキスト全体 z_pos ピリオドの位置
// ret true ページ指定 false 通常のピリオド
function isPageMark(z_resText, z_pos) {
	if (z_pos < 0) {
		return false;
	}

	// 別のパターンが出てきたので応急処置
	// TODO パターンが増えるようならテーブルにする
	var z_pageMark1 = "(p";
	var z_pageMark2 = " p";
	var z_len1 = z_pageMark1.length;
	var z_len2 = z_pageMark2.length;
	
	if (0 < z_pos-z_len1 && 
		(z_resText.substr(z_pos-z_len1, z_len1) == z_pageMark1 ||
		 z_resText.substr(z_pos-z_len2, z_len2) == z_pageMark2) ) {
		return true;
	}
	return false;
}

// 指定位置のピリオドの次がダブルクォートの場合"sample text."
// in  z_resText テキスト全体 z_pos ピリオドの位置
// ret true 次にダブルクォートあり false 通常のピリオド
function isNextIsDoubleQoute(z_resText, z_pos) {
	if (z_pos < 0) {
		return false;
	}
	if (z_resText.length >= z_pos+1 && z_resText.charAt(z_pos+1) == '"') {
		return true;
	}
	return false;
}

// 指定したテキストの改行を消し、ピリオドで改行しなおす。
// "test text."のように"で囲われた場合は最後の"で改行。
// in  z_text 選択テキスト
// ret 整形されたテキスト
function text_formatted(z_text) {
	
	// まずは改行を全て空白に変換する
	var z_resText = z_text.replace(/\r?\n/g, ' ');
	
	// ピリオド対応
	z_resText = insertReturnCode(z_resText, '.');
	// ?対応
	z_resText = insertReturnCode(z_resText, '?');

	
	return z_resText;
}

// 
function insertReturnCode(z_resText, z_marker) {
	var z_insRetCode = "\r\n";
	var z_pos = -1;
	
	// 最後に到達するかマーカーまで文字列を手繰る
	do {
		// マーカー検索
		z_pos = z_resText.indexOf(z_marker, z_pos+1);

		if (z_marker == '.') {
			// ページ指定のピリオドの場合、改行しない
			if (isPageMark(z_resText, z_pos)) {
				z_pos = z_pos+1;
				continue;
			}
		}
		// 次の文字がダブルクォートの場合、次を改行地点に
		if (isNextIsDoubleQoute(z_resText, z_pos)) {
			z_pos = z_pos + 1;
		}
		
		// 改行する事になっているなら
		if (z_pos > 0) {
			// 終端ならそのままでいいかな…
			if (z_pos+1 >= z_resText.length) {
				break;
			}
			// 行頭の空白は飛ばしておきましょう。
			var z_nextPos = z_pos+1;
			if (z_resText.charAt(z_nextPos) == " ") {
				z_nextPos = z_pos + 2;
			}
			// 改行をその位置に挿入する
			z_resText = z_resText.slice(0, z_pos+1) + z_insRetCode + z_resText.slice(z_nextPos);
			z_pos = z_pos + z_insRetCode.length;
		}
	} while( z_pos >= 0);
	
	return z_resText;
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