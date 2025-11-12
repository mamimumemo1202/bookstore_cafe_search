# -*- encoding: utf-8 -*-
# stub: resend 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "resend".freeze
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Derich Pacheco".freeze]
  s.date = "2025-10-31"
  s.email = "carlosderich@gmail.com".freeze
  s.homepage = "https://github.com/resend/resend-ruby".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.6".freeze)
  s.rubygems_version = "3.4.19".freeze
  s.summary = "The Ruby and Rails SDK for resend.com".freeze

  s.installed_by_version = "3.4.19" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<httparty>.freeze, [">= 0.21.0"])
  s.add_development_dependency(%q<rails>.freeze, [">= 0"])
end
