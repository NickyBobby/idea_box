require 'rails_helper'

RSpec.describe Api::V1::IdeasController, type: :controller do
  describe "GET #index" do
    it "responds with a 200 status code" do
      get :index, format: :json

      expect(response.status).to eq 200
    end
  end

  describe "POST #create" do
    it "responds with a 201 status code" do
      post :create, format: :json, idea: { title: "Title",
                                           body:  "Body" }
      expect(response.status).to eq 201
    end
  end

  describe "DELETE #destroy" do
    it "responds with a 204 status code when idea is deleted" do
      idea = create(:idea)

      delete :destroy, id: idea.id, format: :json

      expect(response.status).to eq 204
    end
  end

  describe "PUT #update" do
    it "responds with a 204 status code when idea is updated" do
      idea = create(:idea)

      put :update, id: idea.id, idea: { title: "New Title" }, format: :json

      expect(response.status).to eq 204
    end
  end
end
