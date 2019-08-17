$(function(){
  function buildData(data){
    var html = `<div class="message">
                <div class="upper-info">
                  <div class="upper-info__user">
                     ${data.name}
                  </div>
                 <div class="upper-info__date">
                   ${data.created_at}
                 </div>
               </div>
                <div class="message__text">
                  <p class="message__text__content">
                    ${data.content}
                  </p>
                  <img class="message__text__image" src=${data.image} alt="Test image">
                </div>
               </div>`
    return html;
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
      contentType: false,
    })
    .done(function(messagedata){
      var html = buildData(messagedata);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })
})