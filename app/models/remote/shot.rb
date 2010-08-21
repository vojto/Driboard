module Remote
  class Shot < ActiveResource::Base
    self.site = "http://api.dribbble.com/"
    self.element_name = "shot"
    self.format = :json
  end
end