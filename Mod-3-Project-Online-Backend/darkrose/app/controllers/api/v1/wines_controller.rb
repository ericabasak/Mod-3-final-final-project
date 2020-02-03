class Api::V1::WinesController < ApplicationController
  def index
    wines = Wine.all
    render json: wines
  end

  def show
    id = params[:id]
    wine = Wine.find(id)
    render json: wine
  end
end
