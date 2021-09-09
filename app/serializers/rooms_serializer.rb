class RoomsSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :messages, serializer: MessagesSerializer
end
