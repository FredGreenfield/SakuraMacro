/* 
 * 2019.3.16 var 1.4 twitter @fgf_by_T ���K�\���Ή�
 *
 * �s���I�h�A�N�G�X�`�����A�G�N�X�N�����[�V�����܂ł̂P�����P�s�ɐ��`����Sakura�G�f�B�^�p�}�N���ł��B
 * "test text."�̂悤��"�ň͂�ꂽ�ꍇ�͍Ō��"�ŉ��s���s���܂��B
 * �܂��A�y�[�W�w��(p.252)�̂悤�Ɍ�����P��͉��s���܂���B
 * �����ς������ꍇ��text_formatted�֐��̐��K�\����ύX���Ă��������B
 *
 * ���FHe said."test text? yes test text!"�̂悤�ȏꍇ�A�ȉ��̂悤�ɂȂ��Ă��܂��B
 *     He said."
 *     test text?
 *     yes test text!"
 * ��L�̓���͎d�l�Ƃ���̂ŁA��肪����ꍇ�͎�őΉ����鎖�B
 *
 *
 * Sakura�G�f�B�^�ւ̓o�^���@�́A�ȉ��̃t�H���_�ɒu���āA
 * C:\Users\<UserName>\AppData\Roaming\sakura\
 * �ݒ聨���ʐݒ聨�}�N���őI���A�ݒ���������Ă��������B
 * �c�[�����o�^�ς݃}�N������g�p�ł��܂��B
 * �V���[�g�J�b�g�o�^�͓��������ʐݒ肩��L�[���蓖�āA�O���}�N���ŁB
 * �ڂ����́A�l�b�g���������Ă��������B
 *
 * �ǂ����N�ł������ŏ�������x�̃R�[�h�Ȃ̂łǂ������Ă����܂��܂��񂪁A
 * �g�p���ĉ����g���u�����������Ƃ��Ă���҂͐ӔC���܂���̂ł������炸�B
 */

/* ���K�\���ŁB
 * �w�肵���e�L�X�g�̉��s�������A�s���I�h��H�A�I�ŉ��s���Ȃ����B
 *
 * in  z_text �I���e�L�X�g
 * ret ���`���ꂽ�e�L�X�g
 */ 
function text_formatted(z_text) {
	var z_retCode = "\r\n";
	
	// ���K�\���ł��΂��Ɖ���
	return z_text.replace(/(\r?\n)|(.*(?!\(p|\sp)\.\"*\s*|\?\"*\s*|\!\"*\s*)/g, 
			function() {
				if(/^(\r?\n)/.test(arguments[0])){ // ���s���X�y�[�X�ɕϊ�
					return ' ';
				} else 
				if (/.+\r?\n/.test(arguments[0])) { // �}�b�`�������͒��ɉ��s������ꍇ�̓X���[
					return arguments[0];
				} else{
					return arguments[0] + z_retCode; // �}�b�`�������͂ɉ��s�Ȗ����ꍇ�͕t�^
				}
			});
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