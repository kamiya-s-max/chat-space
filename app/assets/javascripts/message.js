$(function(){
  function buildHTML(message) {
    function image() {
      message.image != null ? `<img src=${message.image} class="lower-message__image"></img>`:''
    };
    var html = `<div class="message">
                  <p class="body--title">${message.user_name}</a>
                  <div class="body--message">
                    ${message.date}
                  </div>
                  <p class="body--text">${message.content}</p>
                  ${image()}
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
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
      console.log(data);
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.input-box__btn').attr('disabled',false);
      $('.input-box__text').val('');
      $('#new_message')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  });
});