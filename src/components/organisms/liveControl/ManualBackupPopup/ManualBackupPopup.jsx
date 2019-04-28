import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import { withContainer } from 'wisenet-ui/util/hoc';
// import { DatePickerWrapper } from 'wisenet-ui/components/organisms';
import {
  Container,
  Header,
  Body,
  Footer,
  LayoutSelect,
  TitleSpan,
  ButtonContainer,
  FooterButton,
  ButtonLabel,
  SubBody1,
  SubBody2,
  ChannelTable,
  MenuSpan,
  PathInput,
  MenuWrapper,
  FileTypeSelect,
  FileInput,
  PathButton,
  PasswordLabel,
  PasswordCheckbox,
  PasswordButton,
  TextDataCheckbox,
  TextDataLabel,
  PasswordInput,
  OptionWrapper,
  StatusLabel,
  StatusWrapper,
  StatusInput,
} from './ManualBackupPopupStyled';

// eslint-disable-next-line react/prefer-stateless-function
class ManualBackupPopup extends PureComponent {
  render() {
    return (
      <Container>
        <Header>
          <TitleSpan>Export</TitleSpan>
        </Header>
        <Body>
          <SubBody1>
            <LayoutSelect />
            <ChannelTable>Table</ChannelTable>
            <MenuWrapper
              // title={{ start: 'Start', end: 'End' }}
              // dateWrapperStyle={{
              //   display: 'flex',
              //   flexDirection: 'row',
              //   justifyContent: 'space-between',
              //   cursor: 'default',
              // }}
              // dateInputWrapperStyle={{
              //   border: '1px solid rgba(48,69,92,0.8)',
              //   width: 'auto',
              //   display: 'flex',
              //   flexDirection: 'row',
              // }}
            // eslint-disable-next-line react/jsx-closing-bracket-location
            >
              {'Date/Time Picker will be added here'}
            </MenuWrapper>
            <MenuWrapper>
              <MenuSpan>Path</MenuSpan>
              <PathInput type="text" value="" />
              <PathButton>
                <ButtonLabel>...</ButtonLabel>
              </PathButton>
            </MenuWrapper>
            <MenuWrapper>
              <MenuSpan>File Name</MenuSpan>
              <FileInput type="text" value="" />
              <FileTypeSelect />
            </MenuWrapper>
            <OptionWrapper>
              <PasswordCheckbox checked={false} id="backup_password_option" value="backup_password_option" />
              <PasswordLabel for="backup_password_option">Password</PasswordLabel>
              <PasswordInput type="text" value="" />
              <PasswordButton>
                <ButtonLabel>apply</ButtonLabel>
              </PasswordButton>
              <TextDataCheckbox checked={false} id="text_data_option" value="text_data_option" />
              <TextDataLabel for="text_data_option">Text Data</TextDataLabel>
            </OptionWrapper>
          </SubBody1>
          <SubBody2>
            <StatusWrapper>
              <StatusLabel>Min Margin Space</StatusLabel>
              <StatusInput type="text" value="100" />
              <StatusLabel>GB</StatusLabel>
            </StatusWrapper>
            <StatusWrapper>
              <StatusLabel>
                {'Available Disc Capacity: 1000 GB / Disc Capacity To Be Used: 900 GB'}
              </StatusLabel>
            </StatusWrapper>
            <StatusWrapper>
              <StatusLabel>Total : 0 %</StatusLabel>
              <StatusLabel>Progressbar will be added here</StatusLabel>
            </StatusWrapper>
            <StatusWrapper>
              <StatusLabel>CH 01 : 0 % </StatusLabel>
              <StatusLabel>Progressbar will be added here</StatusLabel>
            </StatusWrapper>
          </SubBody2>
        </Body>
        <Footer>
          <ButtonContainer>
            <FooterButton onClick={() => {}}>
              <ButtonLabel>Apply</ButtonLabel>
            </FooterButton>
            <FooterButton onClick={() => {}}>
              <ButtonLabel>Cancel</ButtonLabel>
            </FooterButton>
          </ButtonContainer>
        </Footer>
      </Container>
    );
  }
}

ManualBackupPopup.propTypes = {
  // onClick: PropTypes.func.isRequired,
};

export default ManualBackupPopup;
