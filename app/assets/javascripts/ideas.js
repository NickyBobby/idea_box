$(document).ready(function() {
  getAllIdeas();

  $("#create-idea").click(function() {
    createIdea();
  });
});

function createIdea() {
  var ideaParams = { idea: { title: $('#title').val(), body: $('#body').val() } };
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
  console.log("something?");
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
  return "<div class='idea' id='idea-" + idea.id + "'>" +
         "<h2>" + idea.title + "</h2>" +
         "<h3>" + idea.body + "</h3>" +
         "</div>";
}

function prependIdea(idea) {
  $('.all-ideas').prepend(ideaInfo(idea));
}

function clearTextFields() {
  $('#title').val('');
  $('#body').val('');
}
