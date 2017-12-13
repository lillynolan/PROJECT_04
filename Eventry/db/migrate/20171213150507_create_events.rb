class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.string :url
      t.date :date
      t.time :localtime
      t.string :city
      t.string :state
      t.string :stateCode
      t.string :country
      t.string :venue
      t.string :address
      t.string :classification
      t.string :genre
      t.belongs_to :user

      t.timestamps
    end
  end
end
