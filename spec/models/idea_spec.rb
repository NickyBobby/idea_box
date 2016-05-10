require 'rails_helper'

RSpec.describe Idea, type: :model do
  describe "Initial state" do
    it "can create idea with correct parameters" do
      idea = create(:idea)

      expect(idea.title).to   eq "This is a title"
      expect(idea.body).to    eq "This is a body"
      expect(idea.quality).to eq "swill"
    end

    it "the quality attribute will default to 'swill'" do
      idea = Idea.create(title: "Hi", body: "Oh hey")

      expect(idea.quality).to eq "swill"
    end

    it "an idea needs to have a title" do
      idea = Idea.create(body: "A body")

      expect(Idea.count).to eq 0
    end

    it "an idea needs to have a body" do
      idea = Idea.create(title: "A title")

      expect(Idea.count).to eq 0
    end
  end

  describe ".newest_first" do
    it "returns ideas withe newest one first" do
      idea_a = Idea.create(title: "TitleA",
                           body: "BodyA",
                           created_at: Date.new(2015, 1, 1))
      idea_b = Idea.create(title: "TitleB",
                           body: "BodyB",
                           created_at: Date.new(2016, 1, 1))
      ideas = Idea.newest_first

      expect(ideas.first).to eq idea_b
      expect(ideas.last).to  eq idea_a
    end
  end
end
