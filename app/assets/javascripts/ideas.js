$(document).ready(function() {
  getAllIdeas();

  $('#create-idea').click(function() {
    createIdea();
  });

  $('.all-ideas').delegate('.delete-idea', 'click', function() {
    var ideaId = $(this).parent().attr('id');
    deleteIdea(ideaId);
  });

  $('.all-ideas').delegate('.edit-idea', 'click', function() {
    var ideaId = $(this).parent().attr('id');
    var title  = $(this).closest('h2').val();
    var body   = $(this).closest('h3').val();

    editTextsField(this, title, body);
  });

});

function createIdea() {
  var title = $('#title').val();
  var body = $('#body').val();
  var ideaParams = { idea: { title: title, body: body } };
  $.ajax({
    type: 'POST',
    url:  '/api/v1/ideas',
    data: ideaParams,
    success: function(idea) {
      prependIdea(idea);
      clearTextFields();
    },
    dataType: 'JSON'
  });
}

function getAllIdeas() {
  $.ajax({
    type: 'GET',
    url: '/api/v1/ideas',
    success: function(ideas) {
      showIdeasOnPage(ideas);
    }
  });
}

function showIdeasOnPage(ideas) {
  $.each(ideas, function(index, idea) {
    addIdea(idea);
  });
}

function addIdea(idea) {
  $('.all-ideas').append(ideaInfo(idea));
}

function ideaInfo(idea) {
  return "<div class='idea' id='" + idea.id + "'>" +
         "<h2>" + idea.title + "</h2>" +
         "<h3>" + idea.body + "</h3>" +
         "<button class='delete-idea'>Delete Idea</button>";
         "</div>";
}

function prependIdea(idea) {
  $('.all-ideas').prepend(ideaInfo(idea));
}

function clearTextFields() {
  $('#title').val('');
  $('#body').val('');
}

function deleteIdea(ideaId) {
  $.ajax({
    type: 'DELETE',
    url: '/api/v1/ideas/' + ideaId,
    success: function() {
      $('#' + ideaId).remove();
    }
  });
}
