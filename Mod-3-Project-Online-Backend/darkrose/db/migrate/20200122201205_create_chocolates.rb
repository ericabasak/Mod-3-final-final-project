class CreateChocolates < ActiveRecord::Migration[6.0]
  def change
    create_table :chocolates do |t|
      t.string :name
      t.integer :cocoaPercentage
      t.boolean :fairTrade

      t.timestamps
    end
  end
end
