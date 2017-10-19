define(['jquery'],function(){
    return {
        baseUrl:"http://localhost:8848",
        //产品管理
        Product:function($){
            $('.probtn').click(function(){
             $('.content-right').load('html/productManagement.html #t-product',function(){
                    $('.change button').click(function(){
                    });
                    //增加行
                    $('.t-table .add').click(function(){
                        var add = $('.t-table tfoot');
                        $(this).parent().parent().clone(true,true).appendTo(add);
                        var num = $('.t-table tfoot tr').children('th').eq(0).text();
                        console.log(num);
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


                    //表格编辑
                    $(function(){ 
                        $("td").click(function(event){ 
                        //td中已经有了input,则不需要响应点击事件
                        if($(this).children("input").length > 0){
                            return false;

                        } 
                    
                        var tdObj = $(this); 
                        var preText = tdObj.html();
                        //得到当前文本内容 
                        var inputObj = $("<input type='text' />");
                        //创建一个文本框元素 
                        tdObj.html(""); //清空td中的所有元素 
                        inputObj 
                        .width(tdObj.width())
                        //设置文本框宽度与td相同 
                        .height(tdObj.height()) 
                        .css({border:"0px"})
                        .val(preText) 
                        .appendTo(tdObj)
                        //把创建的文本框插入到tdObj子节点的最后
                        .trigger("focus")
                        //用trigger方法触发事件 
                        .trigger("select"); 
                        inputObj.keyup(function(event){ 
                        if(13 == event.which){
                        //用户按下回车 
                            var text = $(this).val(); 
                            tdObj.html(text); 
                        } 
                        else if(27 == event.which){ 
                            //ESC键 
                            tdObj.html(preText); 
                       } 
                      }); 
                      //已进入编辑状态后，不再处理click事件 
                      inputObj.click(function(){ 
                       return false; 
                      }); 
                     }); 
                    });
            });

            
            //查询表
            $.post("http://localhost:8848/productOut",{},function(response,data){
                var tr = $('.t-table tbody .copy');

                var tfoot = $('.t-table tfoot');
                var leng = response.data.length;
                var page = Math.ceil(leng/10);
                var pagul = $('<ul/>')
                for(var j=0;j<page;j++){
                    $(`<li>${j+1}</li>`).appendTo(pagul);
                }
                // $('.t-table tbody').text('');
                pagul.appendTo($('.page'));
                pagul.children().eq(0).css({backgroundColor:'#337AB7'});
                function Copy(){
                        var Tr = tr.clone(true,true)
                        $(Tr.children('th')[0]).text(`${i+1}`)
                        $(Tr.children('td')[0]).text(`${response.data[i].provider}`);
                        $(Tr.children('td')[1]).text(`${response.data[i].productCode}`);
                        $(Tr.children('td')[2]).text(`${response.data[i].barCode}`);
                        $(Tr.children('td')[3]).text(`${response.data[i].productName}`);
                        $(Tr.children('td')[4]).text(`${response.data[i].unitPrice}`);
                        $(Tr.children('td')[5]).text(`${response.data[i].quantity}`);
                        Tr.appendTo(tfoot);
                    }
                for(var i=0;i<10;i++){
                    Copy();
                }
                tr.hide();
                pagul.children().click(function(){
                    pagul.children().each(function(){
                        $(this).css({backgroundColor:'#31B0D5'});
                    })
                    $(this).css({backgroundColor:'#337AB7'});
                    tfoot.text('');
                    tr.show();
                    var num = $(this).index();
                    for(var i=10*num;i<10*(num+1);i++){
                        var Tr = tr.clone(true,true)
                        $(Tr.children('th')[0]).text(`${i+1}`)
                        $(Tr.children('td')[0]).text(`${response.data[i].provider}`);
                        $(Tr.children('td')[1]).text(`${response.data[i].productCode}`);
                        $(Tr.children('td')[2]).text(`${response.data[i].barCode}`);
                        $(Tr.children('td')[3]).text(`${response.data[i].productName}`);
                        $(Tr.children('td')[4]).text(`${response.data[i].unitPrice}`);
                        $(Tr.children('td')[5]).text(`${response.data[i].quantity}`);
                        Tr.appendTo(tfoot);
                }
                    tr.hide();
                })

                console.log(response.data.length,data);


                $('.change .btn').eq(0).click(function(){
                    $.post("http://localhost:8848/productIn",{provider:'ee1qq',
                        productCode:3,
                        barCode:998283,
                        productName:3,
                        unitPrice:2,
                        quantity:2
                    },function(response,data,da){
                        console.log(666);
                        console.log(response,data);
                    var addBtn = $('.t-table')
                    console.log(addBtn);
                    });            
                })

            });

            });
        },
        //采购管理
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
                    $('.btn-add').off("click").on("click",function(){
                        console.log(9999);
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
                //显示数据
                show:function(data){
                    $.post(`${$this.baseUrl}/merberFind`,data,function(res){
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
                //删除数据
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
                //查找数据
                find:function(){
                    var self = this;
                    var condition = $('#z-condition').val();
                    var findClass = $('#z-findclass').val();
                    var findval = $('.z-findval').val();
                    self.show({condition:condition,findval:findval,class:findClass});
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
                    //自动编码
                    $.post(`${$this.baseUrl}/StaffFind`,{find:'count()'},function(res){
                        var prevCode = res.status == false ? 0 : res.data[0].staffcode*1;
                        console.log(prevCode);
                        $('#staffcode').val(`00000${prevCode+1}`.substr(-6,6));
                        $('#staffcard').val(`888800000${prevCode+1}`.substr(-10,10));
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
                        console.log(data);
                        $('.z-addform .form-control').each(function(){
                            data[$(this).attr('data-name')] = $(this).val();
                        });
                        $.post(`${$this.baseUrl}/StaffAdd`,data,function(res){
                            self.show({});
                        });
                        $('.z-cover').hide();
                    })   
                },
                //显示数据
                show:function(data){
                    $.post(`${$this.baseUrl}/StaffFind`,data,function(res){
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
                //查找数据
                find:function(){
                    var self = this;
                    var condition = $('#z-condition').val();
                    var findClass = $('#z-findclass').val();
                    var findval = $('.z-findval').val();
                    self.show({condition:condition,findval:findval,class:findClass});
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
                        window.location.href = 'index.html';
                    } else {
                        alert("登录不成功，请重新输入！");
                    }
                });
                return false;
            });
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
                    //自动编码
                    // $.post(`${$this.baseUrl}/StockFind`,{find:'count()'},function(res){
                    //     var prevCode = res.status == false ? 0 : res.data[0].productCode*1;
                    //     console.log(prevCode);
                    //     $('#productCode').val(`00000${prevCode+1}`.substr(-6,6));
                    //     $('#stockcard').val(`888800000${prevCode+1}`.substr(-10,10));
                    //     $('#stockdate').val((new Date()).toLocaleDateString().split('/').join('-'));
                    // });
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
                        console.log(data);
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
                    $.post(`${$this.baseUrl}/StockFind`,data,function(res){
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
                                    data[$(this).attr('data-name')] = $(this).val();
                                });
                                var dataObj = {};
                                var updateObj = {};
                                for(var key in res.data[0]){
                                    if(key != "_id"){
                                        dataObj[key] = res.data[0][key];
                                        updateObj[key] = res.data[0][key];
                                    }
                                }
                                updateObj.num = updateObj.num*1 - data.num*1;
                                $.post(`${$this.baseUrl}/StockUpdate`,{update:JSON.stringify({origin:dataObj,update:updateObj})},function(res){
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
                    self.show({condition:condition,findval:findval,class:findClass});
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
                    //自动编码
                    // $.post(`${$this.baseUrl}/StockFind`,{find:'count()'},function(res){
                    //     var prevCode = res.status == false ? 0 : res.data[0].productCode*1;
                    //     console.log(prevCode);
                    //     $('#productCode').val(`00000${prevCode+1}`.substr(-6,6));
                    //     $('#stockcard').val(`888800000${prevCode+1}`.substr(-10,10));
                    //     $('#stockdate').val((new Date()).toLocaleDateString().split('/').join('-'));
                    // });
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
                        console.log(data);
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
                    $.post(`${$this.baseUrl}/PutawayFind`,data,function(res){
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
                //删除数据
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
                                var data = {};
                                $('.form-control').each(function(){
                                    data[$(this).attr('data-name')] = $(this).val();
                                });
                                var dataObj = {};
                                var updateObj = {};
                                for(var key in res.data[0]){
                                    if(key != "_id"){
                                        dataObj[key] = res.data[0][key];
                                        updateObj[key] = res.data[0][key];
                                    }
                                }
                                updateObj.num = updateObj.num*1 - data.num*1;
                                $.post(`${$this.baseUrl}/PutawayUpdate`,{update:JSON.stringify({origin:dataObj,update:updateObj})},function(res){
                                        $.post(`${$this.baseUrl}/StockAdd`,data,function(res){
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
                    self.show({condition:condition,findval:findval,class:findClass});
                }
            }
            return Putaway.init();
        }
    }
})