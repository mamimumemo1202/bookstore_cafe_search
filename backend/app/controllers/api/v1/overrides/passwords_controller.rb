class Api::V1::Overrides::PasswordsController < DeviseTokenAuth::PasswordsController

  ALLOWED_REDIRECT_HOSTS = [(URI.parse(ENV["FRONTEND_BASE_URL"]).host rescue nil)].compact.freeze

  def edit
    token = params[:reset_password_token]
    config = "default"

    target = "#{ENV['FRONTEND_BASE_URL']}/reset-password"

    uri = URI.parse(target) rescue nil
    Rails.logger.info("[PASSWORD_RESET] redirect_url=#{target}")

    if uri && ALLOWED_REDIRECT_HOSTS.include?(uri.host)

      redirect_to DeviseTokenAuth::Url.generate(target, {
        reset_password_token: token,
        config: config
      }), allow_other_host: true
    else
      raise AppErrors::BadRequest, "invalid request"
    end
  end
end
