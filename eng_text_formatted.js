/* 
 * 2019.3.14 var 1.3 twitter @fgf_by_T ���K�\���Ή�
 *
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
 * 2019.3.14 ���K�\���Ή����܂����B
 */

// �w�肵���e�L�X�g�̉��s�������A�s���I�h��H�A�I�ŉ��s���Ȃ����B
// "test text."�̂悤��"�ň͂�ꂽ�ꍇ�͍Ō��"�ŉ��s�B
// ���ӁFtest text."test text!"�̂悤�ȏꍇ�A�ȉ��̂悤�ɂȂ��Ă��܂��B
// test test."
// test test!"
// in  z_text �I���e�L�X�g
// ret ���`���ꂽ�e�L�X�g
function text_formatted(z_text) {
	
	// ���K�\���ł��΂��Ɖ���
	return z_text.replace(/(\r?\n)|([^\(p|\sp]\.\"*|\?\"*|\!\"*)/g, 
			function() {
				if(/\r?\n/.test(arguments[0])){
					return ' ';
				} else{
					return arguments[0] + "\r\n";
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