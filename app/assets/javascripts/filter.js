$(document).ready(function() {

  $('.search').on('keyup', function() {
    filterIdeas($(this).val());
  });

  $('#clear-search').on('click', function() {
    $('.search').val('');
    $('.search').trigger('keyup');
  });

});

function filterIdeas(str) {
  var ideas = $('.idea');

  $.each(ideas, function(index, idea) {
    var title = $(this).children('#title').text();
    var body = $(this).children('#body').text();

    var matchedUp = findMatchesInTitleOrBody(title, body, str);

    $(idea).toggle(matchedUp);
  });

  function findMatchesInTitleOrBody(title, body, str) {
    return including(title, str) || including(body, str);
  }

  function including(main, part) {
    return main.toLowerCase().indexOf(part.toLowerCase()) >= 0;
  }
}
