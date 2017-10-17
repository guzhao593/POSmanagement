define(['jquery'],function(){
    return {
        baseUrl:"http://localhost:8848",
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
                        console.log(js);
                        if(js>0){
                            return false;
                        }
                        var data = {};
                        $('.form-control').each(function(){
                            data[$(this).attr('data-name')] = $(this).val();
                        });
                        $.post(`${$this.baseUrl}/merberAdd`,data,function(res){
                            self.show({});
                        });
                        $('.z-cover').hide().find('.form-control').val('');
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