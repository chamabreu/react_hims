# H's Inventory Management System - HIMS

## Frontend toDos:

### Global
- rename paths / urls
- 

### .../store
- a mask to store a new product

### .../search
- a mask to search for a product
- searchstring or dropdown
- with direct link to .../:field


### .../lager
- ~~overview over 3 whole shelfs~~
  - ~~named A B C~~
- ~~each shelf has 4 subracks - which routes to /:rack~~
  - ~~a rack is named *(shelf + depthrange)* like: A1-3 or B7-9~~


### .../lager/:rack
- example route: /lager/C4-6
- a field shows if its empty or not
- a field shows a picture of content
- left and right arrows next to the shelf to navigate to previous/next rack
- ~~show a shelf frontside with a 3x5 grid~~
  - ~~a cell is called field and is named *(shelf + layer + depth)* like: Aa2 or Bd5~~
- ~~a field shows its fieldname~~
- ~~each field routes to a /:field~~

### .../lager/:rack/:field
- example route: /lager/C4-6/Ce5
- ~~shows a image~~
- ~~shows a palet-name (the content of the field)~~
- ~~shows the stock number~~
- ~~button to store~~
- ~~button to take~~
- ~~button to move~~


## Backend toDos:
- create a datastructure for mongodb
- graphql or rest
- image storage