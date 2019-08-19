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
   function adduser(user_name,user_id){
     var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                   <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                 </div>`
     return html;
   }
  $('#user-search-result').on('click', '.chat-group-user__btn--add',function(){
    var user_name = $(this).data('name');
    var user_id = $(this).data('id');
    var html = adduser(user_name, user_id)
    $('.chat-group-user').append(html)
  });
});