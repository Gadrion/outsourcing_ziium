import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePageContainer } from 'containers/pages';
import { Select, Button } from 'wisenet-ui/components/atoms';

const render = ({ data, selectItemChanged }) => (
  <div>
    <h1>Date &amp; Time</h1>
    <div>
      <Select onChange={selectItemChanged}>
        <option value="hide">-- wisenet-ui --</option>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">{data}</option>
      </Select>
      <select style={{ fontSize: '3rem' }}>
        <option value="hide">-- default-ui --</option>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
      </select>
    </div>
    <div>
      <Button onClick={() => {}}>
        {'Wisenet Button'}
      </Button>
      <input type="button" value="default Button" />
    </div>
  </div>
);

render.propTypes = {
  selectItemChanged: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const DateTimePage = () => (
  <DateTimePageContainer render={render} />
);

export default DateTimePage;
