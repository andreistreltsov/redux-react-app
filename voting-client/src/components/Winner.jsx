import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="winner">
      Winner is {this.props.winner}!
    </div>;
  }
});