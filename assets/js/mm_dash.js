function tooltipHtml(n, d) {
  return '<h4>' + n + '</h4><table>' +
    '<tr><td>Youngest</td><td>' + (d.youngest) + '</td></tr>' +
    '<tr><td>Average_Age</td><td>' + (d.average_age) + '</td></tr>' +
    '<tr><td>Oldest</td><td>' + (d.oldest) + '</td></tr>' +
    '</table>';
}

var outer_state = {};
var NUM_HIST_BARS = 5;

d3.csv('assets/csv/st_abv_gender_age.csv', function(res){
    var national = _.groupBy(res, 'state');
    national.males = 0;
    national.females = 0;
    national.oldest = 0;
    national.youngest = 100000;

    _.each(national, function(state, state_abv) {
        state.oldest = parseInt(_.max(state, function(s) {
            return parseInt(s.age);
        }).age);
        if (national.oldest < state.oldest) { national.oldest = state.oldest; }

        state.youngest = parseInt(_.min(state, function(s) {
            return parseInt(s.age);
        }).age);
        if (state.youngest < national.youngest) { national.youngest = state.youngest; }
    });

    var national_bucket_size = Math.round((national.oldest - national.youngest) / NUM_HIST_BARS);
    national_bucket_size = national_bucket_size == 0 ? 1 : national_bucket_size;
    national_age_dist_male = {};
    national_age_dist_female = {};
    national_age_dist_total = {};

  _.each(national, function(state, state_abv) { //every state in nation
    outer_state[state_abv] = {};
    state.color = '#ccc';

    var sum = 0; var bucket = 0;
    var state_bucket_size = Math.round((state.oldest - state.youngest) / NUM_HIST_BARS);
    var age_range = ''; var age_range_lower = 0; var age_range_upper = 0;
    //TODO is this right?
    state.males = 0;
    state.females = 0;
    state_bucket_size = state_bucket_size == 0 ? 1 : state_bucket_size;
    state.age_dist_male = {};
    state.age_dist_female = {};
    state.age_dist_total = {};

    _.each(state, function(s) { //every entry in state
        sum += parseInt(s.age);
        bucket = Math.floor(s.age/national_bucket_size);
        age_range_lower = bucket * national_bucket_size;
        age_range_upper = (bucket+1) * national_bucket_size;
        age_range = age_range_lower.toString() + '-' + age_range_upper.toString();
        if (s.gender == 'M') {
            national.males += 1;
            state.males    += 1; 
            state.age_dist_male[age_range]    = age_range in state.age_dist_male    ? state.age_dist_male[age_range] + 1 : 1;
            national_age_dist_male[age_range] = age_range in national_age_dist_male ? national_age_dist_male[age_range] + 1 : 1;
        } else { //gender == 'F'
            national.females += 1;
            state.females    += 1; 
            state.age_dist_female[age_range] = age_range in state.age_dist_female ? state.age_dist_female[age_range] + 1 : 1;
            national_age_dist_female[age_range] = age_range in national_age_dist_female ? national_age_dist_female[age_range] + 1 : 1;
        }
        state.age_dist_total[age_range] = age_range in state.age_dist_total ? state.age_dist_total[age_range] + 1 : 1;
        national_age_dist_total[age_range] = age_range in national_age_dist_total ? national_age_dist_total[age_range] + 1 : 1;
    });
    state.average_age = Math.round(sum/state.length);
  });
    national.age_dist_male = national_age_dist_male;    
    national.age_dist_female = national_age_dist_female;    
    national.age_dist_total = national_age_dist_total;    
    uStates.draw('#statesvg', national, tooltipHtml);
    dashboard('#dashboard', national);
});
