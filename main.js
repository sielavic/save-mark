function saveMark(){
    var mark = $('#newmarkfilename').val();
    var newName = $('#name_mark').val();//новое имя
    var oldName = $('#newName').text();
    var id = $('#newName').val();

    // console.log(mark);
    $.ajax({
        url: '/adminka/saveOnlyMark/',
        type: 'post',
        data: {
            'mark': mark,
            'nameMark': newName,
            'oldName': oldName,
            'id': id
        },
        success: function (data) {
            var data = JSON.parse(data);
            if (data.status == "success") {
                $('#blockDisplayAjax').hide();
                $('#blockDisplayAjaxLoading').hide();

                if (data.water_marks === 1){
                let content = '<div   id="mark-item_'+ data.result.id +'" class="col-md-12 mark-item">\n' +
                        '                                        <hr>\n' +
                        '                                        <div  class="oldAvatar fileinput-preview fileinput-exists margin-bottom-10" style="display: block;  height: auto;">\n' +
                        '                                            <div class="col-md-4">\n' +
                        '                                                \n' +
                        '                                                         <img  src="/assets/images/mark/'+ data.result.mark +'" class="img-thumbnail" alt="" style=""/>\n' +
                        '                                                </div>\n' +
                        '                                                <div class="col-md-8">\n' +
                        '                                                    <p id="oldName_'+data.result.id+'">'+data.result.name+'</p>                  \n'+
                        '                                                    <div class="edit-buttons" style="display: none;">\n' +
                        '                                                        <i onclick="showUpdateMarks('+ data.result.id +');return false;" class="fa fa-edit holiday-btns" title="Редактировать"></i>\n' +
                        '                                                       <button class="edit-button" disabled  id="dev_change_mark_'+ data.result.id +'" data-original-title="" title="" onclick="openRemoveModalModal(\''+ data.result.mark +'\', \'mark\','+ data.result.id +');return false;"  >\n' +
                        '                                                        <i  class="fa fa-times holiday-btns" title="Удалить"></i></button>\n' +
                        '                                                    </div>\n' +
                        '                                                </div>\n' +
                        '                                            </div>\n' +
                        '                                        </div>\n';

                    closeEditableMark(data.result.id);
                    if(id == '') {
                        $('.marks-container').append(content);
                        // applyDoubleClick();
                    } else {
                        $('#mark-item_' + data.result.id).replaceWith(content);
                    }

                }else if(data.water_marks === 0){
                    let content = '<div   id="mark-item_'+ data.result.id +'" class="col-md-12 mark-item">\n' +
                            '                                        <hr>\n' +
                            '                                        <div  class="oldAvatar fileinput-preview fileinput-exists margin-bottom-10" style="display: block;  height: auto;">\n' +
                            '                                            <div class="col-md-4">\n' +
                            '                                                \n' +
                            '                                                         <img  src="/assets/images/mark/'+ data.result.mark +'" class="img-thumbnail" alt="" style=""/>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="col-md-8">\n' +
                            '                                                    <p id="oldName_'+data.result.id+'">'+data.result.name+'</p>                  \n'+
                            '                                                    <div class="edit-buttons" style="display: none;">\n' +
                            '                                                        <i onclick="showUpdateMarks('+ data.result.id +');return false;" class="fa fa-edit holiday-btns" title="Редактировать"></i>\n' +
                            '                                                       <button class="edit-button"   id="dev_change_mark_'+ data.result.id +'" data-original-title="" title="" onclick="openRemoveModalModal(\''+ data.result.mark +'\', \'mark\','+ data.result.id +');return false;"  >\n' +
                            '                                                        <i  class="fa fa-times holiday-btns" title="Удалить"></i></button>\n' +
                            '                                                    </div>\n' +
                            '                                                </div>\n' +
                            '                                            </div>\n' +
                            '                                        </div>\n';


                    closeEditableMark(data.result.id);
                    if(id == '') {
                        $('.marks-container').append(content);
                        // applyDoubleClick();
                    } else {
                        $('#mark-item_' + data.result.id).replaceWith(content);
                    }
                }








                //
                // $('.marks-container').load(location.href + ' .marks-container>*');


                // location.reload();
            }else if (data.status == 'error_empty') {
                showBlockMsg('#error_empty');
                return false;
            }
        }
    });
}
