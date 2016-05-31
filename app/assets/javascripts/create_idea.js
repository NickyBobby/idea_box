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

function clearTextFields() {
   $('#title').val('');
   $('#body').val('');
 }
 
 function prependIdea(idea) {
   $('.all-ideas').prepend(ideaInfo(idea));
 }
