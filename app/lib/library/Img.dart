
import 'dart:async';
import 'dart:io';
import 'dart:convert' as convert;
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';
import 'package:image_picker/image_picker.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';

/* 图片类 */
class Img{
  /* 照片 */
  static Future<File> getPhoto() async {
    try {
       return await ImagePicker.pickImage(source: ImageSource.gallery);
     } on FormatException{
      return null;
    }
  }

  /* 相机 */
  static Future<File> getCamera() async {
    try {
       return await ImagePicker.pickImage(source: ImageSource.camera);
     } on FormatException{
      return null;
    }
  }

  /* 图片裁切 */
  static Future<File> cropImage(File imageFile, [int width, int height]) async {
    width = width!=null?width:340;
    height = height!=null?height:340;
    return await ImageCropper.cropImage(
      sourcePath: imageFile.path,
      // ratioX: 1.0,
      // ratioY: 1.0,
      maxWidth: width,
      maxHeight: height,
    );
  }

  /* 图片压缩 */
  static Future<File> compress(File file, [int minWidth, int minHeight]) async {
    // 目录
    Directory cacheDir = await getTemporaryDirectory();
    String dir = cacheDir.path;
    var imgDir = new Directory("$dir/img/");
    await imgDir.create();
    String cacheImg = imgDir.path+path.basename(file.path);
    // 压缩
    minWidth = minWidth!=null?minWidth:640;
    minHeight = minHeight!=null?minHeight:1024;
    return await FlutterImageCompress.compressAndGetFile(
      file.absolute.path, cacheImg,
      minWidth: minWidth,
      minHeight: minHeight,
      quality: 80,
      rotate: 0,
    );
  }

  /* 图片转Base64 */
  static Future<String> imageBase64(String path) async {
    File file = new File(path);
    List<int> imageBytes = await file.readAsBytes();
    return convert.base64Encode(imageBytes);
  }

  /* Base64转图片 */
  static Future<Image> base64Image(String base64Txt) async {
    Uint8List decodeTxt = convert.base64.decode(base64Txt);
    return Image.memory(
      decodeTxt,
      width: 100,
      fit: BoxFit.fitWidth,
      gaplessPlayback: true,  //防止重绘
    );
  }
}