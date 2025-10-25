class AddLikesCountToPairs < ActiveRecord::Migration[7.2]
  def change
    add_column :pairs, :likes_count, :integer, null: false, default: 0
  end
end
