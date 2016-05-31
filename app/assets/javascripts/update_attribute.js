function updateAttribute(id, params) {
  $.ajax({
    type: 'PUT',
    url:  '/api/v1/ideas/' + id,
    data: params,
    success: function() {
      fetchSingleIdea(id);
    }
  });
}

function fetchSingleIdea(id) {
  $.ajax({
    type: 'GET',
    url:  '/api/v1/ideas/' + id,
    success: function(idea) {
      $('#' + id).replaceWith(prependIdea(idea));
    }
  });
}

function getUpdate(that) {
  var updateParams = { idea: {} };
  var newText = $(that).text();
  var type = $(that).attr('id');
  updateParams.idea[type] = newText;
  return updateParams;
}
