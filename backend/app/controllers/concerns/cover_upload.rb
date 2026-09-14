module CoverUpload
  def attach_cover(record)
    file = params[:cover]
    return unless file.respond_to?(:tempfile) || file.is_a?(ActionDispatch::Http::UploadedFile)

    record.cover.attach(file)
  end
end
