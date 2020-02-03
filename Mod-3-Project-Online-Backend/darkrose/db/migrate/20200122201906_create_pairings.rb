class CreatePairings < ActiveRecord::Migration[6.0]
  def change
    create_table :pairings do |t|
      t.integer :wine_id
      t.integer :chocolate_id

      t.timestamps
    end
  end
end
