class Api::V1::Overrides::RegistrationsController < DeviseTokenAuth::RegistrationsController
  wrap_parameters false

  def update
    uid = request.headers['uid'].presence || params[:uid]

    unless uid.present?
      render json: { errors: ['UID が見つかりません'] }, status: :unauthorized and return
    end

    user = resource || resource_class.find_by(uid: uid)
    unless user.present?
      render json: { errors: ['認証エラー（再ログインしてください）'] }, status: :unauthorized and return
    end

    unless params[:current_password].present? && user.valid_password?(params[:current_password])
      render json: { errors: ['現在のパスワードが違います'] }, status: :unprocessable_entity and return
    end

    user.password              = params[:password]
    user.password_confirmation = params[:password_confirmation]

    if user.save
      @resource = user

      #トークンを返す。client を維持できるなら同じ client で発行
      client = request.headers['client']
      response.headers.merge!(client.present? ? user.create_new_auth_token(client) : user.create_new_auth_token)

      render_update_success
    else
      render_update_error
    end
  end
end
