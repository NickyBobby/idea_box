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
    var parentDiv = $(this).parent();
    editTextsFields(parentDiv);
  });

  $('.all-ideas').delegate('.update-idea', 'click', function() {
    var ideaId = $(this).parent().attr('id');
    var newTitle = $(this).parent().children('#title').val();
    var newBody  = $(this).parent().children('#body').val();
    updateIdea(ideaId, newTitle, newBody);
    clearForm(this);
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
         "<button class='edit-idea'>Edit Idea</button>" +
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

function editTextsFields(parent) {
  var ideaId = parent.attr('id');
  var title  = parent.children('h2').text();
  var body   = parent.children('h3').text();

  clearIdeaInfo(parent);

  var inputTitle = "<input type='text' name='title' id='title' placeholder='" + title + "'><br>";
  var inputBody  = "<input type='text' name='body' id='body' placeholder='" + body + "'><br>";
  parent.prepend(inputBody);
  parent.prepend(inputTitle);
  parent.append("<button class='update-idea'>Update Idea</button>");
}

function clearIdeaInfo(parent) {
  parent.children('h2').remove();
  parent.children('h3').remove();
  parent.children('.edit-idea').remove();
}

function clearForm(here) {
  $(here).parent().remove();
}

function updateIdea(id, title, body) {
  var updateParams = { idea: { id: id, title: title, body: body } };
  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + id,
    data: updateParams,
    success: function() {
      var idea = { id: id, title: title, body: body };
      prependIdea(idea);
    }
  });
}
