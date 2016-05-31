$(document).ready(function() {
  getAllIdeas();

  $('#create-idea').click(function() {
    createIdea();
  });

  $('.all-ideas').delegate('.delete-idea', 'click', function() {
    var ideaId = $(this).parent().attr('id');
    deleteIdea(ideaId);
  });

  $('.all-ideas').delegate('.content', 'click', function() {
    var ideaId = $(this).parent().attr('id');

    $(this).keypress(function(e) {
      var updateParams = getUpdate(this);
      if (e.which === 13) {
        e.preventDefault();
        updateAttribute(ideaId, updateParams);
      }
    });

    $(this).focusout(function() {
      var updateParams = getUpdate(this);
      updateAttribute(ideaId, updateParams);
    });
  });

  $('.all-ideas').delegate('#thumbs-up', 'click', function() {
    var quality = $(this).parent().children('p').text();
    var id  = $(this).parent().attr('id');
    thumbsUpOrThumbsDown(id, quality, this, 'up');
  });

  $('.all-ideas').delegate('#thumbs-down', 'click', function() {
    var quality = $(this).parent().children('p').text();
    var id  = $(this).parent().attr('id');
    thumbsUpOrThumbsDown(id, quality, this, 'down');
  });
});
