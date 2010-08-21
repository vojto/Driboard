class Shot
  include Mongoid::Document

  field :remote_id
  field :title
  field :url
  field :image_url
  field :width
  field :height
  field :top
  field :left
  
  embedded_in :board, :inverse_of => :shots
end