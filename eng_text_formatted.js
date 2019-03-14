/* 
 * 2019.3.13 var 1.2 twitter @fgf_by_T
 *
 * �s���I�h�܂ł̂P�����P�s�ɐ��`����Sakura�G�f�B�^�p�}�N���ł��B
 * �y�[�W�w��"(p.252)"�͉��s�����A�_�u���N�H�[�g�ň͂܂ꂽ�s���I�h�͎��̃_�u���N�H�[�g��ɉ��s���܂��B
 *
 * �ȉ��̃t�H���_�ɒu���āA
 * C:\Users\<UserName>\AppData\Roaming\sakura\
 * �ݒ聨���ʐݒ聨�}�N���őI���A�ݒ���������Ă��������B
 * �c�[�����o�^�ς݃}�N������g�p�ł��܂��B
 * �V���[�g�J�b�g�o�^�͓��������ʐݒ肩��L�[���蓖�āA�O���}�N���ŁB
 *
 * �ǂ����N�ł������ŏ�������x�̃R�[�h�Ȃ̂łǂ������Ă����܂��܂��񂪁A
 * �g�p���ĉ����g���u�����������Ƃ��Ă���҂͐ӔC���܂���̂ł������炸�B
 */

// �w��ʒu�̃s���I�h���y�[�W�w�肩�m�F(�O�̕�����"(p"��" p"�̏ꍇ)
// in  z_resText �e�L�X�g�S�� z_pos �s���I�h�̈ʒu
// ret true �y�[�W�w�� false �ʏ�̃s���I�h
function isPageMark(z_resText, z_pos) {
	if (z_pos < 0) {
		return false;
	}

	// �ʂ̃p�^�[�����o�Ă����̂ŉ��}���u
	// TODO �p�^�[����������悤�Ȃ�e�[�u���ɂ���
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

// �w��ʒu�̃s���I�h�̎����_�u���N�H�[�g�̏ꍇ"sample text."
// in  z_resText �e�L�X�g�S�� z_pos �s���I�h�̈ʒu
// ret true ���Ƀ_�u���N�H�[�g���� false �ʏ�̃s���I�h
function isNextIsDoubleQoute(z_resText, z_pos) {
	if (z_pos < 0) {
		return false;
	}
	if (z_resText.length >= z_pos+1 && z_resText.charAt(z_pos+1) == '"') {
		return true;
	}
	return false;
}

// �w�肵���e�L�X�g�̉��s�������A�s���I�h�ŉ��s���Ȃ����B
// "test text."�̂悤��"�ň͂�ꂽ�ꍇ�͍Ō��"�ŉ��s�B
// in  z_text �I���e�L�X�g
// ret ���`���ꂽ�e�L�X�g
function text_formatted(z_text) {
	
	// �܂��͉��s��S�ċ󔒂ɕϊ�����
	var z_resText = z_text.replace(/\r?\n/g, ' ');
	
	// �s���I�h�Ή�
	z_resText = insertReturnCode(z_resText, '.');
	// ?�Ή�
	z_resText = insertReturnCode(z_resText, '?');

	
	return z_resText;
}

// 
function insertReturnCode(z_resText, z_marker) {
	var z_insRetCode = "\r\n";
	var z_pos = -1;
	
	// �Ō�ɓ��B���邩�}�[�J�[�܂ŕ��������J��
	do {
		// �}�[�J�[����
		z_pos = z_resText.indexOf(z_marker, z_pos+1);

		if (z_marker == '.') {
			// �y�[�W�w��̃s���I�h�̏ꍇ�A���s���Ȃ�
			if (isPageMark(z_resText, z_pos)) {
				z_pos = z_pos+1;
				continue;
			}
		}
		// ���̕������_�u���N�H�[�g�̏ꍇ�A�������s�n�_��
		if (isNextIsDoubleQoute(z_resText, z_pos)) {
			z_pos = z_pos + 1;
		}
		
		// ���s���鎖�ɂȂ��Ă���Ȃ�
		if (z_pos > 0) {
			// �I�[�Ȃ炻�̂܂܂ł������ȁc
			if (z_pos+1 >= z_resText.length) {
				break;
			}
			// �s���̋󔒂͔�΂��Ă����܂��傤�B
			var z_nextPos = z_pos+1;
			if (z_resText.charAt(z_nextPos) == " ") {
				z_nextPos = z_pos + 2;
			}
			// ���s�����̈ʒu�ɑ}������
			z_resText = z_resText.slice(0, z_pos+1) + z_insRetCode + z_resText.slice(z_nextPos);
			z_pos = z_pos + z_insRetCode.length;
		}
	} while( z_pos >= 0);
	
	return z_resText;
}

// �f�o�b�O�pAlert�t�@���N�V����
function alert(z_msg, z_title, z_type) {
    var z_shell = new ActiveXObject("WScript.Shell");
    return z_shell.Popup(z_msg, 0, z_title, z_type);
};

//==========
// MAIN
//==========
// �I��͈͂̃e�L�X�g���擾
var z_text = Editor.GetSelectedString(0);
// �ϊ���̃e�L�X�g���o��
if ( z_text !== "" ) {
	Editor.InsText(text_formatted(z_text));
}