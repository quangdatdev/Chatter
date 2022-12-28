import constants from "../config/constants";

export function getAvatarPath(path, isGroup, q) {
  if (path) return (!path.includes('file') ? constants.bucket_url : '') + path + (q ? '?v=' + new Date() : '');
  else return isGroup ? require('../images/group.png') : require('../images/user.png');
}

export function fixImgPath(path) {
  if (path?.includes('http') || path?.includes('file')) return path;
  else return constants.bucket_url + path;
}

export function sortConversations(a, b) {
  return new Date(b.message?.createdAt || b.createdAt) - new Date(a.message?.createdAt || a.createdAt)
}

export const mapMessageData = messages => {
  return messages.map(msg => ({
    ...msg,
    ...(msg.image ? {image: fixImgPath(msg.image)} : {}),
    ...(msg.video ? {video: fixImgPath(msg.video)} : {}),
    ...(msg.audio ? {audio: fixImgPath(msg.audio)} : {}),
    user: {...msg.user, ...(msg.user.avatar ? {avatar: fixImgPath(msg.user.avatar)} : {})}
  }));
};

export function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
