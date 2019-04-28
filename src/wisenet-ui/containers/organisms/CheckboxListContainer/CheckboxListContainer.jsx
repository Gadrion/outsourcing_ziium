import React from 'react';
import PropTypes from 'prop-types';

export class CheckboxListContainer extends React.Component {
  state = {
    dataList: [],
    preSelectedIndex: '',
    isLoad: true,
    selectList: [],
    selectAllChecked: false,
  }

  componentDidMount() {
    const {
      data,
    } = this.props;

    console.log('data', data);
    if (data.length !== 0) {
      this.onUpdate({
        dataList: data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const selectList = [];
      snapshot.map((item, index) => {
        if (item.checked) {
          selectList.push({
            ...item,
            index,
          });
        }
        return null;
      });
      this.onUpdate({
        dataList: snapshot,
        selectList,
      });
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const {
      dataList: prevCameraList,
    } = prevState;

    const {
      data: propsCameraList,
    } = this.props;

    if (prevCameraList.length !== propsCameraList.length) {
      return propsCameraList;
    }

    return null;
  }


  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  handleCheckedChange = e => {
    const { handleChange } = this.props;
    const { dataList, selectList } = this.state;
    // const targetId = e.target.id;
    const findIndex = e.index;

    const selectedIndex = selectList.findIndex(checkedItem => checkedItem.index === findIndex);
    if (selectedIndex !== -1) {
      dataList[findIndex].checked = !dataList[findIndex].checked;
      selectList.splice(selectedIndex, 1);
    } else {
      dataList[findIndex].checked = !dataList[findIndex].checked;
      selectList.push({ index: findIndex, ...dataList[findIndex] });
    }
    if (typeof handleChange !== 'undefined') {
      handleChange(findIndex, selectList);
    }
    this.setState({ dataList, selectList });
  }

  render() {
    const { render } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

CheckboxListContainer.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleChange: PropTypes.func,
};

CheckboxListContainer.defaultProps = {
  handleChange: () => {},
};

export default CheckboxListContainer;
