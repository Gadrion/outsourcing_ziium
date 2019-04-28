import styled, { withTheme } from 'styled-components';

const Container = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`);

const ChannelContainer = withTheme(styled.div`
  display: flex;
  height: 16px;
  flex-direction: column;
`);

const SpanStyled = withTheme(styled.span`
  margin: 0px 20px;
  font-size: 12px;
  color: ${props => props.theme.colorSub8};
`);

const SpanDateTimeStyled = withTheme(styled.div`
  display: inline;
  font-size: 12px;
  color: ${props => props.theme.colorSub8};
  position: absolute;
  right: 20px;
`);

const SpanChannelStyled = withTheme(styled.span`
  display: flex;
  font-size: 12px;
  color: ${props => props.theme.colorSub8};
  position: absolute;
  right: 20px;
  Button {
    width : 24px;
    height: 16px;
    border-radius: 8px;
    margin: 0px 2px;
    font-size: 11px;
    padding: 0px 0px;
  }
`);

const SpanTitleStyled = withTheme(styled.span`
  margin: 0px 20px;
  font-size: 16px;
  color: ${props => props.theme.colorSub8};
`);

const PosSpanStyled = withTheme(styled.span`
  font-size: 12px;
  width: 276px;
  white-space: pre;
  font-family: GulimChe, sans-serif;
  color: ${props => props.theme.colorSub8};
`);

const HighlightSpanStyled = withTheme(styled.span`
  font-size: 12px;
  white-space: pre;
  background-color: yellow;
  font-family: GulimChe, sans-serif;
  color: ${props => props.theme.colorSub8};
`);

const ReceiptContainerStyled = withTheme(styled.div`
  margin: 0px 20px;
  display: inline-block;
  background-color: lightgray;
`);

export {
  Container,
  ChannelContainer,
  SpanStyled,
  SpanTitleStyled,
  SpanDateTimeStyled,
  PosSpanStyled,
  HighlightSpanStyled,
  SpanChannelStyled,
  ReceiptContainerStyled,
};
