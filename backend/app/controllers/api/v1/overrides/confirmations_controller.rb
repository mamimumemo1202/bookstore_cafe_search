class Api::V1::Overrides::ConfirmationsController < DeviseTokenAuth::ConfirmationsController

    ALLOWED_REDIRECT_HOSTS = [(URI.parse(ENV["FRONTEND_BASE_URL"]).host rescue nil)].compact.freeze

    def show
        
    super do
      target = "#{ENV['FRONTEND_BASE_URL']}/auth?verified=1"
      uri = URI.parse(target) rescue nil
      Rails.logger.info("[CONFIRM] redirect_url=#{target} env=#{ENV['FRONTEND_BASE_URL']}")
      if uri && ALLOWED_REDIRECT_HOSTS.include?(uri.host)
        return redirect_to(target, allow_other_host: true)
      end
      raise AppErrors::BadRequest, "not include valid URL"
    end
  end
end
