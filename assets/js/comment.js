var NewCommentForm = React.createClass({
  getInitialState: function() {
    return {
      contentInput: "",
      authorInput: ""
    }
  },
  handleContentInputChange: function(e) {
    e.preventDefault();
    this.setState({
      contentInput: e.target.value,
      authorInput: this.state.authorInput
    });
  },
  handleAuthorInputChange: function(e) {
    e.preventDefault();
    this.setState({
      contentInput: this.state.contentInput,
      authorInput: e.target.value
    });
  },
  handleClick: function(e) {
    e.preventDefault();
    var author = this.state.authorInput == '' ? 'Anonymous Commenter' : this.state.authorInput;
    if (this.state.contentInput != '') {
      this.props.addComment(this.state.contentInput, author);
      this.setState({contentInput: '', authorInput: ''});
    }
    
  },
  render: function() {
    return (
      <div class="row">
        <form className="new-comment-form col-md-12 col-centered">
          <div class="form-group">
            <textarea rows="4" placeholder="Join the discussion..." className="form-control large-input" value={this.state.contentInput} onChange={this.handleContentInputChange}></textarea>
          </div>
          <div className="form-group">
            <label for="authorInput"></label>
            <input placeholder="Name" type="text" id="authorInput" className="form-control" value={this.state.authorInput} onChange={this.handleAuthorInputChange} />
          </div>
          <button className="btn btn-primary submit-comment" onClick={this.handleClick}>Submit</button>
        </form>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="comment col-md-12 col-centered">
          <span className="comment-author">{this.props.author}: </span>
          <br/>
          <span className="comment-content">{this.props.content}</span>   
        </div>
      </div>
    );
  }
});

var CommentThread = React.createClass({
  getInitialState: function() {
    return ({
      comments: [
        {
          content: 'Crow\'s nest list dance the hempen jig parley aft clap of thunder gaff doubloon fluke starboard. Jolly boat galleon chase guns gangplank execution dock interloper pressgang flogging bounty no prey, no pay. Prow landlubber or just lubber avast cable skysail bilge lanyard interloper Gold Road nipperkin.',
          author: 'Black Beard'
        },
        {
          content: 'Yellow Jack bring a spring upon her cable weigh anchor heave to parley no prey, no pay heave down snow hulk topsail. Measured fer yer chains Privateer capstan aft black jack hands Spanish Main bowsprit starboard gun. Topsail Shiver me timbers take a caulk execution dock hands scallywag lookout gabion bilge square-rigged.',
          author: 'Barnacle Boots'
        }
      ]
    });
  },
  addComment: function(content, author) {
    this.state.comments.push({content: content, author: author});
    this.setState({comments: this.state.comments});
  },
  render: function() {
    var comments = this.state.comments.map(function iterator (comment) {
        return (<Comment content={comment['content']} author={comment['author']}/>);
    }, this);
    return (
      <div className="col-md-12 col-centered comment-thread">
        <div className="col-md-12 col-centered header"><span>Comments</span></div>
        <ul className="col-md-12 col-centered">{comments}</ul>
        <NewCommentForm className="col-md-12 col-entered" addComment={this.addComment}/>
      </div>    
    );
  }
});

ReactDOM.render(
  <CommentThread />,
  document.getElementById('main')
);