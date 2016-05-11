require 'rails_helper'

RSpec.describe IdeasController, type: :controller do
  describe "GET #index" do
    it "responds with a 200 status code" do
      get :index

      expect(response.status).to eq 200
    end
  end
end
