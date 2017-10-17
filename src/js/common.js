define(['jquery'],function(){
    return {
        baseUrl:"http://localhost:8848",
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

            // $.post("http://localhost:8848/productIn",{provider:'ee1qq',
            //     productCode:3,
            //     barCode:998283,
            //     productName:3,
            //     unitPrice:2,
            //     quantity:2
            // },function(response,data,da){
            //     console.log(666);
            //     console.log(response,data);
            // var addBtn = $('.t-table')
            // console.log(addBtn);
            // });
            
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
        }

    }

})