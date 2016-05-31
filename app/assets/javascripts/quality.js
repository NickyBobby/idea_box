function thumbsUpOrThumbsDown(id, quality, here, direction) {
  var newQuality = { idea: { quality: qualities[direction][quality] } };
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
