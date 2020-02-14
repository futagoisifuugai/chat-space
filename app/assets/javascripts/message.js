$(function(){


  function buildHTML(message){
    if (message.image) {
      var html = 
      `
      <div class="messages">
      <div class="message">
      <div class="message__text-list">
      <div class="list__user-name">
         ${message.user_name}
      </div>
      <div class="user__time">
         ${message.created_at}
       </div>
       </div>
        <div class="user__message">
        <p class="lower-message__content">
          ${message.content}
        </p>
         </div>
       </div>
      </div>
        <img src=${message.image}>
     </div>`

     return html;
    }else {
      var html =
      `
      <div class="messages">
      <div class="message">
      <div class="message__text-list">
      <div class="list__user-name">
         ${message.user_name}
      </div>
      <div class="user__time">
         ${message.created_at}
       </div>
       </div>
        <div class="user__message">
        <p class="lower-message__content">
          ${message.content}
        </p>
         </div>
       </div>
      </div>
     </div>`
      return html;
    };
  }
  
  $('#new_message').on('submit', function(e){
   
      
    
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.submit__btn').prop('disabled', false);
    });
  });
});