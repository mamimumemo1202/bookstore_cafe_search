class TestMailer < ApplicationMailer
  def test_email
    mail(from: "Acme <onboarding@resend.dev>", to: [ "delivered@resend.dev" ], subject: "hello world")
  end
end
