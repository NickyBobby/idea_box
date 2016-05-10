class Api::V1::IdeasController < Api::V1::BaseController
  respond_to :json

  def index
    respond_with Idea.newest_first
  end

  def create
    # binding.pry
    respond_with :api, :v1, Idea.create(idea_params), location: nil
  end

  private

    def idea_params
      params.require(:idea).permit(:title, :body, :quality)
    end
end
