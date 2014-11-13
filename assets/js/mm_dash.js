function tooltipHtml(n, d) {
  return '<h4>' + n + '</h4><table>' +
    '<tr><td>Low</td><td>' + (d.low) + '</td></tr>' +
    '<tr><td>Average</td><td>' + (d.average) + '</td></tr>' +
    '<tr><td>High</td><td>' + (d.high) + '</td></tr>' +
    '</table>';
}

d3.csv('assets/csv/st_abv_gender_age.csv', function(res) {
  var dataByState = _.groupBy(res, 'state');

  _.each(dataByState, function(state) {

    state.high = parseInt(_.max(state, function(s) {
      return parseInt(s.age);
    }).age);

    state.low = parseInt(_.min(state, function(s) {
      return parseInt(s.age);
    }).age);

    state.color = '#ccc';

    var sum = 0;

    _.each(state, function(s) {
      sum += parseInt(s.age);
    });

    state.average = Math.round(sum / state.length);
  });

  //console.log(dataByState);
  uStates.draw('#statesvg', dataByState, tooltipHtml);

});