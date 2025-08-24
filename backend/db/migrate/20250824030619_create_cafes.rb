class CreateCafes < ActiveRecord::Migration[7.2]
  def change
    create_table :cafes do |t|
      t.string :place_id 
      t.string :name
      t.string :formatted_address
      t.decimal :lat
      t.decimal :lng
      t.integer :likes_count, null: false, default: 0

      t.timestamps
    end

      add_index :cafes, :place_id, unique:true
  end
end
