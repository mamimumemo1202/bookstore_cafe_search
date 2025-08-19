# frozen_string_literal: true

class User < ActiveRecord::Base
  before_validation :grant_name, on: :create

  validates :name, presence: true

  # Include default devise modules. Others available are:
  #:lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

 private

  def grant_name
    self.name = "読書家#{SecureRandom.alphanumeric(5).downcase}"
  end
end
