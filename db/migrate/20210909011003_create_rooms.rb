class CreateRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :rooms do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.timestamps
    end
    
    add_index :rooms, :name, unique: true
  end
end
