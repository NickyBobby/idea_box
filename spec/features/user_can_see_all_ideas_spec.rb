require 'spec_helper'

feature "visitor visits index", :js => true do
  scenario "they see all the ideas" do
    create_list(:idea, 5)

    visit '/'

    expect(page).to have_content("Idea Box 2.0")

    Idea.all.each do |idea|
      expect(page).to have_content idea.title
      expect(page).to have_content idea.body
      expect(page).to have_content idea.quality
    end

  end
end
