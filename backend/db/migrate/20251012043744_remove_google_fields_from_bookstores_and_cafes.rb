class RemoveGoogleFieldsFromBookstoresAndCafes < ActiveRecord::Migration[7.2]
  def change
    remove_column :bookstores, :name, :string
    remove_column :bookstores, :formatted_address, :string
    remove_column :bookstores, :lat, :decimal
    remove_column :bookstores, :lng, :decimal

    remove_column :cafes, :name, :string
    remove_column :cafes, :formatted_address, :string
    remove_column :cafes, :lat, :decimal
    remove_column :cafes, :lng, :decimal
  end
end
