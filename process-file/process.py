import json
import random

def rand_hex():
  chars = '0123456789ABCDEF'
  return '#'+''.join(random.sample(chars,6))

output = {
  "machines": {
    
  },
  "combinations": {

  },
  "ingredients": {

  },
  'staring_ingredients': []
}

with open('input.json') as file:
  data = json.load(file)

  for ingredient, actions in data['Ingredients'].items():
    output['ingredients'][ingredient] = {
      'color': rand_hex(),
      'name': ingredient
    }

    output['ingredients']['Junk'] = {
      'color': 'black',
      'name': "Junk"
    }

    for action, result in actions.items():
      if (result != None):
        if not action in output['machines']:
          output['machines'][action] = {
            'color': rand_hex(),
            'actions': {},
            'name': action
          }
        
        output['machines'][action]['actions'][ingredient] = result

  for key, value in data['Recipes'].items():
    output['combinations'][':'.join(value)] = key

  for value in data['StartingElements']:
    output['staring_ingredients'].append(value)
  
open('output.json', 'w').write(json.dumps(output, indent=2))
