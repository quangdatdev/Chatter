import styled from "styled-components/native";
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {IS_IOS, WINDOW_HEIGHT} from '../../config/theme';

const bubbleCommonStyle = {
  marginBottom: 10,
  padding: 7,
  paddingBottom: 5
};

const LoadBtn = styled.TouchableOpacity.attrs({activeOpacity: 0.7})`
  padding-vertical: 6px;
  background-color: ${({theme}) => theme.primary};
  width: 130px;
  align-self: center;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 3px;
  height: 35px;
  justify-content: center;
  margin-top: 15px;
`;

const LoadBtnTxt = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const ChatContainer = styled.View`
  ${{...ifIphoneX({
    height: WINDOW_HEIGHT - 90, top: -45, bottom: -40, backgroundColor: 'transparent', zIndex: -1
  }, {
    flex: 1,
    top: IS_IOS ? -20 : 0,
    paddingBottom: IS_IOS ? 0 : 20
  })}}
`;

export {bubbleCommonStyle, LoadBtn, LoadBtnTxt, ChatContainer};
