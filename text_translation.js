
function getUri(z_fname) {
	var z_fso = new ActiveXObject("Scripting.FileSystemObject");
	var z_f = z_fso.OpenTextFile(z_fname, 1, false);
	if (!z_f) {
		return "";
	}
	var z_uri = z_f.ReadLine();
	z_f.close();
	
	return  z_uri;
}

function getXmlHttp() {
	return (function(){
		        try{ 
		   	    	return new ActiveXObject('MSXML2.ServerXMLHTTP'); 
		   	    } catch(e) {
		   	    	try {
			   	    	return new ActiveXObject('Microsoft.ServerXMLHTTP'); 
		   	    	} catch(E) {
		   	    		return null;
		   	    	}
		       	}
			})();
}

function getRemotTrance(z_orgText, z_fromLanguageType, z_toLanguageType)
{
    var HTTP_STATUS_OK = 200;
    var URI_FILE_NAME = "uri.txt";
        
    var z_xmlhttp = getXmlHttp();
    if(!z_xmlhttp) {
       	alert("XML HTTPが取得できませんでした。");    
    	return "";
    }
    
    // URLを作成
	var z_iniPath = Editor.ExpandParameter('$I');
	var z_dir = z_iniPath.split('\\').reverse().slice(1).reverse().join('\\');
	var z_uriPath = z_dir + "\\" + URI_FILE_NAME;
	alert(z_uriPath);
    var z_uri = getUri(z_uriPath);
    if (z_uri =="") {
       	alert("サーバへのURLが取得できませんでした。");    
    	return "";
    }
    z_uri = z_uri + "?text=" + z_orgText + "&source=" + z_fromLanguageType + "&target=" + z_toLanguageType;
    
    // Getメソッドで投げる
    z_xmlhttp.open('GET', z_uri, false);
    z_xmlhttp.send(null);
    if(z_xmlhttp.status != HTTP_STATUS_OK) {
       	alert("HTTP ERROR[" + z_xmlhttp.status + "]");
    	return "";
    }
    
    return z_xmlhttp.responseText;
}

// デバッグ用Alertファンクション
function alert(z_msg, z_title, z_type) {
	var z_shell = new ActiveXObject("WScript.Shell");
    return z_shell.Popup(z_msg, 0, z_title, z_type);
};

var z_orgText = Editor.GetSelectedString(0);
var z_tranText = getRemotTrance(encodeURI(z_orgText), "en", "ja");
z_tranText = decodeURI(z_tranText);

if (z_tranText !== "") {
	Editor.InsText(z_orgText + "\r\n" + z_tranText);
}
