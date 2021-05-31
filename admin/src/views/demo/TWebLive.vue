<template>
  <wm-main>
    
     <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="30">ID</td>
        <td width="90">房间ID</td>
        <td width="120">名称</td>
        <td width="80">主播</td>
        <td width="80">观众</td>
        <td>信息</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.id+''">
        <td>{{ val.id }}</td>
        <td>{{ 'room_'+val.id }}</td>
        <td>{{ val.name }}</td>
        <td>
          <wm-button type="danger" height="32px" @click="RoomJoin('anchor', val.id, val.group_id)">主播</wm-button>
        </td>
        <td>
          <wm-button type="info" height="32px" @click="RoomJoin('audience', val.id, val.group_id)">观众</wm-button>
        </td>
        <td></td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->

    <!-- 直播间 -->
    <wm-dialog :title="room.title" width="640px" :show="room.show" @update:close="clickClose($event)" :isFooter="false">
      <div class="player_video">
        <!-- 消息列表 -->
        <div class="player_msg">
          <div class="player_msg_wrapper" ref="MsgBox" @scroll="onScroll">
            <div class="player_msg_list" ref="MsgList">
              <div class="player_msg_box" v-for="(val, key) in form.lists" :key="key">
                <div class="flex">
                  <div class="img"></div>
                  <div class="info">ID:{{val.uid}}</div>
                </div>
                <div class="content">{{val.text}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 工具 -->
        <ul class="player_tools" v-if="room.role == 'anchor'">
          <li :class="tools.camera?'active':''" @click="setCamera(!tools.camera)">视频</li>
          <li :class="tools.microphone?'active':''" @click="setMicrophone(!tools.microphone)">麦风</li>
          <li :class="tools.push?'active':''" @click="setPush(!tools.push)">推流</li>
        </ul>
        <!-- 视频 -->
        <div id="playerView"></div>
      </div>
      <div class="player_emoji">
        表情
      </div>
      <div class="player_send flex">
        <div class="player_send_msg">
          <div v-if="!form.login" class="player_send_login">需要" <b @click="roomLogin()">登录</b> "才能发言!</div>
          <wm-input v-else :value="form.content" @update:value="form.content=$event" placeholder="消息内容" />
        </div>
        <wm-button height="40px" @click="SendSub()">发送</wm-button>
      </div>
    </wm-dialog>
    <!-- 直播间 End -->

  </wm-main>
</template>

<style>
#playerView{width: 100%; height: 100%;}
#playerView video{vertical-align: top;}
</style>
<style scoped>
/* 视频 */
.player_video{position: relative; overflow: hidden; width: 100%; height: 320px; background-color: #000;}
/* 消息 */
.player_msg{position: absolute; z-index: 99; width: 280px; height: 160px; left: 10px; bottom: 10px; border-radius: 4px; color: #fff; background-color: rgba(0, 0, 0, .3);}
.player_msg_wrapper{position: relative; overflow: hidden; padding: 5px 10px; width: 100%; height: 100%; box-sizing: border-box; overflow-y: auto; -webkit-overflow-scrolling: touch;}
.player_msg_wrapper::-webkit-scrollbar{width: 8px;}
.player_msg_wrapper::-webkit-scrollbar-thumb{border-radius: 4px; background: rgba(136,136,136,0.4);}
.player_msg_wrapper:hover::-webkit-scrollbar-track{background: rgba(136,136,136,0.1);}
.player_msg_list{position: absolute; width: calc(100% - 20px);}
.player_msg_box{padding: 2px 0;}
.player_msg_box .img{width: 24px; height: 24px; border-radius: 50%; background-color: rgba(255, 255, 255, .6);}
.player_msg_box .info{width: calc(100% - 30px); line-height: 24px;}
.player_msg_box .content{padding: 5px 0; line-height: 20px;}
/* 工具 */
.player_tools{position: absolute; z-index: 99; width: 40px; top: 10px; right: 10px; color: #FFF; font-size: 12px;}
.player_tools li{cursor: pointer; height: 40px; line-height: 40px; margin: 10px 0; text-align: center; background-color: rgba(0, 0, 0, .3); border-radius: 50%;}
.player_tools li:hover{color: #FFF; background-color: #6FB737;}
.player_tools .active{color: #FFF; background-color: #6FB737;}
/* 表情 */
.player_emoji{height: 48px; line-height: 48px;}
/* 发送 */
.player_send{width: 100%; height: 48px;}
.player_send_msg{width: calc(100% - 90px);}
.player_send_login{line-height: 40px;}
.player_send_login b{cursor: pointer; color: #6FB737;}
.player_send textarea{border: #F2F4F6 1px solid; background-color: #F2F4F6;}

</style>

<script lang="ts" src="./TWebLive.ts"></script>