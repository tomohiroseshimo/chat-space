$(function(){
  function builduser(data){
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${data.name}</p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
    return html;
  }


  $('.chat-group-form__field--right').on('keyup', function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(usersdata){
      usersdata.forEach(function(userdata){
      var html = builduser(userdata)
      $('#user-search-result').append(html);
    })
  })
    .fail(function(){
      alert('error');
    })
  });
});