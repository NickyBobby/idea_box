function deleteIdea(ideaId) {
  $.ajax({
    type: 'DELETE',
    url: '/api/v1/ideas/' + ideaId,
    success: function() {
      $('#' + ideaId).remove();
    }
  });
}
