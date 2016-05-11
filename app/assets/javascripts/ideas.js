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
    var newQuality  = $(this).parent().children('#quality').text();
    updateIdea(ideaId, newTitle, newBody, newQuality);
    clearForm(this);
  });

  $('.all-ideas').delegate('#thumbs-up', 'click', function() {
    var quality = $(this).parent().children('p').text();
    var id  = $(this).parent().attr('id');
    thumbsUp(id, quality, this);
  });

  $('.all-ideas').delegate('#thumbs-down', 'click', function() {
    var quality = $(this).parent().children('p').text();
    var id  = $(this).parent().attr('id');
    thumbsDown(id, quality, this);
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
         "<h2 contentEditable=true>" + idea.title + "</h2>" +
         "<h3 contentEditable=true>" + idea.body  + "</h3>" +
         "<p id='quality' class='bold italic'>" + idea.quality + "</p>" +
         "<button type='button' id='thumbs-up' class='btn btn-default' aria-label='Right Align'>" +
         "<span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span></button>" +
         "<button type='button' id='thumbs-down' class='btn btn-default' aria-label='Right Align'>" +
         "<span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span></button><br>" +
         "<button class='edit-idea btn btn-primary'>Edit Idea</button>" +
         "<button class='delete-idea btn btn-danger'>Delete Idea</button>";
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
  parent.append("<button class='update-idea btn btn-success'>Update Idea</button>");
}

function clearIdeaInfo(parent) {
  parent.children('h2').remove();
  parent.children('h3').remove();
  parent.children('.edit-idea').remove();
}

function clearForm(here) {
  $(here).parent().remove();
}

function updateIdea(id, title, body, quality) {
  var updateParams = { idea: { id: id, title: title, body: body, quality: quality } };
  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + id,
    data: updateParams,
    success: function() {
      var idea = { id: id, title: title, body: body, quality: quality };
      prependIdea(idea);
    }
  });
}

function thumbsUp(id, quality, here) {
  var newQuality = { idea: { quality: qualities.up[quality] } };
  $.ajax({
    type: 'PUT',
    url:  '/api/v1/ideas/' + id,
    data: newQuality,
    success: function() {
      updateQuality(newQuality, here);
    }
  });
}

function thumbsDown(id, quality, here) {
  var newQuality = { idea: { quality: qualities.down[quality] } };
  $.ajax({
    type: 'PUT',
    url:  '/api/v1/ideas/' + id,
    data: newQuality,
    success: function() {
      updateQuality(newQuality, here);
    }
  });
}

function updateQuality(quality, here) {
  $(here).parent().children('p').text(quality.idea.quality);
}

var qualities = {
  'up': {
    'swill':     'plausible',
    'plausible': 'genius',
    'genius':    'genius'
  },
  'down': {
    'swill':     'swill',
    'plausible': 'swill',
    'genius':    'plausible'
  }
};
