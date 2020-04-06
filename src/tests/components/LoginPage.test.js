import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('LoginPage component should be rendered correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('Header component should call startLogout on button click', () => {
  const onClickSpy = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={onClickSpy} />);
  wrapper.find('button').simulate('click');
  expect(onClickSpy).toHaveBeenLastCalledWith();
});
