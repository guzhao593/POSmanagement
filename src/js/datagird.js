$.fn.datagrid = function(opts){
    var _defalt = {
        url: '',
        cols:null,
        method:'get',
        edit:false,
        delete:false
    }

    var options = $.extend(_defalt,opts);

    var container = $(this);

    var init = function(){
        var $table = $('<table/>').addClass(options.className)
        var $thead = $('<thead/>');
        var $tbody = $('<tbody/>');

        $.get('../lib/dictionary/commonDic.txt',function(dic){
            var dicObj = JSON.parse(dic);

            $.get(options.url,function(response){
                if(response.status && response.data[0]){
                    var cols = options.cols ? options.cols.split(',') : options.cols;

                    var $tr = $('<tr/>');
                    var $rank = $('<th/>')
                    $tr.append($rank);
                    for(var key in response.data[0]){
                        if(!cols || (cols && cols.indexOf(key) > -1)){
                            $("<th></th>").text(dicObj["cn"][key] || key).appendTo($tr);
                        }
                    }
                    $tr.appendTo($thead);
                    $table.append($thead);

                    for(var i=0; i<response.data.length;i++){
                        $tr = $('<tr/>');
                        $('<td/>').text(i+1).appendTo($tr)
                        for(var key in response.data[i]){
                            if(!cols || (cols && cols.indexOf(key) > -1)){
                                $("<td></td>").text(response.data[i][key]).appendTo($tr);
                            }
                        }
                        $tbody.append($tr)
                    }
                    $table.append($tbody);

                    container.append($table);
                }
            })
        })
    }

    init();
}

