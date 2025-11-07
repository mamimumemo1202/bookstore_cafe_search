class Api::V1::Overrides::ConfirmationsController < DeviseTokenAuth::ConfirmationsController

    ALLOWED_REDIRECT_HOSTS = [(URI.parse(ENV["FRONTEND_BASE_URL"]).host rescue nil)].compact.freeze

    def show
    super do
      uri = URI.parse(@redirect_url) rescue nil
      if uri && ALLOWED_REDIRECT_HOSTS.include?(uri.host)
        return redirect_to(@redirect_url, allow_other_host: true)
      end
      raise AppErrors::BadRequest, "not include valid URL"
    end
  end
end
