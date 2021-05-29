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
    <wm-dialog :title="room.title" width="640px" :show="room.show" @update:close="pusherClose($event)">
      <wm-row>
        <div id="playerView" style="width:100%; height:auto;"></div>
      </wm-row>
      <template #footer>
        <wm-button @click="pusherPush()">推送</wm-button>
      </template>
    </wm-dialog>
    <!-- 直播间 End -->

  </wm-main>
</template>

<style>
#playerView video{vertical-align: top; width: calc(100% + 2px);}
</style>

<script lang="ts" src="./TWebLive.ts"></script>