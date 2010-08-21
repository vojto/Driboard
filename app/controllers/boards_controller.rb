class BoardsController < ApplicationController
  def index
    @board = Board.find_or_create_by(:name => "Test Board")
    redirect_to @board
  end
  
  def show
    @board = Board.find(params[:id])
    @shots = @board.shots
    
    respond_to do |wants|
      wants.html
      wants.json { 
        render :json => @shots.map { |shot|
          shot.attributes.merge({:path => board_shot_path(@board, shot)})
        }.to_json
      }
    end
  end
end