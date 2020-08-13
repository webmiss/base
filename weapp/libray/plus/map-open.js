/* 调用手机第三方地图 */
export default (parm) => {
	const latitude = parm.latitude || 0;
	const longitude = parm.longitude || 0;
	const name = parm.name || '';
	const scale = parm.scale || 16;
	wx.openLocation({ latitude: latitude, longitude: longitude, name: name, scale: scale });
}