class CreatePairs < ActiveRecord::Migration[7.2]
  def change
    create_table :pairs do |t|
      t.references :bookstore, null: false, foreign_key: true
      t.references :cafe, null: false, foreign_key: true


      t.timestamps
    end

      add_index :pairs, [:bookstore_id, :cafe_id], unique: true
      
  end
end
