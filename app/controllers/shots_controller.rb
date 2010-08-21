class ShotsController < ApplicationController
  def new
    @board = Board.find(params[:board_id])
    @shot = Shot.new
  end
  
  def create
    @board = Board.find(params[:board_id])
    @shot = Shot.new(params[:shot])
    @shot.board = @board
    remote = Remote::Shot.find(@shot.remote_id)
    @shot.title = remote.title
    @shot.url = remote.url
    @shot.image_url = remote.image_url
    @shot.width = remote.width
    @shot.height = remote.height
    @shot.top = 100
    @shot.left = 100
    @shot.save
    
    redirect_to @board
  end
  
  def update
    @board = Board.find(params[:board_id])
    @shot = @board.shots.find(params[:id])
    @shot.update_attributes(params[:shot])
    respond_to do |wants|
      wants.html { redirect_to @board }
      wants.json { render :json => {:success => true} }
    end
  end
  
  def show
    
  end
end