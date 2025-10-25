class ApplicationController < ActionController::API
    include Devise::Controllers::Helpers
    include DeviseTokenAuth::Concerns::SetUserByToken
end
