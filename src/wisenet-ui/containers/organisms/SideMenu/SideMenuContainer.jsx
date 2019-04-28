import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class SideMenuContainer extends React.Component {
  state = {
    menu: null,
    selectedMenu: null,
  }

  constructor(props) {
    super(props);
    this.submenu = {};
  }

  componentDidMount() {
    const { location, defaultPath, data } = this.props;
    let currentPath = location.pathname.split('/');
    currentPath = currentPath.slice(2, currentPath.length - 1);
    if (currentPath.length === 0) {
      currentPath = defaultPath;
    }
    const menu = this.initMenu(data, currentPath, 0);
    this.setHeight();
    this.setState({
      menu,
      selectedMenu: currentPath,
    });
  }

  componentDidUpdate() {
    this.setHeight();
  }

  setHeight = () => {
    const { submenu } = this;
    const { subHeight } = this.props;
    const keys = Object.keys(submenu);
    if (!keys.length) {
      return;
    }
    keys.forEach(key => {
      const self = submenu[key];
      let height = 0;
      if (self.className.indexOf('open') !== -1) {
        const lis = self.querySelectorAll('.open > li');
        height += lis.length * subHeight;
      }
      self.style.height = `${height}px`;
    });
  }

  initMenu = (menus, currentPath, depth) => {
    const newMenu = menus.map(item => {
      if (Object.prototype.hasOwnProperty.call(item, 'childs')) {
        return {
          ...item,
          childs: this.initMenu(item.childs, currentPath, depth + 1),
          isOpen: currentPath[depth] === item.id.split('_')[depth],
        };
      }
      return item;
    });
    return newMenu;
  }

  clickMenu = (e, target) => {
    e.preventDefault();
    const { menu, selectedMenu } = this.state;
    const { location } = this.props;
    let targetPath = target.id.split('_');
    let newMenu = menu;
    if (this.isSameArray(selectedMenu, targetPath)) {
      newMenu = this.changeIsOpen(newMenu, selectedMenu, 0);
    } else {
      const currentPath = location.pathname.split('/').slice(2);
      if (currentPath[0] === target.id) {
        /*
          현재 url 경로와 새로 선택한 menu의 0번 째 depth값이 같을 경우,
          현재 url 경로에 해당하는 모든 menu를 펼침
        */
        targetPath = currentPath.slice(0, currentPath.length - 1);
      }
      newMenu = this.changeIsOpen(newMenu, selectedMenu, 0, false);
      newMenu = this.changeIsOpen(newMenu, targetPath, 0, !target.isOpen);
    }
    this.setState({
      menu: newMenu,
      selectedMenu: targetPath,
    });
  }

  changeIsOpen = (array, targetPath, depth, value) => (
    array.map(item => {
      const path = item.id.split('_');
      if (typeof value !== 'undefined') {
        if (path[depth] === targetPath[depth]) {
          return {
            ...item,
            childs: this.changeIsOpen(item.childs, targetPath, depth + 1, value),
            isOpen: value,
          };
        }
      }
      if (this.isSameArray(path, targetPath)) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      }
      if (path[depth] === targetPath[depth]) {
        return {
          ...item,
          childs: this.changeIsOpen(item.childs, targetPath, depth + 1),
        };
      }
      return item;
    })
  );

  isSameArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i += 1) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

SideMenuContainer.defaultProps = {
  subHeight: 30,
};

SideMenuContainer.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  subHeight: PropTypes.number,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  defaultPath: PropTypes.instanceOf(Array).isRequired,
};

export default SideMenuContainer;
