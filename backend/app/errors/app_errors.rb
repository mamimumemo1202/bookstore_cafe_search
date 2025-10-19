module AppErrors
  class DomainError < StandardError; end
  class BadRequest < StandardError; end
  class Forbidden   < StandardError; end
  class Unauthorized < StandardError; end
end
