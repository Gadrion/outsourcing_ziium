import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Button } from 'wisenet-ui/components/atoms';
import { TextResultContainer } from 'containers/organisms';
import {
  Container,
  ChannelContainer,
  SpanStyled,
  PosSpanStyled,
  SpanTitleStyled,
  SpanDateTimeStyled,
  SpanChannelStyled,
  HighlightSpanStyled,
  ReceiptContainerStyled,
} from './TextResultStyled';

const KeywordHighlight = props => {
  const { keyword } = props;
  let rest = props.text;

  for (let i = 0; i < keyword.length; i += 1) {
    const reg = new RegExp(keyword[i], 'gi');
    rest = rest.replace(reg, () => `${i}@@`);
  }
  const textData = rest.split('@@');
  const textLength = textData.length;
  const highlight = textData.map((tdata, i) => {
    if (textLength === i + 1) {
      return <PosSpanStyled key={`highlightLast-${(i + 1) * (i + 1)}`}>{tdata}</PosSpanStyled>;
    }
    return (
      <PosSpanStyled key={`highlightNormal-${(i + 1) * (i + 1)}`}>
        {tdata.slice(0, tdata.length - 1)}
        <HighlightSpanStyled key={`highlight-${(i + 1) * (i + 1)}`}>
          {props.keyword[Number(tdata.slice(tdata.length - 1, tdata.length))]}
        </HighlightSpanStyled>
      </PosSpanStyled>
    );
  });
  return highlight;
};

const TextResult = ({ selectEvent, deviceInfo, onChannelButtonClick }) => (
  <Container id="textResult">
    <div>
      <SpanTitleStyled>{deviceInfo && deviceInfo.DeviceName}</SpanTitleStyled>
      <SpanDateTimeStyled>{selectEvent.Date}</SpanDateTimeStyled>
    </div>
    <ChannelContainer>
      <SpanStyled>CH</SpanStyled>
      <SpanChannelStyled>
        {
        selectEvent.ChannelIDList && selectEvent.ChannelIDList.map(item => (
          <Button
            key={item}
            onClick={onChannelButtonClick}
          >
            {item}
          </Button>
        ))
        }
      </SpanChannelStyled>
    </ChannelContainer>
    <ReceiptContainerStyled>
      {(selectEvent.Result)
        && <KeywordHighlight text={selectEvent.TextData} keyword={selectEvent.KeywordsMatched} />}
    </ReceiptContainerStyled>
  </Container>
);

TextResult.propTypes = {
  deviceInfo: PropTypes.instanceOf(Object),
  selectEvent: PropTypes.shape({
    Result: PropTypes.number,
    DeviceID: PropTypes.number,
    Date: PropTypes.string,
    PlayTime: PropTypes.string,
    TextData: PropTypes.string,
  }).isRequired,
  onChannelButtonClick: PropTypes.func.isRequired,
};

TextResult.defaultProps = {
  deviceInfo: {},
};

export default withContainer(TextResultContainer, TextResult);
