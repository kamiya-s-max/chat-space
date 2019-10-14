$(function(){
  function buildHTML(message) {
    var image = (message.image) ? `<img src=${message.image} class="lower-message__image">`:'';
    var content = (message.content) ? `<p class="body--text">${message.content}</p>`:'';
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper_message">
                    <p class="body--title">${message.user_name}</a>
                    <div class="body--message">
                      ${message.date}
                    </div>
                  ${content}                
                  </div>
                  ${image}
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    if($('#message_content').val() === '' && $('#message_image').val() === ''){
      alert('入力してください');
      return false;
    };
    var formdata = new FormData(this);
    $.ajax({
      url: window.location.href,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('#new_message')[0].reset();
      $('.input-box__btn').attr('disabled',false);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  });
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data('message-id');
      href = 'api/messages#index {format: "json"}'
      $.ajax({
        url: href,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.message-list').append(insertHTML);
          $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
        });
      })
      .fail(function() {
        alert('更新に失敗しました');
      });
    }; 
  };
  setInterval(reloadMessages, 5000);
});