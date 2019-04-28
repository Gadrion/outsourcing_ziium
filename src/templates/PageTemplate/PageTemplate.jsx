import React from 'react';
// import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
// import styles from './PageTemplate.scss';
import {
  PageTemplateStyled,
  MainStyled,
  SidebarWrapperStyled,
  ContentWrapperStyled,
} from './PageTemplateStyled';

// const cx = classNames.bind(styles);

const PageTemplate = ({
  children,
  sidebar,
}) => (
  <PageTemplateStyled>
    <MainStyled>
      {
        sidebar && (
          <SidebarWrapperStyled>
            {sidebar}
          </SidebarWrapperStyled>
        )
      }
      <ContentWrapperStyled>
        {children}
      </ContentWrapperStyled>
    </MainStyled>
  </PageTemplateStyled>
);

PageTemplate.defaultProps = {
  children: null,
  sidebar: null,
};

PageTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sidebar: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
};

export default PageTemplate;
