class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: props.room.messages,
      errors: [],
      onlineUsers: []
    };
  }

  // add the message to the list of messages
  newMessage(message) {
    const { messages } = this.state;
    const msgs = [...messages];
    if(msgs.length >= 15) {
      msgs.shift();
    }
    msgs.push(message);
    this.setState({messages: msgs, errors: []});
  }

  // Send the message to the room
  postMessage(event) {
    event.preventDefault();
    App.roomChannel.perform("send_message", { room_id: this.props.room.id, content: this.refs.content.value });
    this.refs.content.value = "";
  }

  addErrors(errors) {
    this.setState({errors: errors});
  }

  componentWillUnmount() {
    App.roomChannel.unsubscribe()
  }

  // Called when entering the chat room
  componentDidMount() {
    // Subscripe to the channel
    App.roomChannel = App.cable.subscriptions.create({
      channel: "RoomsChannel",
      room_id: this.props.room.id,
    }, {
      connected: () => {
      },
      disconnected: () => {
      },
      received: ({type, data}) => {
        switch (type) {
          case 'new_message':
            this.newMessage(data);
            break;
          case 'errors':
            this.addErrors(data);
            break;
          default:
            console.error({type, data});
        }
      }
    });
  }

  errorMessages() {
    const {errors} = this.state
    if (errors.length) {
      return errors.map((error, index) => <div key={index}> {error} </div>)
    }
  }

  // create the html for submitting the message
  form() {
    return (
      <div className="col-sm-12">
        {this.errorMessages()}
        <form className="form-inline" onSubmit={ this.postMessage.bind(this) }>
          <div className="form-group col-sm-11">
            <input style={{width: "100%"}} ref="content" type="text" className="form-control" placeholder="Text..." />
          </div>
          <div className="form-group col-sm-1">
            <button type="submit" className="btn btn-primary">send</button>
          </div>
        </form>
      </div>
    )
  }

  // Display the messages and form
  render() {
    const { messages } = this.state;

    return (
      <div className="row">
        <div className="col-sm-12">
          <MessageList messages={ messages } />
        </div>
        { this.form() }
      </div>
    )
  }
}
