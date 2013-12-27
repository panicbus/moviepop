class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :search

      t.timestamps
    end
  end
end
