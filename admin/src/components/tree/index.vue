<template>
  <div>
    <!-- 一级 -->
    <div v-for="(v1, k1) in menus" :key="k1">
      <div class="wm-tree_content" style="padding-left: 0px;" @click="v1.show=!v1.show">
        <span class="wm-tree_arrow">{{v1.show?'-':'+'}}</span>
        <span class="wm-tree_checkbox" :id="'wm-tree_node_'+v1.id">
          <wm-checkbox :checked="v1.checked" @click.stop="click(v1.id, v1.checked=!v1.checked, v1.children)"></wm-checkbox>
        </span>
        <span class="wm-tree_label">{{v1.label}}</span>
      </div>
      <!-- 二级 -->
      <div class="wm-tree_node" v-for="(v2, k2) in v1.children" :key="k2" v-show="v1.show">
        <div class="wm-tree_content" style="padding-left: 16px;" @click="v2.show=!v2.show">
          <span class="wm-tree_arrow" v-if="v2.children && v2.children.length>0">{{v2.show?'-':'+'}}</span>
          <span class="wm-tree_arrow_none" v-else></span>
          <span class="wm-tree_checkbox" :id="'wm-tree_node_'+v2.id">
            <wm-checkbox :checked="v2.checked" @click.stop="click(v2.id, v2.checked=!v2.checked, v2.children)"></wm-checkbox>
          </span>
          <span class="wm-tree_label">{{v2.label}}</span>
        </div>
        <!-- 三级 -->
        <div class="wm-tree_node" v-for="(v3, k3) in v2.children" :key="k3" v-show="v2.show">
          <div class="wm-tree_content" style="padding-left: 32px;" @click="v3.show=!v3.show">
            <span class="wm-tree_arrow" v-if="v3.children && v3.children.length>0">{{v3.show?'-':'+'}}</span>
            <span class="wm-tree_arrow_none" v-else></span>
            <span class="wm-tree_checkbox" :id="'wm-tree_node_'+v3.id">
              <wm-checkbox :checked="v3.checked" @click.stop="click(v3.id, v3.checked=!v3.checked, v3.children)"></wm-checkbox>
            </span>
            <span class="wm-tree_label">{{v3.label}}</span>
          </div>
          <!-- 四级 -->
          <div class="wm-tree_node" v-for="(v4, k4) in v3.children" :key="k4" v-show="v3.show">
            <div class="wm-tree_content" style="padding-left: 48px;" @click="v4.show=!v4.show">
              <span class="wm-tree_arrow" v-if="v4.children && v4.children.length>0">{{v4.show?'-':'+'}}</span>
              <span class="wm-tree_arrow_none" v-else></span>
              <span class="wm-tree_checkbox" :id="'wm-tree_node_'+v4.id">
                <wm-checkbox :checked="v4.checked" @click.stop="click(v4.id, v4.checked=!v4.checked, v4.children)"></wm-checkbox>
              </span>
              <span class="wm-tree_label">{{v4.label}}</span>
            </div>
            <!-- 五级 -->
            <div class="wm-tree_node" v-for="(v5, k5) in v4.children" :key="k5" v-show="v4.show">
              <div class="wm-tree_content" style="padding-left: 64px;" @click="v5.show=!v5.show">
                <span class="wm-tree_arrow" v-if="v5.children && v5.children.length>0">{{v5.show?'-':'+'}}</span>
                <span class="wm-tree_arrow_none" v-else></span>
                <span class="wm-tree_checkbox" :id="'wm-tree_node_'+v5.id">
                  <wm-checkbox :checked="v5.checked" @click.stop="click(v5.id, v5.checked=!v5.checked, v5.children)"></wm-checkbox>
                </span>
                <span class="wm-tree_label">{{v5.label}}</span>
              </div>
              <!-- 六级 -->
              <div class="wm-tree_node" v-for="(v6, k6) in v5.children" :key="k6" v-show="v5.show">
                <div class="wm-tree_content" style="padding-left: 80px;" @click="v6.show=!v6.show">
                  <span class="wm-tree_arrow" v-if="v6.children && v6.children.length>0">{{v6.show?'-':'+'}}</span>
                  <span class="wm-tree_arrow_none" v-else></span>
                  <span class="wm-tree_checkbox" :id="'wm-tree_node_'+v6.id">
                    <wm-checkbox :checked="v6.checked" @click.stop="click(v6.id, v6.checked=!v6.checked, v6.children)"></wm-checkbox>
                  </span>
                  <span class="wm-tree_label">{{v6.label}}</span>
                </div>
                <div :class="'wm-tree_node_'+v6.id"></div>
              </div>
              <!-- 六级 End -->
            </div>
            <!-- 五级 End -->
          </div>
          <!-- 四级 End -->
        </div>
        <!-- 三级 End -->
      </div>
      <!-- 二级 End -->
    </div>
    <!-- 一级 End -->
  </div>
</template>

<style scoped>
.wm-tree_content{user-select: none; cursor: pointer; display: flex; align-items: center; height: 26px;}
.wm-tree_content:hover{background-color: #F2F4F8;}
.wm-tree_node{white-space: nowrap; outline: none;}
.wm-tree_arrow{width: 16px; margin-top: -2px; text-align: center; font-size: 14px; font-weight: 600; color: #A2A4A8;}
.wm-tree_arrow_none{width: 16px;}
.wm-tree_checkbox{position: relative; width: 24px;}
.wm-tree_checkbox .wm-checkbox{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}
.wm-tree_label{font-size: 14px; color: #606266; padding: 0 4px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmCheckbox from '../form/checkbox/index.vue'
export default defineComponent({
  name: 'Tree',
  components: {wmCheckbox},
  props: {
    data: {default: []}, //数据: [{id: "1", label: "测试接口", checked: true, show: true, action: true, children: []}]
  },
  data(){
    let menus: any = [];
    let arrs: Array<object> = [];
    let perms: string = '';
    return {menus, perms, arrs};
  },
  watch:{
    data(val: boolean){
      this.menus = val;
    },
  },
  methods:{

    /* 选择 */
    click(id: any, checked: boolean, children: any) {
      this.setCheckbox(id, checked);
      if(children) this.setChecked(checked, children);
    },

    /* 勾选下级 */
    setChecked(checked: boolean, data: any) {
      for(let i in data) {
        data[i].checked = checked;
        this.setCheckbox(data[i].id, data[i].checked);
        if(data[i].children) this.setChecked(checked, data[i].children);
      }
    },
    /* Checkbox状态 */
    setCheckbox(id: any, checked: boolean) {
      let obj = document.querySelector('#wm-tree_node_'+id+' .checked');
      if(obj) checked?obj.classList.add("active"):obj.classList.remove("active");
    },

    /* ID-获取 */
    getIds() {
      this.arrs = [];
      this.setIds(this.menus);
      return this.arrs;
    },
    /* ID-生成 */
    setIds(data: any) {
      for(let x in data) {
        if(data[x].children) this.setIds(data[x].children);
        if(data[x].checked) this.arrs.push(data[x].id);
      }
    },

    /* 权限-获取 */
    getPerms() {
      this.perms = '';
      this.setPerms(this.menus);
      return this.perms.trim();
    },
    /* 权限-生成 */
    setPerms(data: any) {
      for(let x in data) {
        let perm = 0;
        if(data[x].action) {
          for(let y in data[x].children) if(data[x].children[y].checked) perm += parseInt(data[x].children[y].perm);
        } else if(data[x].children){
          this.setPerms(data[x].children);
        }
        if(data[x].checked) this.perms += data[x].id+':'+perm+' ';
      }
    },

  },
});
</script>