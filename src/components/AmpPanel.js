import React from 'react';
import { Button, SyntaxHighlighter } from '@storybook/components';

import { STORY_CHANGED } from '@storybook/core-events';
import EVENTS from '../constants';

import getBase64ForAMPValidator from '../utils/getBase64ForAMPValidator'


class AmpPanel extends React.Component {

  state = {
    sourceCode: '',
  };

  componentDidMount() {
    const { api, channel } = this.props;

    api.on(STORY_CHANGED, this.onStoryChange);
    channel.on(EVENTS.AMP_HTML_RESULT, this.refreshData);
  }

  componentWillUnmount() {
    const { api, channel } = this.props;

    api.off(STORY_CHANGED, this.onStoryChange);
    channel.removeListener(EVENTS.AMP_HTML_RESULT, this.refreshData);
  }

  refreshData = data => {
    this.setState({
      sourceCode: data && data.ampHtml ? data.ampHtml : '',
    })
  }

  onStoryChange = id => {
    this.setState({ sourceCode: '' });
  };

  render() {
    // #htmlFormat=AMP4ADS
    // #htmlFormat=AMP4EMAIL
    // #htmlFormat=ACTIONS

    const { sourceCode } = this.state;
    const { active } = this.props;

    return active ? (
      <div style={{ padding: 15 }}>
        {sourceCode && (
          <Button
            small
            outline
            isLink
            target="_blank"
            href={`https://validator.ampproject.org/#doc=${getBase64ForAMPValidator(sourceCode)}`}
          >
            Validate
          </Button>
        )
        }
        <div className="storybook-amp-source-code" style={{ backgroundColor: '#f6f8fa', borderLeft: '1px solid #e5e5e5', marginTop: 15 }}>
          <SyntaxHighlighter
            language="html"
            showLineNumbers={false}
            format={true}
            copyable={true}
            padded
          >
            {sourceCode}
          </SyntaxHighlighter>
        </div>
      </div>
    ) : null;
  }
}

export default AmpPanel;