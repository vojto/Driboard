class Board
  include Mongoid::Document
  
  field :name
  
  embeds_many :shots
end