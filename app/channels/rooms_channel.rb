class RoomsChannel < ApplicationCable::Channel

  def subscribed
    stream_from "rooms_#{params['room_id']}_channel"
  end

  def unsubscribed
    stop_all_streams
  end

  def send_message(data)
    message = current_user.messages.create(content: data['content'], room_id: data['room_id'])
    if message.errors.present?
      transmit({type: 'errors', data: message.errors.full_messages})
    else
      MessageBroadcastJob.perform_later(message.id)
    end
  end
end
