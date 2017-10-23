define(['jquery'],function(){
    return {
        baseUrl:"http://localhost:8848",  //10.3.131.27
        //产品管理
        Product:function(){
            var base = this.baseUrl;
            $('.probtn').click(function(){
             $('.content-right').load('html/productManagement.html #t-product',function(){
                    $('.change button').click(function(){
                    });
                    //增加行
                    $('.t-table .add').click(function(){
                        var add = $('.t-table tfoot');
                        $(this).parent().parent().clone(true,true).appendTo(add);
                        var num = $('.t-table tfoot tr').children('th').eq(0).text();
                        $('.t-table tfoot tr').each(function(idx,item){
                                var td = $(item).children().first();
                                td.text(idx+1);
                        });
                    });
                    //删除行
                    $('.t-table .remove').click(function(){

                        var add = $('.t-table tfoot');
                        $(this).parent().parent().remove();
                        $('.t-table tfoot tr').each(function(idx,item){
                                var td = $(item).children().first();
                                td.text(idx+1);
                        });
                    });

                    // 查询表
                    select();
                    function remove(){
                            $('.t-table tbody tr').click(function(){
                                var tr = $('.t-table tbody tr');
                                tr.each(function(idx,item){
                                    $(item).css({backgroundColor:''});
                                })
                                $(this).css({backgroundColor:'#FF6600'})
                                if($(this).css({backgroundColor:'#FF6600'})){
                                    var $this = this;

                                    $('.change .btn').eq(3).click(function(){
                                         
                                        $('.t-cover').show();
                                        $('.z-updateform').hide();
                                        $('.z-remove').show();
                                        $('.z-addform').hide();
                                        $('.glyphicon-remove').click(function(){
                                            $('.t-cover').hide();
                                        })
                                        $('.z-showbtn .cancel').click(function(){
                                            $('.t-cover').hide();
                                        })

                                        $('.z-showbtn .affirm').off('click').on('click',function(){
                                            var valCode = $($this).children('td').eq(1).text();
                                            var obj = {code:valCode}
                                            $.post(base + '/productRemove',obj,function(result){
                                                $('.t-table tbody').text('');
                                                $('.page').text('');
                                                select();
                                                });
                                                $('.t-cover').hide();
                                        
                                        });
                                    });
                                }    
                            }); 
                        }
                    function updata(){
                            $('.t-table tbody tr').click(function(){
                                var tr = $('.t-table tbody tr');
                                tr.each(function(idx,item){
                                    $(item).css({backgroundColor:''});
                                })
                                $(this).css({backgroundColor:'#FF6600'})
                                if($(this).css({backgroundColor:'#FF6600'})){
                                    var $this = this;
                                    $('.change .btn').eq(1).click(function(){
                                        $('.t-cover').show();
                                        $('.z-updateform').show();
                                        $('.z-addform').hide();
                                        $('.z-remove').hide();
                                        var td = $($this).children('td');
                                        $('.t-cover .z-updateform .form-control').each(function(idx){
                                                $(this).val(td.eq(idx).text());
                                        });

                                        
                                        $('.glyphicon-remove').click(function(){
                                            $('.t-cover').hide();
                                        })

                                        $('.t-cover .z-updateform .btn-add').off('click').on('click',function(){
                                            var input = $('.t-cover .z-updateform .form-control');
                                            var obj = {
                                                    classify:input.eq(0).val(),
                                                    code:input.eq(1).val(),
                                                    barc:input.eq(2).val(),
                                                    name:input.eq(3).val(),
                                                    typeMode:input.eq(4).val(),
                                                    prov:input.eq(5).val(),
                                                    price:input.eq(6).val(),
                                                    vipPrice:input.eq(7).val(),
                                                    num:input.eq(8).val(),
                                                    addDate:input.eq(9).val()
                                                }
                                            if(obj.provider != '' && obj.barCode != ''&& obj.productName != ''){
                                                $.post(base + '/productOut',{code:td.eq(1).text()},function(response,data){
                                                        var dataObj = {};
                                                            for(var key in response.data[0]){
                                                                if(key != "_id"){
                                                                    dataObj[key] = response.data[0][key];
                                                                }
                                                        }
                                                        $.post(base + '/productUpdate',{update:JSON.stringify({origin:dataObj,update:obj})},function(response,data){
                                                            $('.t-table tbody').text('');
                                                            $('.page').text('');
                                                            select();
                                                            if(response.ok){
                                                                $('.t-cover').hide();
                                                                $('.z-addform').hide();
                                                            }
                                                    });
                                                });
                                                
                                            }  
                                        })
                                    });    
                                }
                            });
                        }
                    function select(){
                        $.post(base + '/productOut',{},function(response,data){
                        var tbody = $('.t-table tbody');
                        var tfoot = $('.t-table tfoot');
                        var leng = response.data.length;
                        var page = Math.ceil(leng/10);
                        var pagul = $('<ul/>')
                        for(var j=0;j<page;j++){
                            $(`<li>${j+1}</li>`).appendTo(pagul);
                        }
                        // $('.t-table tbody').text('');
                        pagul.appendTo($('.page'));
                        pagul.children().eq(0).css({backgroundColor:'#5cb85c'});
                        function insert(){
                            var tr = $(`
                                    <tr>
                                        <th>${i+1}</th>
                                        <td>${response.data[i].classify}</td>
                                        <td>${response.data[i].code}</td>
                                        <td>${response.data[i].barc}</td>
                                        <td>${response.data[i].name}</td>
                                        <td>${response.data[i].typeMode}</td>
                                        <td>${response.data[i].prov}</td>
                                        <td>${response.data[i].price}</td>
                                        <td>${response.data[i].vipPrice}</td>
                                        <td>${response.data[i].num}</td>
                                    </tr>
                                    `).appendTo(tbody);
                        }
                        pagul.children().off('click').on('click',function(){
                            // pagul.children().each(function(){
                            //     $(this).css({backgroundColor:'#31B0D5'});
                            // })
                            $(this).css({backgroundColor:'#5cb85c'}).siblings().css({backgroundColor:'#ccc'});
                            tbody.text('');
                            var num = $(this).index();
                               
                            for(var i=10*num;i<10*(num+1);i++){
                                var tr = $(`
                                    <tr>
                                        <th>${i+1}</th>
                                        <td>${response.data[i].classify}</td>
                                        <td>${response.data[i].code}</td>
                                        <td>${response.data[i].barc}</td>
                                        <td>${response.data[i].name}</td>
                                        <td>${response.data[i].typeMode}</td>
                                        <td>${response.data[i].prov}</td>
                                        <td>${response.data[i].price}</td>
                                        <td>${response.data[i].vipPrice}</td>
                                        <td>${response.data[i].num}</td>
                                    </tr>
                                    `).appendTo(tbody);
                            }
                            remove(); 
                        })
                        if(response.data.length <= 10){
                            for(var i=0;i<response.data.length;i++){
                                insert();
                            }
                        }else{
                            for(var i=0;i<10;i++){
                                insert();
                            }
                        } 
                        $('.change .btn').eq(0).click(function(){
                            $('.t-cover').show();
                            $('.z-addform').show();
                            $('.z-remove').hide();
                            $('.z-updateform').hide();
                            $('.glyphicon-remove').click(function(){
                                $('.t-cover').hide();
                            })
                            $('.z-addform .btn-add').off('click').on('click',function(){
                                console.log(9999);
                                var obj = {
                                    classify:$('.z-addform .must').eq(0).val(),
                                    code:$('.z-addform .must').eq(1).val(),
                                    barc:$('.z-addform .must').eq(2).val(),
                                    name:$('.z-addform .must').eq(3).val(),
                                    typeMode:$('.z-addform .must').eq(4).val(),
                                    prov:$('.z-addform .must').eq(5).val(),
                                    price:$('.z-addform .must').eq(6).val(),
                                    vipPrice:$('.z-addform .must').eq(7).val(),
                                    num:$('.z-addform .must').eq(8).val(),
                                    addDate:$('.z-addform .must').eq(9).val()
                                }
                                if(obj.classify != '' && obj.barc != '' && obj.name != ''){
                                    $.post(base + '/productIn',obj,function(response,data,da){
                                            if(response.status){
                                                $('.t-table tbody').text('');
                                                $('.page').text('');
                                                $('.t-cover').hide();
                                                $('.z-addform').hide();
                                                select();
                                            }
                                    });
                                }  
                            })
                        });
                        $('.change .btn').eq(2).click(function(){
                            $('.t-cover').show();
                            $('.t-find').show();
                            $('.z-addform').hide();
                            $('.z-remove').hide();
                            $('.z-updateform').hide();
                        });
                        updata();                        
                        remove();  
                    });
                    }
                                  
                });
                
            });
        },
        //收银管理
        Money:function(){
            var base = this.baseUrl;
            $('.moneyBtn').click(function(){
                $('.content-right').load('html/productManagement.html #t-money',function(){
                        var num = 0;
                        $('.bar #barCode').blur(function(event) {
                            var nbarc = $(this).val();
                                if($(this).val()){
                                    $.post(base + '/productOut',{barc:$(this).val()},function(response,data){
                                        if(response.data.length>0){
                                            num++;
                                        }
                                        var js = 0;
                                        $(".m-barc").each(function(){
                                            if( nbarc == $(this).text()){
                                                js++;
                                                $(this).closest('tr').find(".m-num").text($(this).closest('tr').find(".m-num").text()*1 +1);
                                            }
                                        });
                                        if(js==0){
                                            insert();
                                        }
                                        function insert(){
                                            var tr = $(`
                                                        <tr>
                                                            <th>${num}</th>
                                                            <td>${response.data[0].classify}</td>
                                                            <td>${response.data[0].code}</td>
                                                            <td class="m-barc">${response.data[0].barc}</td>
                                                            <td>${response.data[0].name}</td>
                                                            <td>${response.data[0].typeMode}</td>
                                                            <td>${response.data[0].prov}</td>
                                                            <td>${response.data[0].price}</td>
                                                            <td>${response.data[0].vipPrice}</td>
                                                            <td class="m-num">1</td>
                                                        </tr>
                                                        `).appendTo($('.tbody'));
                                        }
                                        var total = 0;
                                        $('.tbody tr').each(function(idx){

                                            total += $(this).children('td').eq(6).text()*$(this).children('td').eq(8).text();
                                            $('#total').val(total);
                                         })
                                    });
                                }
                        });
                        $('.bar #barCode').focus(function(){
                            $(this).val('');
                        });
                        var socket = io("ws://http://10.3.131.37:8818");
                        //生成售货单
                        $('.t-create').click(function(){
                            var arry = [];
                            $('.tbody tr').each(function(idx){
                                var obj = {
                                    classify:$(this).children('td').eq(0).text(),
                                    code:$(this).children('td').eq(1).text(),
                                    barc:$(this).children('td').eq(2).text(),
                                    name:$(this).children('td').eq(3).text(),
                                    typeMode:$(this).children('td').eq(4).text(),
                                    prov:$(this).children('td').eq(5).text(),
                                    price:$(this).children('td').eq(6).text(),
                                    vipPrice:$(this).children('td').eq(7).text(),
                                    num:$(this).children('td').eq(8).text(),
                                    addDate:$(this).children('td').eq(9).text()
                                }
                                arry.push(JSON.stringify(obj));
                            });

                            var listNum = $('.listnum').val() || 'LJ'+Math.ceil(Math.random()*100000);
                            var time = (new Date()).toLocaleDateString().split('/').join('-');
                            var list = $('.tablebox .listt')
                            var tobj = {
                                data:arry.join(),
                                listNum:listNum,
                                date:time,
                                merber:list.eq(2).val(),
                                salesMan:list.eq(3).val(),
                                allPrice:$('.bar .tot').val(),
                            } 
                            
                            $.post(base + '/billIn',tobj,function(response,data){
                                    
                            });

                            //生成二维码
                                $('#qrcode').html('');
                                $('#qrcode').qrcode("http://10.3.131.27:666/html/prcode.html?data="+arry);
                                $('.bar-cover').show();
                        })
                        
                        socket.on('ok', function(data){
                            if(data == "true"){
                                $('#qrcode').text('支付已完成').css({
                                    color:'#fff',
                                    fontSize:'30px',
                                    textAlign:'center',
                                    lineHeight:'256px'
                                });
                                $('.bar-cover').hide(1000);
                            }
                        })

                });
            });
        },
        //采购管理
        addlist:function(){
            var self = this;
            $('.addlist').click(function(){



                $('.content-right').load('../html/addtable.html',function(){
                    showtab();
                    
                     //增
                    $('.l-add').click(function(){
                        $('.tablebox').load('../html/tablebox.html',function(){

                               //动态生成表格
                            $('.l-table').on('click','.addtr',function(){
                                var lineNum = $(this).parent().parent().parent().children('tr:last-child').children('td:first-child').text();
                                var $tr = $('<tr/>').html(
                                    `<td>${Number(lineNum)+1}</td>
                                    <td><i class="glyphicon glyphicon-plus addtr"></i><i class="glyphicon glyphicon-remove deltr"></i></td>
                                    <td data-name="prov"></td>
                                    <td data-name="code"></td>
                                    <td data-name="barc"></td>
                                    <td data-name="name"></td>
                                    <td data-name="price" class="pri"></td>
                                    <td class="number"></td>
                                    <td class="all"></td>`
                                    ).addClass('t'+ (Number(lineNum)+1));
                                        $('.l-table').append($tr);

                            }).on('click','.deltr',function(){
                                $(this).parent().parent().remove();

                                });

                                //可编辑表格
                                $('.tablebox .l-table').on('click','td',function(){
                                    if(this == $(this).parent().children()[0] || this == $(this).parent().children()[1]){
                                        return false;
                                    }
                                    //可选商家
                                    if(this == $(this).parent().children()[2]){
                                       
                                        if($(this).children().length == '0'){
                                            var $select = $('<select/>').css({'width':'100%','height':'100%','border':'none'}).addClass('select');
                                            $.post(self.baseUrl+'/supplierfind',{},function(res){
                                            
                                                var $option = $('<option/>').html(res.data[0].unname).attr({'value':res.data[0].unname});
                                                $select.append($option)
                                                for(var i=1;i<res.data.length;i++){
                                                   
                                                    if(res.data[i].unname != res.data[0].unname){

                                                        var $opt = $('<option/>').html(res.data[i].unname).attr({'value':res.data[i].unname})
                                                        $select.append($opt)
                                                    }
                                                }


                                            })
                                                // $(this).children().remove()
                                        }
                                            $(this).append($select)
                                    }


                                    if(this == $(this).parent().children()[3]){
                                        var it = $(this)
                                        var curren = $(this).parent().children('td:nth-child(3)').children().val();
                                        if($(this).children().length == '0'){
                                          
                                            var $select = $('<select/>').css({'width':'100%','height':"100%",'border':'none'}).addClass('chose')
                                            $.post(self.baseUrl+'/supplierfind',{unname:curren},function(res){
                                                console.log(res)
                                                for(var i=0;i<res.data.length;i++){
                                                    var $opt = $('<option/>').html(res.data[i].gdcode).attr({'value':res.data[i].gdcode})
                                                    $select.append($opt)
                                                }

                                                $('.chose').click(function(){
                                                    console.log($(this).val())
                                                    for(var i=0;i<res.data.length;i++){
                                                        if(res.data[i].gdcode == $(this).val()){
                                                            it.parent().children('td:nth-child(6)').html('')
                                                            it.parent().children('td:nth-child(6)').html(res.data[i].gdname)
                                                        }
                                                    }
                                                })

                                            })
                                             $(this).append($select)
                                        }
                                        // console.log($(this).children().val())
                                    }
                                    
                                    if($(this).find('input').length == 0 && this != $(this).parent().children()[2] && this != $(this).parent().children()[3] ){
                                        var $input = $('<input/>').text($(this).text());
                                        $(this).text('')
                                        $(this).append($input);
                                        $input.focus();
                                        //失去焦点时删除input 保留数据
                                        $input.blur(function(){
                                            $(this).parent().text($(this).val())
                                           
                                        })
                                    }
                               })

                                //生成进货单
                                $('.l-create').click(function(){
                                    var listNum = $('.listnum').val() || 'LJ'+Math.ceil(Math.random()*100000);

                                    var nowTime = new Date();
                                    year =  nowTime.getFullYear();
                                    months = nowTime.getMonth();
                                    day = nowTime.getDate();
                                    time = year + '-' + months + '-' + day;

                                    var buyMan = $('.buy-man').val() || '未写入';
                                    var allPrice = $('.allPrice').val() || '未写入';

                                    var trs = $('.l-table').find('tbody').children().length-1;
                                    var arr = [];
                                    for(var i=1;i<=trs;i++){
                                        var $currentTr = $('.t'+i);
                                        
                                        var obj = {
                                            rank:$currentTr.children('td:nth-child(1)').text(),
                                            prov:$currentTr.children('td:nth-child(3)').children().val(),
                                            code:$currentTr.children('td:nth-child(4)').children().val(),
                                            barc:$currentTr.children('td:nth-child(5)').text(),
                                            name:$currentTr.children('td:nth-child(6)').text(),
                                            price:$currentTr.children('td:nth-child(7)').text(),
                                            num:$currentTr.children('td:nth-child(8)').text(),
                                            all:$currentTr.children('td:nth-child(9)').text()
                                        }

                                        arr.push(JSON.stringify(obj));
                                    }
                                    var tab = {listNum:listNum,date:time,buyMan:buyMan,allPrice:allPrice,status:'0',data:arr.join()};
                                    

                                    $.post(self.baseUrl+'/addlist',tab,function(response){
                                        
                                        if(response.status == true){
                                            alert('进货单已生成,单号为:'+listNum)
                                        }
                                    })
                                })
                                
                        })
                    })

                    //查看进货单
                    $('.l-find').click(function(){
                        showtab();
                        
                    })
                    
                    function showtab(){
                        $.get(self.baseUrl+'/listOut',function(response){
                        var $thead = $('<thead/>').html(`<th></th>
                                                    <th>单据状态</th>
                                                    <th>单据号</th>
                                                    <th>采购员</th>
                                                    <th>采购金额</th>
                                                    <th>单据日期</th>
                                                    <th></th>`);
                        var $table = $('<table/>').addClass('list').append($thead)
                        var status;
                        
                        for(var i=1;i<=response.data.length;i++){

                            if(response.data[i-1].status == '0'){
                                status = "进货";

                                
                            }else if(response.data[i-1].status == '1'){
                                status = '入库'
    
                            }


                            var $tr = $('<tr/>').html(
                                `<td>${i}</td>
                                <td><span class="gb label label-info">${status}</span></td>
                                <td class="click"><a>${response.data[i-1].listNum}</a></td>
                                <td>${response.data[i-1].buyMan}</td>
                                <td>${response.data[i-1].allPrice}</td>
                                <td>${response.data[i-1].date}</td>
                                <td><button class="btn btn-info receive">收货</button></td>`
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
                         
                            var listNum = $('.selector .click').text();
                            $.post(self.baseUrl+'/tableDel',{listNum:listNum},function(result){
                            }) 
                            $('.selector .click').parent().remove()
                        })

                        //点击单号跳到单据页面
                        $('.click').click(function(){
                            var listNum = $(this).text();
                            var h2 = $('<h3/>').html('进货单'+listNum)
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
                                    $('.tablebox').append(h2,$tab)
                                }
                             }
                        })

                        //生成收货单
                        $('.receive').click(function(){
                            var listNum = $(this).parent().parent().find('.click').text();
                            var h2 = $('<h3/>').html('收货单'+listNum)
                            var button = $('<button/>').html('确认收货').addClass('btn btn-info inWarehouse').css({'margin-left':'672px','margin-top':10});
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
                                            <th>实收数量</th>
                                        </tr>`
                                        ).addClass('l-tab')
                                    for(var j=0;j<arr.length;j++){
                                        
                                        $tr = $('<tr/>').addClass('t'+(j+1));
                                        $rank = $('<td/>').html(arr[j].rank)
                                        $prov = $('<td>').html(arr[j].prov)
                                        $code = $('<td>').html(arr[j].code)
                                        $barc = $('<td>').html(arr[j].barc)
                                        $name = $('<td/>').html(arr[j].name)
                                        $num = $('<td>').html(arr[j].num)
                                        $tr.append($rank,$prov,$code,$barc,$name,$num)
                                        $tab.append($tr)
                                    }
                                    $('.tablebox').html('');
                                    $('.tablebox').append(h2,$tab,button)
                                }
                             }

                            //编辑实收数量
                            $('.tablebox .l-tab').on('click','td',function(){
                                var td = $(this).parent().children('td:last-child').get(0)
                                
                                if(this == td){
                                  
                                    if($(this).find('input').length == 0){
                                        var $input = $('<input/>').text($(this).text()).css({'width':50,'outline':'none','border':'none'});
                                        $(this).text('')
                                        $(this).append($input)
                                        $input.focus();
                                        //失去焦点时删除input 保留数据
                                        $input.blur(function(){
                                            $(this).parent().text($(this).val())
                                           
                                        })

                                    }
                                }

                           })

                            //收货入库
                            $('.inWarehouse').click(function(){
                                var nowlist;
                                $.post(self.baseUrl+'/changestatus',{listNum:listNum,status:'1'},function(res){
                                })
                            
                                var trs = $('.l-tab').children().children().length-1;

                                var arr = [];
                                for(var i=0;i<trs;i++){
                                    var $currentTr = $('.t'+(i+1));
                                    var obj = {
                                        rank:$currentTr.children('td:nth-child(1)').text(),
                                        prov:$currentTr.children('td:nth-child(2)').text(),
                                        code:$currentTr.children('td:nth-child(3)').text(),
                                        barc:$currentTr.children('td:nth-child(4)').text(),
                                        name:$currentTr.children('td:nth-child(5)').text(),
                                        num:$currentTr.children('td:nth-child(6)').text()
                                    }
                                    arr.push(obj)
                                }
                                $.post(self.baseUrl+'/receive',{data:JSON.stringify(arr)},function(result){
                                    if(result.status == true){
                                        alert('商品已入库')
                                    }
                                })
                            });

                        })
                    })
                }
                })

            })
        },
        //会员管理
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
                    //双击修改数据
                    $('tbody').unbind('dblclick').on('dblclick','tr',function(){
                        self.update();
                    })
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
                //添加
                add:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $('.z-addform').show().siblings().hide();
                    $('.z-title-word').text('会员-增加');
                    $('.btn-add').text('增加');
                    var newCode = '';
                    var newCard = '';
                    //自动编码
                    $.post(`${$this.baseUrl}/MerberMax`,{code:-1},function(res){
                        var prevCode = res.data[0].code*1;
                        newCode =`00000${prevCode+1}`.slice(-6);
                        newCard = `888800000${prevCode+1}`.slice(-10);
                        $('#mbcode').attr('disabled',true).val(newCode);
                        $('#mcard').attr('disabled',true).val(newCard);
                        $('#mdate').val((new Date()).toLocaleDateString().split('/').join('-'));
                    });
                   
                    //取消增加
                    $('.glyphicon-remove').click(function(){
                        $('.z-cover').hide();
                    });
                    //点击增加按纽
                    $('.btn-add').off("click").on("click",function(){
                        var js = 0;
                        $('.must',".z-addform").each(function(){
                            if($(this).val() == ''){
                                $(this).css('border','1px solid red');
                                js++;
                            }
                        });
                        
                        if(js>0){
                            return false;
                        }
                        var data = {};
                        $('.z-addform .form-control').each(function(){
                            data[$(this).attr('data-name')] = $(this).val();
                        });
                        //防止有人恶意修改
                        data['code'] = newCode;
                        data['card'] = newCard;
                        $.post(`${$this.baseUrl}/merberAdd`,data,function(res){
                            self.show({});
                        });
                        $('.z-cover').hide();
                    })   
                },
                //显示数据
                show:function(data){
                    var findClass = data.classify ? '/merberConFind' : '/merberFind';
                    $.post(`${$this.baseUrl}${findClass}`,data,function(res){
                        if(res.data.length >0){
                            $('.z-table tbody').html('');
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
                        } else {
                            $('.z-table tbody').html(`<tr><td colspan="10">查询数据为空</td></tr>`);
                        }
                        
                    });
                    return this;
                },
                //修改数据
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
                                    var dataName = $(this).attr('data-name');
                                    if(dataName == 'integral' || dataName == "consume"){
                                        data[$(this).attr('data-name')] = $(this).val()*1;
                                    }else{
                                        data[$(this).attr('data-name')] = $(this).val();
                                    }
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
                //删除数据
                remove:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $(".z-remove").show().siblings().hide();
                    $(".z-showcode span").text($(".z-active").children().eq(0).text());
                    
                    $(".affirm").off("click").on('click',function(){
                            $.post(`${$this.baseUrl}/merberRomove`,{code:$(".z-showcode span").text()},function(res){
                                if(res.ok){
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
                //查找数据
                find:function(){
                    var self = this;
                    var condition = $('#z-condition').val();
                    var findClass = $('#z-findclass').val();
                    var findval = $('.z-findval').val();
                    self.show({condition:condition,findval:findval,classify:findClass});
                }
            }
            return Merber.init();
        },
        //员工管理
        staff:function(){
            var $this = this;
            var Staff = {
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
                    //双击修改数据
                    $('tbody').unbind('dblclick').on('dblclick','tr',function(){
                        self.update();
                    })
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
                //添加
                add:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $('.z-addform').show().siblings().hide();
                    var newStaffcode = '';
                    //自动编码
                    $.post(`${$this.baseUrl}/StaffMax`,{staffcode:-1},function(res){
                        var prevCode = res.data == undefined ? 0 : res.data[0].staffcode*1;
                        newStaffcode = `00000${prevCode+1}`.slice(-6);
                        $('#staffcode').attr('disabled',true).val(newStaffcode);
                        $('#staffdate').val((new Date()).toLocaleDateString().split('/').join('-'));
                    });
                    //取消增加
                    $('.glyphicon-remove').click(function(){
                        $('.z-cover').hide();
                    });
                    //点击增加按纽
                    $('.btn-add').off("click").on("click",function(){
                        var js = 0;
                        $('.must',".z-addform").each(function(){
                            if($(this).val() == ''){
                                $(this).css('border','1px solid red');
                                js++;
                            }
                        });
                        if(js>0){
                            return false;
                        }
                        var data = {};
                        $('.z-addform .form-control').each(function(){
                            data[$(this).attr('data-name')] = $(this).val();
                        });
                        //防止有人恶意修改
                        data['staffcode'] = newStaffcode;
                        $.post(`${$this.baseUrl}/StaffAdd`,data,function(res){
                            self.show({});
                        });
                        $('.z-cover').hide();
                    })   
                },
                //显示数据
                show:function(data){
                    var findClass = data.classify ? '/staffConFind' : '/staffFind';
                    $.post(`${$this.baseUrl}${findClass}`,data,function(res){
                        if(res.data.length >0){
                            $('.z-table tbody').html('');
                            res.data.forEach(function(item){
                                var tr = $('<tr/>');
                                for( var key in item){
                                    if(key != "_id" && key != "password"){
                                        $('<td/>').text(item[key]).attr('data-name',key).appendTo(tr);
                                    }else{
                                        tr.attr('data-id',item[key]);
                                    }
                                }
                            tr.appendTo($('.z-table tbody'));
                            });
                        } else {
                            $('.z-table tbody').html(`<tr><td>查询数据为空</td></tr>`);
                        }
                        
                    });
                    return this;
                },
                //修改数据
                update:function(){
                    var self = this;
                    $.post(`${$this.baseUrl}/StaffFind`,{staffcode:$('.z-active').children().eq(0).text()},function(res){
                        $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                        $('.z-updateform').show().siblings().hide();
                        for(var key in res.data[0]){
                            $('.form-control').each(function(){
                                if($(this).attr('data-name') == key){
                                    $(this).val(res.data[0][key])
                                }
                            });
                        }
                        $('.glyphicon-remove').click(function(){
                            $('.z-cover').hide();
                        });
                        
                        $('.btn-update').off("click").on("click",function(){
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
                                $.post(`${$this.baseUrl}/StaffUpdate`,{update:JSON.stringify({origin:dataObj,update:data})},function(res){
                                    self.show({});
                                    $('.z-cover').hide();
                                    $('.z-updateform').hide();
                                });
                        });
                    })
                },
                //删除数据
                remove:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $(".z-remove").show().siblings().hide();
                    $(".z-showcode span").text($(".z-active").children().eq(0).text());
                    
                    $(".affirm").off("click").on('click',function(){
                            $.post(`${$this.baseUrl}/StaffRomove`,{staffcode:$(".z-showcode span").text()},function(res){
                                if(res.ok){
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
                //查找数据
                find:function(){
                    var self = this;
                    var condition = $('#z-condition').val();
                    var findClass = $('#z-findclass').val();
                    var findval = $('.z-findval').val();
                    self.show({condition:condition,findval:findval,classify:findClass});
                }
            }
            return Staff.init();
        },
        //登录
        login:function(){
            var $this = this;
            $('.btn-success').click(function(){
                if($(".staffcode").val().trim() == '' || $(".password").val().trim() == ""){
                    alert("员工编码或登录密码不能为空");
                    return false;
                }

                $.post(`${$this.baseUrl}/login`,{staffcode:$(".staffcode").val(),password:$(".password").val()},function(req){
                    if(req.status){
                        document.cookie = 'token='+req.token+';path=/';
                        window.location.href = '../index.html';
                    } else {
                        alert("登录不成功，请重新输入！");
                    }
                });
                return false;
            });
        },
        //判断用户是否登录
        issign:function(){
            var cookies = document.cookie.split('; ');
            var token = '';
            cookies.forEach(function(item){
              var temp = item.split('=');
              if(temp[0] == 'token'){
                token = temp[1];
              }
            });
            $.ajax({
              type: 'post',
              url: `${this.baseUrl}/index`,
              headers: {'Authorization': token},
              success: function(response){
                if(response.status ==false || response == undefined ){
                  location.href = '../html/login.html'
                }
              }
            })
        },
        //库存管理
        stock:function(){
            var $this = this;
            var Stock = {
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
                    //双击修改数据
                    $('tbody').unbind('dblclick').on('dblclick','tr',function(){
                        self.update();
                    })
                    //查找数据
                    $('.select').click(function(){
                        if($('.z-findval').val().trim() == ''){
                            return false;
                        }
                        self.find();
                    });
                    //上架
                    $(".putaway").unbind('click').click(function(){
                       self.putaway();
                    });
                },
                //添加
                add:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $('.z-addform').show().siblings().hide();
                    //取消增加
                    $('.glyphicon-remove').click(function(){
                        $('.z-cover').hide();
                    });
                    //点击增加按纽
                    $('.btn-add').off("click").on("click",function(){
                        var js = 0;
                        $('.must',".z-addform").each(function(){
                            if($(this).val() == ''){
                                $(this).css('border','1px solid red');
                                js++;
                            }
                        });
                        if(js>0){
                            return false;
                        }
                        var data = {};
                        $('.z-addform .form-control').each(function(){
                            data[$(this).attr('data-name')] = $(this).val();
                        });
                        $.post(`${$this.baseUrl}/StockAdd`,data,function(res){
                            self.show({});
                        });
                        $('.z-cover').hide();
                    })   
                },
                //显示数据
                show:function(data){
                    var findClass = data.classify ? '/StockConFind' : '/StockFind';
                    $.post(`${$this.baseUrl}${findClass}`,data,function(res){
                        if(res.data.length >0){
                            $('.z-table tbody').html('');
                            res.data.forEach(function(item){
                                var tr = $('<tr/>');
                                for( var key in item){
                                    if(key != "_id" && key != "price" && key != "vipPrice" && key != "addDate" && key !="quantity"){
                                        $('<td/>').text(item[key]).attr('data-name',key).appendTo(tr);
                                    }else{
                                        tr.attr('data-id',item[key]);
                                    }
                                }
                            tr.appendTo($('.z-table tbody'));
                            });
                        } else {
                            $('.z-table tbody').html(`<tr><td colSpan="7">查询数据为空</td></tr>`);
                        }
                    });
                    return this;
                },
                //修改数据
                update:function(){
                    var self = this;
                    $.post(`${$this.baseUrl}/StockFind`,{code:$('.z-active').children().eq(1).text()},function(res){
                        $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                        $('.z-updateform').show().siblings().hide();
                        for(var key in res.data[0]){
                            $('.form-control').each(function(){
                                if($(this).attr('data-name') == key){
                                    $(this).val(res.data[0][key])
                                }
                            });
                        }
                        $('.glyphicon-remove').click(function(){
                            $('.z-cover').hide();
                        });
                        
                        $('.btn-update').off("click").on("click",function(){
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
                                $.post(`${$this.baseUrl}/StockUpdate`,{update:JSON.stringify({origin:dataObj,update:data})},function(res){
                                    self.show({});
                                    $('.z-cover').hide();
                                    $('.z-updateform').hide();
                                });
                        });
                    })
                },
                //删除数据
                //上架
                putaway:function(){
                    var self = this;
                    $.post(`${$this.baseUrl}/StockFind`,{code:$('.z-active').children().eq(1).text()},function(res){
                        $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                        $('.z-putawayform').show().siblings().hide();
                        for(var key in res.data[0]){
                            $('.form-control').each(function(){
                                if($(this).attr('data-name') == key){
                                    $(this).val(res.data[0][key])
                                }
                            });
                        }
                        $('.glyphicon-remove').click(function(){
                            $('.z-cover').hide();
                        });
                        $('.btn-putaway').off("click").on("click",function(){
                                var data = {};
                                $('.form-control').each(function(){
                                    if($(this).is("#num") == 'num'){
                                        data[$(this).attr('data-name')] = $(this).val()*1;
                                    }else{
                                        data[$(this).attr('data-name')] = $(this).val();
                                    }
                                });
                                var stockData = {
                                    find:{code : res.data[0].code},
                                    num:{num : -($('#num').val()*1)}
                                };
                                $.post(`${$this.baseUrl}/StockUpdate`,{stockData:JSON.stringify(stockData)},function(res){
                                        $.post(`${$this.baseUrl}/PutawayAdd`,data,function(res){
                                            self.show({});
                                            $('.z-cover').hide();
                                            $('.z-putawayform').hide();
                                        });
                                });
                        });
                    })
                },
                //查找数据
                find:function(){
                    var self = this;
                    var condition = $('#z-condition').val();
                    var findClass = $('#z-findclass').val();
                    var findval = $('.z-findval').val();
                    self.show({condition:condition,findval:findval,classify:findClass});
                }
            }
            return Stock.init();
        },
        //上架管理
        putaway:function(){
            var $this = this;
            var Putaway = {
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
                    //双击修改数据
                    $('tbody').unbind('dblclick').on('dblclick','tr',function(){
                        self.update();
                    })
                    //查找数据
                    $('.select').click(function(){
                        if($('.z-findval').val().trim() == ''){
                            return false;
                        }
                        self.find();
                    });
                    //下架数据
                    $(".outaway").unbind('click').click(function(){
                       self.outaway();
                    });
                },
                //添加
                add:function(){
                    var self = this;
                    $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                    $('.z-addform').show().siblings().hide();
                    //取消增加
                    $('.glyphicon-remove').click(function(){
                        $('.z-cover').hide();
                    });
                    //点击增加按纽
                    $('.btn-add').off("click").on("click",function(){
                        var js = 0;
                        $('.must',".z-addform").each(function(){
                            if($(this).val() == ''){
                                $(this).css('border','1px solid red');
                                js++;
                            }
                        });
                        if(js>0){
                            return false;
                        }
                        var data = {};
                        $('.z-addform .form-control').each(function(){
                            data[$(this).attr('data-name')] = $(this).val();
                        });
                        $.post(`${$this.baseUrl}/PutawayAdd`,data,function(res){
                            self.show({});
                        });
                        $('.z-cover').hide();
                    })   
                },
                //显示数据
                show:function(data){
                    var findClass = data.classify ? '/PutawayConFind' : '/PutawayFind';
                    $.post(`${$this.baseUrl}${findClass}`,data,function(res){
                        if(res.data.length >0){
                            $('.z-table tbody').html('');
                            res.data.forEach(function(item){
                                var tr = $('<tr/>');
                                for( var key in item){
                                    if(key != "_id" && key != "price" && key != "vipPrice" && key != "addDate" && key !="quantity"){
                                        $('<td/>').text(item[key]).attr('data-name',key).appendTo(tr);
                                    }else{
                                        tr.attr('data-id',item[key]);
                                    }
                                }
                            tr.appendTo($('.z-table tbody'));
                            });
                        } else {
                            $('.z-table tbody').html(`<tr><td>查询数据为空</td></tr>`);
                        }
                    });
                    return this;
                },
                //修改数据
                update:function(){
                    var self = this;
                    $.post(`${$this.baseUrl}/PutawayFind`,{code:$('.z-active').children().eq(1).text()},function(res){
                        $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                        $('.z-updateform').show().siblings().hide();
                        for(var key in res.data[0]){
                            $('.form-control').each(function(){
                                if($(this).attr('data-name') == key){
                                    $(this).val(res.data[0][key])
                                }
                            });
                        }
                        $('.glyphicon-remove').click(function(){
                            $('.z-cover').hide();
                        });
                        
                        $('.btn-update').off("click").on("click",function(){
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
                                $.post(`${$this.baseUrl}/PutawayUpdate`,{update:JSON.stringify({origin:dataObj,update:data})},function(res){
                                    self.show({});
                                    $('.z-cover').hide();
                                    $('.z-updateform').hide();
                                });
                        });
                    })
                },
                //下架
                outaway:function(){
                    var self = this;
                    $.post(`${$this.baseUrl}/PutawayFind`,{code:$('.z-active').children().eq(1).text()},function(res){
                        $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                        $('.z-outawayform').show().siblings().hide();
                        for(var key in res.data[0]){
                            $('.form-control').each(function(){
                                if($(this).attr('data-name') == key){
                                    $(this).val(res.data[0][key])
                                }
                            });
                        }
                        $('.glyphicon-remove').click(function(){
                            $('.z-cover').hide();
                        });
                        $('.btn-outaway').off("click").on("click",function(){
                                var putawayData = {
                                    find:{code : res.data[0].code},
                                    num:{num : -($('#num').val()*1)}
                                };
                                var stockData = {
                                    find:{code : res.data[0].code},
                                    num:{num : $('#num').val()*1}
                                };
                                $.post(`${$this.baseUrl}/PutawayUpdate`,{putawayData:JSON.stringify(putawayData)},function(res){
                                        $.post(`${$this.baseUrl}/StockAdd`,{stockData:JSON.stringify(stockData)},function(res){
                                            self.show({});
                                            $('.z-cover').hide();
                                            $('.z-outawayform').hide();
                                        });
                                });
                        });
                    })
                },
                //查找数据
                find:function(){
                    var self = this;
                    var condition = $('#z-condition').val();
                    var findClass = $('#z-findclass').val();
                    var findval = $('.z-findval').val();
                    self.show({condition:condition,findval:findval,classify:findClass});
                }
            }
            return Putaway.init();
        },
        //订单管理
        order:function(){
            var self = this;
            var Order = {
                init:function(){
                    $.post(self.baseUrl+'/orderout',function(result){
                        showtab()
                        function showtab(){
                            var $thead = $('<thead/>').html(`<th></th>
                                                        <th>单据状态</th>
                                                        <th>单据号</th>
                                                        <th>售货员</th>
                                                        <th>成交金额</th>
                                                        <th>单据日期</th>
                                                        `);
                            var $table = $('<table/>').addClass('list').append($thead)
                                for(var i=1;i<=result.data.length;i++){
        
                                var $tr = $('<tr/>').html(
                                    `<td>${i}</td>
                                    <td><span class="gb label label-info">出库</span></td>
                                    <td class="click"><a>${result.data[i-1].listNum}</a></td>
                                    <td>${result.data[i-1].salesMan}</td>
                                    <td>${result.data[i-1].allPrice}</td>
                                    <td>${result.data[i-1].date}</td>
                                    `
                                    )
                                $table.append($tr)
                            }
                            $('.tablebox').html('').append($table)
                            //点击单号跳到单据页面
                            $('.click').click(function(){

                                var listNum = $(this).text();
                                var h2 = $('<h3/>').html('订单'+listNum)
                                for(var i=0;i<result.data.length;i++){
                                    if(result.data[i].listNum == listNum){
                                     
                                      var str ="["+ result.data[i].data + "]";
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
                                            </tr>`
                                            ).addClass('l-tab')
                                        for(var j=0;j<arr.length;j++){
                                            
                                            $tr = $('<tr/>');
                                            $rank = $('<td/>').html(j+1)
                                            $prov = $('<td>').html(arr[j].prov)
                                            $code = $('<td>').html(arr[j].code)
                                            $barc = $('<td>').html(arr[j].barc)
                                            $name = $('<td/>').html(arr[j].name)
                                            $price = $('<td>').html(arr[j].price)
                                            $num = $('<td>').html(arr[j].num)
                                            // $all = $('<td>').html(arr[j].all)
                                            $tr.append($rank,$prov,$code,$barc,$name,$price,$num)
                                            $tab.append($tr)
                                        }
                                        $('.tablebox').html('');
                                        $('.tablebox').append(h2,$tab)
                                    }
                                 }
                            })

                            $('.list').on('click','tr',function(){
                              
                                $('.list').children().removeClass('selector')
                                $(this).addClass('selector');
                            })
                            // 删
                            $('.l-del').off('click').on('click',function(){
                             
                                var listNum = $('.selector .click').text()
                                $.post(self.baseUrl+'/orderdele',{listNum:listNum},function(result){
                                }) 
                                $('.selector .click').parent().remove()
                            })
                        }
                        //查看
                        $('.l-find').click(function(){
                            showtab();
                        })
                    })
                
                }
                

            }
            return Order.init();
        },
        // 供应商管理
        supplier:function(){
            var self = this;
            show();
            $('.l-add').click(function(){
                // $('.z-cover').css({'display':'block'})
                console.log(666)
              $('.z-cover').show().height(window.innerHeight - $('.change').offset().top-2).css({top:$('.navtop').height()});
                $('.z-addform').show().siblings().hide();
                $('.z-title-word').text('供应商-增加');
                $('.btn-add').text('增加');

                $('.glyphicon-remove').click(function(){
                        $('.z-cover').hide();
                    });

             //点击增加按纽
                $('.btn-add').off("click").on("click",function(){
                    var js = 0;
                    $('.must',".z-addform").each(function(){
                        if($(this).val() == ''){
                            $(this).css('border','1px solid red');
                            js++;
                        }
                    });
                    if(js>0){
                        return false;
                    }
                    var data = {};
                    $('.z-addform .form-control').each(function(){
                        data[$(this).attr('data-name')] = $(this).val();
                    });
                    console.log(data);
                    $.post(`${self.baseUrl}/supplieradd`,data,function(res){
                        console.log(res)
                        show({}); 
                    });
                    $('.z-cover').hide();
                })   
            })

            function show(data){
                $.post(`${self.baseUrl}/supplierfind`,data,function(res){
                    if(res.data.length >0){
                        $('.z-table tbody').html('');
                        res.data.forEach(function(item){
                            var tr = $('<tr/>');
                            for( var key in item){
                                if(key != "_id" && key != "price" && key != "vipPrice" && key != "addDate" && key !="quantity"){
                                    $('<td/>').text(item[key]).attr('data-name',key).appendTo(tr);
                                }else{
                                    tr.attr('data-id',item[key]);
                                }
                            }
                        tr.appendTo($('.z-table tbody'));
                        });
                    } else {
                        $('.z-table tbody').html(`<tr><td>查询数据为空</td></tr>`);
                    }
                });
                return this;
            }
        }
    }
})