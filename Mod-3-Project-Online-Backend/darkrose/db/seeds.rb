# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Wine.destroy_all;
Chocolate.destroy_all;

10.times do

  Wine.create({
      name: Faker::Beer.name,
      year: Faker::Number.within(range: 1960..1999)
  });

  Chocolate.create({
      name: Faker::Dessert.variety,
      cocoaPercentage: Faker::Number.number(digits: 2),
      fairTrade: Faker::Boolean.boolean
  });

end


# 5.times do
#   Chocolate.create({
#     name: Faker::Dessert.name
#     cocoaPercentage: Faker::Number.number(digits: 2),
#     fairTrade: Faker::Boolean.boolean
#   })
# end