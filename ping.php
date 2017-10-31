<?php
$url = $_POST["url"];
$ping = exec("ping6 -c 1 $url");//默认服务器是linux
if (strcasecmp(PHP_OS, 'WINNT') === 0) {  
    $ping = exec("ping -n 1 $url");
}// Windows 服务器下  
if (preg_match('/min/i', $ping)) {
    $match = explode('/',$ping);
    $result = $match[5];
    echo $result;
}//ping有返回值
else {
    echo 0;
}//ping不通或错误用0表示
?>