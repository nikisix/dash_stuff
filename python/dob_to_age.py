#convert from yyyy-mm-dd to age
import datetime

#load state abrev
f1 = file('../assets/csv/state_abbreviations.csv')
f1.readline()
f1.readline()
state_abv = {}

for line in f1.readlines():
    splits = line.split(',')
    state_abv[splits[0].strip()] = splits[1].strip()

f1.close()


f = file('../assets/csv/state_gender_dob.csv')
f.readline()
f.readline() #burn first two header lines

for line in f.readlines():
    splits = line.split('|')
    state = splits[0]
    gender = splits[1]
    dob = splits[2]
    age = datetime.datetime.now().year - int(dob.split('-')[0])
    print state_abv[state.strip()]+','+ gender.strip()+','+ str(age)

f.close()
