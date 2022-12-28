import React from 'react';
import {Modal} from "react-native";
import VideoPlayer from "react-native-video";
import {Body, CloseBtn, VideoContainer, Overlay, videoStyle} from "./styles";
import {Icon} from "../index";
import {IS_IOS} from "../../config/theme";
import constants from "../../config/constants";

const VideoMessage = ({currentMessage}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const video = React.useRef(null);
  const fullVideo = React.useRef(null);

  const path = React.useMemo(() => currentMessage.video.includes('//data/user') ? currentMessage.video.replace(constants.bucket_url, '') : currentMessage.video, [currentMessage.video]);

  React.useEffect(() => {
    if (isVideoOpen && fullVideo.current) fullVideo.current.presentFullscreenPlayer()
  }, [isVideoOpen, fullVideo]);

  return (
    <>
      <VideoContainer onPress={() => IS_IOS ? setIsVideoOpen(true) : setModalVisible(true)}>
        <VideoPlayer
          source={{uri: path}}
          style={{width: 200, height: 130, borderRadius: 20, top: -4}}
          paused={IS_IOS ? true : paused}
          ref={video}
          muted={true}
          resizeMode="cover"
          onReadyForDisplay={() => {
            video.current.seek(5);
            setTimeout(() => {
              setPaused(true);
            }, 300);
          }}
        />
        {IS_IOS ?
          <VideoPlayer
            source={{uri: path}}
            ref={fullVideo}
            paused={!IS_IOS || !isVideoOpen}
            onFullscreenPlayerDidDismiss={() => setIsVideoOpen(false)}
          /> : null
        }
        <Overlay><Icon name="play-circle-outline" size={30} color="#fff" /></Overlay>
      </VideoContainer>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        {modalVisible ? <Body>
          <CloseBtn onPress={() => setModalVisible(false)}><Icon name={"close-outline"} size={30} color="#fff" /></CloseBtn>
          <VideoPlayer source={{uri: path}} style={videoStyle} resizeMode="contain" controls={true}/>
        </Body> : null}
      </Modal>
    </>
  )
};

export default VideoMessage;
