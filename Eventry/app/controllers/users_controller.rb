class UsersController < ApiController
  before_action :require_login, except: [:create]

  def index
   render json: { user: User.all}
  end

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_events = Event.where(user_id: user.id)
    render json: { user: { username: user.username, firstname: user.firstname, lastname: user.lastname }, events: user_events }
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :firstname, :lastname)
  end
end


# referenced react-reails-monsters inclass lecture
