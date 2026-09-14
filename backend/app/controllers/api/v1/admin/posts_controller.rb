class Api::V1::Admin::PostsController < Api::V1::Admin::BaseController
  include CoverUpload

  def index
    render json: Post.recent.map { |post| post.as_json(full: true) }
  end

  def show
    render json: Post.find(params[:id]).as_json(full: true)
  end

  def create
    post = Post.new(post_params)
    attach_cover(post)
    post.save!
    render json: post.as_json(full: true), status: :created
  end

  def update
    post = Post.find(params[:id])
    post.assign_attributes(post_params)
    attach_cover(post)
    post.save!
    render json: post.as_json(full: true)
  end

  def destroy
    Post.find(params[:id]).destroy!
    head :no_content
  end

  private

  def post_params
    permitted = params.permit(
      :title, :slug, :excerpt, :body, :destination, :cover_url,
      :published, :featured, :published_at
    )
    if permitted[:published] && permitted[:published_at].blank?
      permitted[:published_at] = Time.current
    end
    permitted
  end
end
