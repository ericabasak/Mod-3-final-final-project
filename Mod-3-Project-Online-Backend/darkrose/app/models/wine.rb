class Wine < ApplicationRecord
  has_many :pairings
  has_many :chocolates, through: :pairings
end
