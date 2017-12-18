class EventsController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    events = Event.all
    render json: { events: events }
  end

  def create
    event = Event.new(event_params)
    event.user_id = current_user.id
    if event.save
      render json: {
        message: 'ok',
        event: event,
      }
    else
      render json: {message: 'No event added'}
    end
  end

  def destroy
    Event.find(params[:id]).destroy!
  end

  private
  def event_params
    params.require(:event).permit(:name, :url, :date, :localtime, :city, :state, :stateCode,
      :country, :venue, :address, :classification, :genre)
  end

end
