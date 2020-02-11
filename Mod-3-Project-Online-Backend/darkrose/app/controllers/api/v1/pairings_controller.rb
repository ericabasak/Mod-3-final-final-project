
class Api::V1::PairingsController < ApplicationController
  def index
    # print "index called"
    pairings = Pairing.all
    wines = []
    chocolates = []
    ids = []
    likes = []

      pairings.each do |p|
        w1 = Wine.find_by(id: p.wine_id)
        # print "AAAA ", p.wine_id
        c1 = Chocolate.find_by(id: p.chocolate_id)
        wines.push(w1)
        chocolates.push(c1)
        ids.push(p.id)
        likes.push(p.like)
      end
    render json: {
      wines: wines,
      chocolates: chocolates,
      ids: ids,
      likes: likes
    }
  end

  def show
    pairing = Pairing.find(params[:id])
  end

  def create
    pairing_params()
    wine_name = params[:wine]
    w1 = Wine.find_by(name: wine_name)
    chocolate_name = params[:chocolate]
    c1 = Chocolate.find_by(name: chocolate_name)
    p1 = Pairing.create(wine: w1, chocolate: c1)
    p1.save!
    render json: p1
  end

  def update
    pairing = Pairing.find(params[:id])
    if (pairing.like == nil) 
      pairing.like = 0  
    end
    pairing.like = pairing.like + 1
    pairing.save!
    render json: pairing
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
