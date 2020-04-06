import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('Header component should rendered correctly', () => {
  const wrapper = shallow(<Header startLogout={() => { }} />);
  expect(wrapper).toMatchSnapshot();
});

test('Header component should call startLogout on button click', () => {
  const onClickSpy = jest.fn();
  const wrapper = shallow(<Header startLogout={onClickSpy} />);
  wrapper.find('button').simulate('click');
  expect(onClickSpy).toHaveBeenLastCalledWith();
});
