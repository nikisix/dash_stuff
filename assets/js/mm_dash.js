function tooltipHtml(n, d) {
  //console.log(d);
  return '<h4>' + n + '</h4><table>' +
    '<tr><td>Low</td><td>' + (d.low) + '</td></tr>' +
    '<tr><td>Average</td><td>' + (d.average) + '</td></tr>' +
    '<tr><td>High</td><td>' + (d.high) + '</td></tr>' +
    '</table>';
}

d3.csv('assets/csv/st_abv_gender_age.csv', function(res){
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

    var sum = 0; var male = 0; var female = 0; var bucket = 0;
    var num_bars = 5;
    //high, low == oldest, youngest
    var bucket_size = Math.round((state.high - state.low) / num_bars);
    //TODO is this right?
    bucket_size = bucket_size == 0 ? 1 : bucket_size;
    var age_dist_male = {};
    var age_dist_female = {};
    _.each(state, function(s) {
        sum += parseInt(s.age);
        bucket = Math.round(s.age/bucket_size);
        if (s.gender == 'M') {
            age_dist_male[bucket] = bucket in age_dist_male ? age_dist_male[bucket] + 1 : 1;
        } else { //gender == 'F'
            age_dist_female[bucket] = bucket in age_dist_female ? age_dist_female[bucket] + 1 : 1;
        }
    });
    
    var freq_data = [];
    _.each(age_dist_male, function(value, key) {
        var lower = state.low + key * bucket_size;
        var upper = lower + bucket_size;
        var age_range = lower.toString() + '-' + upper.toString();
        var freq = {age_dist_male[key], age_dist_female[key]};
        freq_data.append([age_range, freq]);
    });

    state.male= male; state.female = female;
    state.average = Math.round(sum / state.length);
    state.freq_data = freq_data;
    state.age_dist_male = age_dist_male;
    state.age_dist_female = age_dist_female;
    //console.log(state_abv, 'female', state.female,'male', state.female);
  });
  var freqData=[
   {age_range:'10-20',freq:{male:4786, female:1319}}
  ,{age_range:'20-30',freq:{male:1101, female:412}}
  ,{age_range:'30-40',freq:{male:932,  female:2149}}
  ,{age_range:'40-50',freq:{male:832,  female:1152}}
  ,{age_range:'50-60',freq:{male:4481, female:303}}
  ,{age_range:'60-70',freq:{male:1101, female:412}}
  ,{age_range:'70-80',freq:{male:932,  female:2149}}
  ,{age_range:'80-90',freq:{male:832,  female:1152}}
  ,{age_range:'90-100',freq:{male:4481,female:303}}
  ,{age_range:'100-110',freq:{male:441,female:303}}
  ];

  uStates.draw('#statesvg', dataByState, tooltipHtml);
  dashboard('#dashboard', freq_data);
});
