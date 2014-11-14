function tooltipHtml(n, d) {
  //console.log(d);
  return '<h4>' + n + '</h4><table>' +
    '<tr><td>Low</td><td>' + (d.low) + '</td></tr>' +
    '<tr><td>Average</td><td>' + (d.average) + '</td></tr>' +
    '<tr><td>High</td><td>' + (d.high) + '</td></tr>' +
    '</table>';
}

d3.csv('assets/csv/st_abv_gender_age.csv', function(res) {
  var dataByState = _.groupBy(res, 'state');
  //console.log(dataByState);

  _.each(dataByState, function(state, state_abv) {

    state.high = parseInt(_.max(state, function(s) {
      return parseInt(s.age);
    }).age);

    state.low = parseInt(_.min(state, function(s) {
      return parseInt(s.age);
    }).age);

    state.color = '#ccc';

    var sum = 0; var men = 0; var women = 0;

    _.each(state, function(s) {
      sum += parseInt(s.age);
      if(s.gender == 'M') { men += 1; }
      else                { women += 1; }
    });

    state.men = men; state.women = women;
    state.average = Math.round(sum / state.length);
    //console.log(state_abv, 'women', state.women,'men', state.men);
  });
 var freqData=[
  {age_range:'10-20',freq:{men:4786, women:1319}}
 ,{age_range:'20-30',freq:{men:1101, women:412}}
 ,{age_range:'30-40',freq:{men:932, women:2149}}
 ,{age_range:'40-50',freq:{men:832, women:1152}}
 ,{age_range:'50-60',freq:{men:4481, women:303}}
 ,{age_range:'60-70',freq:{men:1101, women:412}}
 ,{age_range:'70-80',freq:{men:932, women:2149}}
 ,{age_range:'80-90',freq:{men:832, women:1152}}
 ,{age_range:'90-100',freq:{men:4481, women:303}}
 ,{age_range:'100-110',freq:{men:4481, women:303}}
 ];

  uStates.draw('#statesvg', dataByState, tooltipHtml);
  dashboard('#dashboard',freqData);
});
