class Api::V1::ChocolatesController < ApplicationController
  def index
    chocolates = Chocolate.all
    render json: chocolates
  end

  def show
    id = params[:id]
    chocolate = Chocolate.find(id)
    render json: chocolate
  end
end
