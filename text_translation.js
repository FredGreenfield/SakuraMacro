var z_srvUrl = "https://script.google.com/macros/s/AKfycbyOVj9Vt8o8O5vPcj71UxFYxYIUEPFV0c91MFoTmJ8iWTua4BOp/exec";

function getRemotTrance(z_orgText, z_fromLanguageType, z_toLanguageType){
    
    var z_xmlhttp = (function(){
        try{ return new ActiveXObject('MSXML2.ServerXMLHTTP'); }
        catch(e){
            return null;
        }
    })();
    if(!z_xmlhttp) {
    	return;
    }
    
    // URL���쐬
    var z_uri = z_srvUrl + "?text=" + z_orgText + "&source=" + z_fromLanguageType + "&target=" + z_toLanguageType;
    
    // Get���\�b�h�œ�����
    z_xmlhttp.open('GET', z_uri, false);
    z_xmlhttp.send(null);
    if(z_xmlhttp.status != 200) {
    	return;
    }
    
    return z_xmlhttp.responseText;
}

// �f�o�b�O�pAlert�t�@���N�V����
function alert(z_msg, z_title, z_type) {
    var z_shell = new ActiveXObject("WScript.Shell");
    return z_shell.Popup(z_msg, 0, z_title, z_type);
};

var z_orgText = Editor.GetSelectedString(0);
var z_tranText = getRemotTrance(encodeURI(z_orgText), "en", "ja");
z_tranText = decodeURI(z_tranText);

Editor.InsText(z_orgText + "\r\n" + z_tranText);
