host = ENV.fetch("APP_HOST", "127.0.0.1")
port = ENV.fetch("PORT", "43124")
protocol = ENV.fetch("APP_PROTOCOL", "http")

Rails.application.routes.default_url_options = {
  host: host,
  port: port,
  protocol: protocol
}

Rails.application.config.action_mailer.default_url_options = {
  host: host,
  port: port,
  protocol: protocol
}
