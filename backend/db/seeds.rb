

if Rails.env.development?
  user = User.find_or_create_by!(email: "dev@example.com") do |u|
    u.password = "password"
  end
   user.confirm unless user.confirmed?
end
