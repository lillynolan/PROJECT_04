class EventsController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    events = Event.all
    render json: { events: events }
  end

  private
  def event_params
    params.require(:event).permit(:name, :url, :date, :localtime, :city, :state, :stateCode,
      :country, :venue, :address, :classification, :genre)
  end

end
