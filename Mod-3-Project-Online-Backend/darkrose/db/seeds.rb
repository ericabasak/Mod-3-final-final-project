# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Wine.destroy_all;
Chocolate.destroy_all;
Pairing.destroy_all;


  Wine.create([
    {
      "name": "Pinot Noir",
      "year": 1980
    },
    {
      "name": "Cabernet Sauvignon",
      "year": 1990
    },
    {
      "name": "Syrah",
      "year": 2000
    },
    {
      "name": "Zinfandel",
      "year": 2016
    },
    {
      "name": "Chardonnay",
      "year": 2016
    },
    {
      "name": "Sauvignon Blanc",
      "year": 1999
    },
    {
      "name": "Pinot Gris",
      "year": 1990
    },
    {
      "name": "Riesling",
      "year": 2014
    }
  ]
  );




  Chocolate.create([
    {
      "name": "Dark",
      "cocoaPercentage": 75,
      "fairTrade": true
    },
    {
      "name": "Milk",
      "cocoaPercentage": 10,
      "fairTrade": true
    },
    {
      "name": "White",
      "cocoaPercentage": 20,
      "fairTrade": true
    },
    {
      "name": "Bittersweet",
      "cocoaPercentage": 70,
      "fairTrade": true
    },
    {
      "name": "Ruby",
      "cocoaPercentage": 4,
      "fairTrade": true
    }
    ]
  );
