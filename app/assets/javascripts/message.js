$(function(){
  function buildHTML(message) {
    var image = (message.image) ? `<img src=${message.image} class="lower-message__image">`:'';
    var html = `<div class="message">
                  <div class="upper_message">
                    <p class="body--title">${message.user_name}</a>
                    <div class="body--message">
                      ${message.date}
                    </div>
                  <p class="body--text">${message.content}</p>
                    ${image}
                  </div>
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
});