f = file('st_abv_gender_age.csv')

states = {}
for line in f.readlines():
    splits = line.split(',')
    state_abv = splits[0]
    gender = splits[1]
    age = int(splits[2])
    if states.__contains__(state_abv):  states[state_abv].append(age)
    else:   states[state_abv] = [age]
f.close()

for state_abv, ages in states.iteritems():
    print state_abv, max(ages), min(ages)
