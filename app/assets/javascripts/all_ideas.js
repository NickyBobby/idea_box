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
         "<h2 id='title' class='content' contentEditable=true>" + idea.title + "</h2>" +
         "<h3 id='body' class='content' contentEditable=true>" + idea.body  + "</h3>" +
         "<p id='quality' class='bold italic'>" + idea.quality + "</p>" +
         "<button type='button' id='thumbs-up' class='btn btn-default' aria-label='Right Align'>" +
         "<span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span></button>" +
         "<button type='button' id='thumbs-down' class='btn btn-default' aria-label='Right Align'>" +
         "<span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span></button><br><br>" +
         "<button class='delete-idea btn btn-danger'>Delete Idea</button>" +
         "</div>";
}
