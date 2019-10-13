$(function(){
  var search_list = $('#user-search-result')

  function add_user_id(user_ids){
    $('.chat-group-user clearfix').each(function(){
      var user_id = $(this).attr('id');
      user_ids.push(user_id);
    });
    return user_ids
  }
  function appendUser(user){ 
    var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`;
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg){    
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    search_list.append(html);
  }
  function add_user_html(id,name){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${id} data-user-name=${name}>削除</div>
                </div>`;
    $('#users_append').append(html);
  }

  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var input = $('#user-search-field').val();
    var user_ids = add_user_id(user_ids);
    $.ajax({
      type: 'GET',
      url:'/users',
      data:{ keyword: input,user_ids: user_ids},
      dataType: 'json'
    })
    .done(function(users){
      if(input.length !== 0){
        $('#user-search-result').empty();
        users.forEach(function(users){
          appendUser(users)
        });
      }
      else {
        $('#user-search-result').empty();
        appendErrMsgToHTML("ユーザーが見つかりません");
      } 
    })
    .fail(function(){
      alert('検索に失敗しました')
    });
  });

  $(document).on("click",'.chat-group-user__btn--add',function(){
    var id=$(this).data("user-id");
    var name=$(this).data("user-name");
    add_user_html(id,name);
    $(this).parent().remove();
  });

  $(document).on("click",'.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn',function(){
    $(this).parent().remove();
  });
});