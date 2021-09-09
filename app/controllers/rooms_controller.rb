class RoomsController < ApplicationController
  def index
  	@rooms = Room.all
  end

  def show
    @room = Room.find(params[:id])
    @json_object = RoomsSerializer.new(@room).as_json
  end

  def new
  	@room = Room.new
  end

  def create
  	@room = current_user.rooms.new(room_params)
  	if @room.save
      flash[:success] = 'Chat room sucessfully created.'
      redirect_to rooms_path
    else
      render 'new'
    end
  end

  private
  	def room_params
      params.require(:room).permit(:name)
  	end

end
