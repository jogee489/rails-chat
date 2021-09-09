class Message < ApplicationRecord
  belongs_to :user, inverse_of: :messages
  belongs_to :room, inverse_of: :messages
end
