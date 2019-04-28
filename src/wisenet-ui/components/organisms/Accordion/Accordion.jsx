import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem } from 'wisenet-ui/components/organisms';
import { Container, ListWrapper } from './AccordionStyled';

class Accordion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prevMenu: [0, true],
    };
    this.onChange.bind(this);
  }

  onChange = e => {
    const { prevMenu } = this.state;
    const idx = Number(e.target.getAttribute('id'));
    let curMenu = null;
    if (idx !== prevMenu[0]) {
      curMenu = [idx, true];
    } else {
      curMenu = [idx, !prevMenu[1]];
    }
    this.setState({
      prevMenu: curMenu,
    });
  }

  render() {
    const { prevMenu } = this.state;
    const { menus, className } = this.props;
    return (
      <Container className={className}>
        <ListWrapper>
          {menus.map((item, idx) => (
            <AccordionItem
              style={item.style && item.style}
              id={idx}
              key={idx.toString()}
              onChange={this.onChange}
              prevMenu={prevMenu}
              data={item}
            />
          ))}
        </ListWrapper>
      </Container>
    );
  }
}

Accordion.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      addionalItem: PropTypes.any,
      content: PropTypes.instanceOf(Object),
    }),
  ),
  className: PropTypes.string,
};

Accordion.defaultProps = {
  menus: [],
  className: '',
};

export default Accordion;
