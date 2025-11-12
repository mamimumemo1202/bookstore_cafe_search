# Ensure custom error modules are loaded in all environments
require Rails.root.join("app/errors/external_api_errors").to_s
require Rails.root.join("app/errors/app_errors").to_s
