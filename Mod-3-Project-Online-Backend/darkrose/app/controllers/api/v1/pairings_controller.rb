
class Api::V1::PairingsController < ApplicationController
  def index
    pairings = Pairing.all
    wines = []
    chocolates = []
    ids = []
    pairings.each do |p|
      w1 = Wine.find_by(id: p.wine_id)
      c1 = Chocolate.find_by(id: p.chocolate_id)
      wines.push(w1)
      chocolates.push(c1)
      ids.push(p.id)
    end
    render json: {
      wines: wines,
      chocolates: chocolates,
      ids: ids
    }
  end

  def show
    pairing = Pairing.find(params[:id])
  end

  def create
    pairing_params()
    wine_name = params[:wine]
    print wine_name
    w1 = Wine.find_by(name: wine_name)
    print w1
    chocolate_name = params[:chocolate]
    print chocolate_name
    c1 = Chocolate.find_by(name: chocolate_name)
    p1 = Pairing.create(wine: w1, chocolate: c1)
    p1.save!
    print c1
    render json: p1
  end

  def edit
    pairing = Pairing.find(params[:id])
  end
  
  def destroy
    pairing = Pairing.find(params[:id])
    pairing.destroy
  end

  private

  def pairing_params
    params.permit(:wine, :chocolate)
  end

end
