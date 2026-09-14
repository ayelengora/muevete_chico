class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.published.recent
    render json: posts.map { |post| post.as_json }
  end

  def show
    post = Post.published.find_by!(slug: params[:id])
    render json: post.as_json(full: true)
  end
end
