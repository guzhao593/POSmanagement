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
                    
                         var $tr = $('<tr/>').html(`<td>${Number(lineNum)+1}</td><td><i class="glyphicon glyphicon-plus addtr"></i><i class="glyphicon glyphicon-remove deltr"></i></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`).addClass(`t${Number(lineNum)+1}`);
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
                            var $currentTr = $('.t'+i);
                            
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
                            console.log($currentTr.children('td:nth-child(1)').text());
                            arr.push(JSON.stringify(obj));
                        }
                        console.log(arr);
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
        },
        merber:function(){
            var $this = this;
            var Merber = {
                init:function(){
                    var self = this;
                    self.show({});
                    $('.add').click(function(){
                        self.add();                    
                    });
                    //选择数据行
                    $('tbody').unbind('click').on('click','tr',function(){
                            $(this).unbind('click').addClass('z-active').siblings().removeClass('z-active');
                    })
                    //修改数据
                    $('.update').click(function(){
                        self.update();
                    });
                    //查找数据
                    $('.select').click(function(){
                        if($('.z-findval').val().trim() == ''){
                            return false;
                        }
                        self.find();
                    });
                    //删除数据
                    $(".remove").unbind('click').click(function(){
                       self.remove();
                    });
                },
                add:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $('.z-addform').show().siblings().hide();
                    $('.z-title-word').text('会员-增加');
                    $('.btn-add').text('增加');
                    //自动编码
                    $.post(`${$this.baseUrl}/merberFind`,{find:'count()'},function(res){
                        var prevCode = res.data[0].code*1;
                        $('#mbcode').val(`00000${prevCode+1}`.substr(-6,6));
                        $('#mcard').val(`888800000${prevCode+1}`.substr(-10,10));
                        $('#mdate').val((new Date()).toLocaleDateString().split('/').join('-'));
                    });
                    //取消增加
                    $('.glyphicon-remove').click(function(){
                        $('.z-cover').hide();
                    });
                    //点击增加按纽
                    $('.btn-add').click(function(){
                        console.log(9999);
                        var js = 0;
                        $('.must').each(function(){
                            if($(this).val() == ''){
                                $(this).css('border','1px solid red');
                                js++;
                            }
                        });
                        
                        if(js>0){
                            return false;
                        }
                        var data = {};
                        console.log(data);
                        $('.z-addform .form-control').each(function(){
                            data[$(this).attr('data-name')] = $(this).val();
                        });
                        $.post(`${$this.baseUrl}/merberAdd`,data,function(res){
                            self.show({});
                        });
                        $('.z-cover').hide();
                    })   
                },
                show:function(data){
                    $.post(`${$this.baseUrl}/merberFind`,data,function(res){
                        if(res.data.length >0){
                            $('.z-table tbody').html('');
                        }
                        res.data.forEach(function(item){
                            var tr = $('<tr/>');
                            for( var key in item){
                                if(key != "_id"){
                                    $('<td/>').text(item[key]).attr('data-name',key).appendTo(tr);
                                }else{
                                    tr.attr('data-id',item[key]);
                                }
                            }
                        tr.appendTo($('.z-table tbody'));
                        });
                    });
                    return this;
                },
                update:function(){
                    var self = this;
                    $.post(`${$this.baseUrl}/merberFind`,{code:$('.z-active').children().eq(0).text()},function(res){
                        $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                        $('.z-updateform').show().siblings().hide();
                        for(var key in res.data[0]){
                            $('.form-control').each(function(){
                                if($(this).attr('data-name') == key){
                                    $(this).val(res.data[0][key])
                                }
                            });
                        }
                        $('.z-title-word').text('会员-修改');
                        $('.glyphicon-remove').click(function(){
                            $('.z-cover').hide();
                        });
                        
                        $('.btn-update').text('修改').off("click").on("click",function(){
                                var data = {};
                                $('.form-control').each(function(){
                                    data[$(this).attr('data-name')] = $(this).val();
                                });
                                var dataObj = {};
                                for(var key in res.data[0]){
                                    if(key != "_id"){
                                        dataObj[key] = res.data[0][key];
                                    }
                                }
                                $.post(`${$this.baseUrl}/merberUpdate`,{update:JSON.stringify({origin:dataObj,update:data})},function(res){
                                    self.show({});
                                    $('.z-cover').hide();
                                    $('.z-updateform').hide();
                                });
                        });
                    })
                },
                remove:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $(".z-remove").show().siblings().hide();
                    $(".z-showcode span").text($(".z-active").children().eq(0).text());
                    
                    $(".affirm").off("click").on('click',function(){
                            $.post(`${$this.baseUrl}/merberRomove`,{code:$(".z-showcode span").text()},function(res){
                                if(res.status){
                                    self.show({});
                                    $('.z-cover').hide();
                                    $(".z-remove").hide();
                                    $(".z-addform").show();
                                }
                            })
                    });
                    $(".cancel").click(function(){
                        $('.z-cover').hide();
                        $(".z-remove").hide();
                        $(".z-addform").show();
                    });
                },
                find:function(){
                    var self = this;
                    var condition = $('#z-condition').val();
                    var findClass = $('#z-findclass').val();
                    var findval = $('.z-findval').val();
                    self.show({condition:condition,findval:findval,class:findClass});
                }
            }
            return Merber.init();
        }
    }
})