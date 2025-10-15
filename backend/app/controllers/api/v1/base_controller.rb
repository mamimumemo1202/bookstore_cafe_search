class Api::BaseController < ApplicationController
  private 
  
  def render_error(code, message, status, details: nil)
      payload =  { error: { code:, message: } }
      payload[:error][:details] = details if details?

      render json: payload, status:
  end

  rescue_from ExternalAPI::BadRequest    { |e| render_error('bad_request',    e.message, :bad_request) }
  rescue_from ExternalAPI::AuthError     { |e| render_error('auth_error',     e.message, :forbidden) }
  rescue_from ExternalAPI::NotFound      { |e| render_error('not_found',      e.message, :not_found) }
  rescue_from ExternalAPI::RateLimited   { |e| render_error('rate_limited',   e.message, :too_many_requests) }
  rescue_from ExternalAPI::Timeout       { |e| render_error('timeout',        e.message.presence || 'upstream timeout', :service_unavailable) }
  rescue_from ExternalAPI::ServerError   { |e| render_error('upstream_error', e.message.presence || 'upstream server error', :bad_gateway) }
  rescue_from ExternalAPI::UpstreamError { |e| render_error('upstream_error', e.message.presence || 'upstream error', :bad_gateway) }

  rescue_from ActionController::ParameterMissing do |e|
    render_error('bad_request', e.message, :bad_request)
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    render_error('not_found', e.message, :not_found)
  end

  rescue_from ActiveRecord::RecordInvalid do |e|
    render_error('unprocessable', 'validation failed', :unprocessable_entity,
                 details: e.record.errors.full_messages)
  end

  rescue_from AppErrors::DomainError do |e|
    render_error('domain_error', e.message, :unprocessable_entity)
  end

  rescue_from AppErrors::Forbidden do |e|
    render_error('forbidden', e.message, :forbidden)
  end

  rescue_from JSON::ParserError do |e|
    render_error('bad_request', e.message, :bad_request)
  end

  rescue_from StandardError do |e|
    Rails.logger.error("[500] #{e.class}: #{e.message}")
    render_error('internal_error', 'internal server error', :internal_server_error)
  end

  rescue_from AppErrors::Unauthorized do |e|
    render_error('unauthorized', e.message, :unauthorized)
  end
  
end
