class StatesController < ApplicationController
  def index
    if params[:state] && params[:state][:name] && state = State.find(params[:state][:name])
      redirect_to state_path(id: state.slug) and return
    end
    @states = State.all
  end

  def show
    @state = State.find(params[:id])
    if  !@state
      redirect_to root_path and return
    end
  end

  def findme
  end
end
