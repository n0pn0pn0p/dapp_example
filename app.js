var express = require("express");
var hbs = require('hbs');
var app = express();

app.set('views', './app/views')

// 指定模板文件的后缀名为html
app.set('view engine', 'html');
// 运行hbs模块
app.engine('html', hbs.__express);


app.use(express.static('./public', {
    maxAge: '0', //no cache
    etag: true
}));

app.get('/', function(req,res){
	res.render('index');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Bitcoin-on-nodejs app listening at http://%s:%s', host, port);
});
