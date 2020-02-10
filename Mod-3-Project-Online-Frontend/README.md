# Wine and Chocolate Pairing!

Welcome to Darkrose - A Wine and Chocolate Pairing App!
Hosting a dinner party? Need a quick wine and chocolate pairing idea?
Simply navigate to the wine OR chocolate toggle bar. Choose from one of the two, and you will see a drop down box which will give you a list of either wines or chocolates. Once you have choose one, you'll see a pairing text box appear with the perfect food item to pair. Don't see something, create your own pairing by selecting the "Create new pair" button. 

## Domain Model - 
-- Many to many relationship or ahas_many through relationship. A Wine has many Chocolates through a Pairing. Pairing belongs to both Wine and Chocolate. A Chocolate has many Wines through Pairing. 

### Wine - 
      -- Name
      -- Year
      -- Id

### Chocolate - 
      -- Name
      -- Cocoa percentage
      -- Fair trade
      -- Id
  
### Pairing - 
      -- Wine_id
      -- Chocolate_id


## User Cases
Choose from a either wine or chocolate
View wines from drop down box
View chocolates from drop down box
Create a pairing of both a wine and chocolate OR a chocolate with a wine
Can like a pairing
Delete a pairing


# CRUD ()
### CREATE
      -- Create new wine and chocolate pairing 
    
### READ
      -- Browse wines and chocolates

### UPDATE
      -- Like a wine and chocolate pairing

### DELETE
      -- Remove a wine and chocolate pairing
     

## STRETCH GOALS
      -- Create a login
      -- Show favorite pairings
      -- Use API to obtain wines and chocolate
  

## INSTRUCTIONS
      
      -- To run the application, enter your terminal and enter ONLINE-Mod-3-online-project into the command line
      -- There is both a frontend and backend folder within the ONLINE-Mod-3-online-project. The backend has a darkrose file which
      will need to be opend to access backend.
      -- To access Darkrose, cd darkrose and code .
     
