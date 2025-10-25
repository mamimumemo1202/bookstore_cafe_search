module ExternalApiErrors
  class Error < StandardError; end
  class BadRequest   < Error; end  # 400
  class AuthError    < Error; end  # 401/403
  class NotFound     < Error; end  # 404
  class RateLimited  < Error; end  # 429
  class Timeout      < Error; end  # 接続/読み取りタイムアウト
  class ServerError  < Error; end  # 5xx
  class UpstreamError < Error; end # 想定外
end
