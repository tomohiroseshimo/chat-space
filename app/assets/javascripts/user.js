$(function(){
  function builduser(data){
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${data.name}</p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
    return html;
  }


  $('#chat-group-form__field--right').on('keyup', function(e){
    e.preventDefault();
    var input = $.trim($(this).val())
    $.ajax({
      url: '/users',
      type: 'GET',
      data: ('keyword=' + input),
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(usersdata){
      var html = builduser(usersdata)
      $('.chat-group-form__feild--right').append(html);
    })
    .fail(function(){
      alert('error');
    })
  });
});