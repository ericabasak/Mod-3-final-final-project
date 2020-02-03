# Wine and Chocolate Pairing!

Welcome to wine and chocolate pairing app!
Hosting a dinner party? Need a quick wine and chocolate pairing idea?
Simply navigate to the wine OR chocolate toggle bar. Choose from one of the two, and you will see a drop down box which will give you a list of either wines or chocolates. Once you have choose one, you'll see a pairing text box appear with the perfect food item to pair. Don't see something, create your own pairing by selecting the "Create new pair" button. 

## Domain Model - 
-- Many to many relationship. A Wine has many Chocolates through a Pairing. Pairing belongs to both Wine and Chocolate. A Chocolate has many Wines through Pairing. 

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
User can choose from a either wine or chocolate
User can view wines from drop down box
User can view chocolates from drop down box
User can then pair a wine with a chocolate OR a chocolate with a wine
User can create their own pairing
User can edit/remove pairing


# CRUD ()
### CREATE
      -- User can create new wine and chocolate pairing 
    
### READ
      -- User can browse wines and chocolates

### UPDATE
      -- 

### DELETE
      -- A customer should be able to remove their pairing
     

## STRETCH GOALS
      -- Create a login
      -- Show favorite pairings
      -- Use API to obtain wines and chocolate
  

## INSTRUCTIONS
      
      -- To run the application, enter your terminal and enter ONLINE-Mod-3-online-project into the command line
      -- There is both a frontend and backend folder within the ONLINE-Mod-3-online-project. Select desired file.
      -- To access Darkrose, cd darkrose and code .
     
