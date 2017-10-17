define(['jquery'],function(){
    return {
        baseUrl:"http://localhost:8848",
        addlist:function(){
            var self = this;
            $('.addlist').click(function(){
                // var aim = $(this).attr('data-main')
                $('.content-right').load('../html/addtable.html',function(){
                     $('.tablebox .l-table').on('click','td',function(){

                        if(this == $(this).parent().children()[0] || this == $(this).parent().children()[1]){
                            return false;
                        }

                        if($(this).find('input').length == 0){
                            var $input = $('<input/>').text($(this).text());
                            $(this).text('')
                            $(this).append($input);
                            $input.focus();
                            //失去焦点时删除input 保留数据
                            $input.blur(function(){
                                $(this).parent().text($(this).val())
                                // $(this).remove();
                            })
                        }
                   })
                     //增
                    $('.l-add').click(function(){
                        var lineNum = $('.l-table').children().children('tr:last-child').children('td:first-child').text();
                    
                         var $tr = $('<tr/>').html(`<td>${Number(lineNum)+1}</td><td><i class="glyphicon glyphicon-plus addtr"></i><i class="glyphicon glyphicon-remove deltr"></i></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`).addClass('t1');
                            $('.l-table').append($tr);
                    })

                   
                       //动态生成表格
                    $('.l-table').on('click','.addtr',function(){
                        var lineNum = $(this).parent().parent().parent().children('tr:last-child').children('td:first-child').text();
                        var $tr = $('<tr/>').html(
                            `<td>${Number(lineNum)+1}</td>
                            <td><i class="glyphicon glyphicon-plus addtr"></i><i class="glyphicon glyphicon-remove deltr"></i></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>`
                            ).addClass('t'+ (Number(lineNum)+1));
                                $('.l-table').append($tr);
                    }).on('click','.deltr',function(){
                        $(this).parent().parent().remove();

                        });
                    //生成进货单
                    $('.l-create').click(function(){
                        var listNum = $('.listnum').val() || 'LJ'+Math.ceil(Math.random()*100000);
                        var nowTime = new Date();
                        year =  nowTime.getFullYear();
                        months = nowTime.getMonth();
                        day = nowTime.getDate();
                        time = year + '-' + months + '-' + day;
                        console.log(time);
                        var trs = $('.l-table').find('tbody').children().length-1;
                        
                        var arr = [];
                        for(var i=1;i<=trs;i++){
                            var $currentTr = $('.t'+i)
                            
                            var obj = {
                                rank:$currentTr.children('td:nth-child(1)').text(),
                                prov:$currentTr.children('td:nth-child(3)').text(),
                                code:$currentTr.children('td:nth-child(4)').text(),
                                barc:$currentTr.children('td:nth-child(5)').text(),
                                name:$currentTr.children('td:nth-child(6)').text(),
                                price:$currentTr.children('td:nth-child(7)').text(),
                                num:$currentTr.children('td:nth-child(8)').text(),
                                all:$currentTr.children('td:nth-child(9)').text()
                            }   
                            arr.push(JSON.stringify(obj))
                        }
                        var tab = {listNum:listNum,data:arr.join()};
                        

                        $.post(self.baseUrl+'/addlist',tab,function(response){
                            
                            if(response.status == true){
                                alert('进货单已生成,单号为:'+listNum)
                            }
                        })
                    })
                    
                    //查看进货单
                    $('.l-find').click(function(){
                        $.get(self.baseUrl+'/listOut',function(response){
    
                            var $thead = $('<thead/>').html(`<th>序号</th>
                                                        <th>单据状态</th>
                                                        <th>单据号</th>
                                                        <th>采购员</th>
                                                        <th>采购金额</th>
                                                        <th>单据日期</th>`);
                            var $table = $('<table/>').addClass('list').append($thead)
                            for(var i=1;i<=response.data.length;i++){
    
                                var $tr = $('<tr/>').html(
                                    `<td>${i}</td>
                                    <td><span class="label label-info">进货</span></td>
                                    <td class="click"><a>${response.data[i-1].listNum}</a></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>`
                                    )
                                $table.append($tr)
                            }
                            $('.tablebox').html('').append($table)

                            //点击tr高亮
                            $('.list').on('click','tr',function(){
                                $('.list').children().removeClass('selector')
                                $(this).addClass('selector');
                            })
                            // 删
                            $('.l-del').off('click').on('click',function(){
                                console.log($('.selector .click').text())
                                var listNum = $('.selector .click').text()
                                $.post(self.baseUrl+'/tableDel',{listNum:listNum},function(result){
                                    console.log(result)
                                }) 
                            })

                            
                            //点击单号跳到单据页面
                            $('.click').click(function(){
                                var listNum = $(this).text();
                               
                                 for(var i=0;i<response.data.length;i++){
                                    if(response.data[i].listNum == listNum){
                                     
                                      var str ="["+ response.data[i].data + "]";
                                      var arr = JSON.parse(str)
                                    

                                        var $tab = $('<table/>').html(
                                            `<tr>
                                                <th></th>
                                                <th>供应商</th>
                                                <th>商品编码</th>
                                                <th>商品条码</th>
                                                <th>商品名称</th>
                                                <th>批发价</th>
                                                <th>数量</th>
                                                <th>总计</th>
                                            </tr>`
                                            ).addClass('l-tab')
                                        for(var j=0;j<arr.length;j++){
                                            
                                            $tr = $('<tr/>');
                                            $rank = $('<td/>').html(arr[j].rank)
                                            $prov = $('<td>').html(arr[j].prov)
                                            $code = $('<td>').html(arr[j].code)
                                            $barc = $('<td>').html(arr[j].barc)
                                            $name = $('<td/>').html(arr[j].name)
                                            $price = $('<td>').html(arr[j].price)
                                            $num = $('<td>').html(arr[j].num)
                                            $all = $('<td>').html(arr[j].all)
                                            $tr.append($rank,$prov,$code,$barc,$name,$price,$num,$all)
                                            $tab.append($tr)
                                        }
                                        $('.tablebox').html('');
                                        $('.tablebox').append($tab)
                                    }
                                 }
                            })
                        })
                    })
                })

            })
        }
    }
})