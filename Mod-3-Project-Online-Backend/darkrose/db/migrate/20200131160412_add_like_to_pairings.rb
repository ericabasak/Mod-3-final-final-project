class AddLikeToPairings < ActiveRecord::Migration[6.0]
  def change
    add_column :pairings, :like, :integer
  end
end
