$(function(){
  function builduser(data){
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${data.name}</p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${data.id} data-user-name=${data.name}>追加</div>
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
   function adduser(user_name, user_id){
     var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                   <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                 </div>`
     return html;
   }
  $('#user-search-result').on('click', '.chat-group-user__btn--add',function(){
    $(this).parent().remove();
    var user_name = $(this).data('user-name'); 
    var user_id = $(this).data('user-id');
    var html = adduser(user_name, user_id);
    $('#user-group-add').append(html);
  });
  $('#user-group-add').on('click', '.chat-group-user__btn--remove',function(){
    $(this).parent().remove();
  });
});