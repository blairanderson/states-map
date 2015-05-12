function find(array, closure) {
  for (var n = 0; n < array.length; n++) {
    if (closure(array[n])) {
      return array[n];
    }
  }

  return null;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


var updateURL = debounce(function(obj, title, url) {
  return history.pushState(obj, title, url);
}, 100);


$(function() {
  var legend = {
      "medical": "<span class='med'>Medical</span> marijuana legalized",
      "none": "No laws legalizing marijuana",
      "recreational": "<span class='rec'>Recreational</span> marijuana legalized"
    },
    currentData = {state: {name: null}},
    data = {}, availableStates = [],
    $title = $("#title-state"),
    $titleText = $('#title-text'),
    $subtitle = $('.subtitle'),
    $titleSearch = $('input#state_name'),
    message, found, state;

  window.stateData.forEach(function(state) {
    if (state.status) {
      state.fillKey = state.status
    }
    data[state.abbreviation] = state;
    availableStates.push(state.name);
  });

  Object.observe(currentData, function(changes) {
    // This asynchronous callback runs
    changes.forEach(function(change) {
      if (change.name == "state") {
        state = change.object.state;
        $titleText.text("Is Recreational Weed Legal in");
        $title.text(state.name + '?');
        $titleSearch.val(state.name);

        if (state.status) {
          message = legend[state.status];
        } else {
          message = legend['none'];
        }
        $subtitle.html(message + " in " + state.name + "!");
      }
    });
  });

  var weedmaps = new Datamap({
    scope: 'usa',
    element: document.getElementById('map_element'),
    geographyConfig: {
      highlightBorderColor: '#ffffff',
      popupTemplate: function(geography, data) {
        if (currentData.state.name != data.name) {
          currentData.state = data;
          currentData.geography = geography;
        }
      },
      highlightBorderWidth: 5
    },

    fills: {
      'medical': "#3D9970",
      'recreational': '#01FF70',
      'defaultFill': '#DDDDDD'
    },
    data: data
  });
  weedmaps.labels();

  // select the target node
  $titleSearch.on('keyup', function(e) {
    found = find(states, function(state) {
      return state.name === this.value;
    }.bind(this));

    if (found) {
      return currentData.state = found;
    }
  });


  $('path.datamaps-subunit').on('click', function(e) {
    var state = JSON.parse(this.dataset.info);
    updateURL({}, state.name, '/states/' + state.slug);
  })
});


