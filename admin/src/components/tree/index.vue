<template>
  <div>
    <!-- 一级 -->
    <div v-for="(v1, k1) in data" :key="k1">
      <div class="wm-tree_content" style="padding-left: 0px;" @click="v1.show=!v1.show">
        <span class="wm-tree_arrow">&gt;</span>
        <span class="wm-tree_checkbox">
          <wm-checkbox :checked="v1.checked" @update:checked="v1.checked" @click="click(v1.id, v1.checked=!v1.checked, v1.children)"></wm-checkbox>
        </span>
        <span class="wm-tree_label">{{v1.label}}</span>
      </div>
      <!-- 二级 -->
      <div :class="'wm-tree_node_'+v1.id">
        <div class="wm-tree_node" v-for="(v2, k2) in v1.children" :key="k2" v-show="v1.show">
          <div class="wm-tree_content" style="padding-left: 16px;" @click="v2.show=!v2.show">
            <span class="wm-tree_arrow" v-if="v2.children.length>0">&gt;</span>
            <span class="wm-tree_arrow_none" v-else></span>
            <span class="wm-tree_checkbox">
              <wm-checkbox :checked="v2.checked" @update:checked="v2.checked" @click="click(v2.id, v2.checked=!v2.checked, v2.children)"></wm-checkbox>
            </span>
            <span class="wm-tree_label">{{v2.label}}</span>
          </div>
          <!-- 三级 -->
          <div :class="'wm-tree_node_'+v2.id">
            <div class="wm-tree_node" v-for="(v3, k3) in v2.children" :key="k3" v-show="v2.show">
              <div class="wm-tree_content" style="padding-left: 32px;" @click="v3.show=!v3.show">
                <span class="wm-tree_arrow" v-if="v3.children.length>0">&gt;</span>
                <span class="wm-tree_arrow_none" v-else></span>
                <span class="wm-tree_checkbox">
                  <wm-checkbox :checked="v3.checked" @update:checked="v3.checked" @click="click(v3.id, v3.checked=!v3.checked, v3.children)"></wm-checkbox>
                </span>
                <span class="wm-tree_label">{{v3.label}}</span>
              </div>
              <!-- 四级 -->
              <div :class="'wm-tree_node_'+v3.id">
                <div class="wm-tree_node" v-for="(v4, k4) in v3.children" :key="k4" v-show="v3.show">
                  <div class="wm-tree_content" style="padding-left: 48px;" @click="v4.show=!v4.show">
                    <span class="wm-tree_arrow" v-if="v4.children.length>0">&gt;</span>
                    <span class="wm-tree_arrow_none" v-else></span>
                    <span class="wm-tree_checkbox">
                      <wm-checkbox :checked="v4.checked" @update:checked="v4.checked" @click="click(v4.id, v4.checked=!v4.checked, v4.children)"></wm-checkbox>
                    </span>
                    <span class="wm-tree_label">{{v4.label}}</span>
                  </div>
                  <!-- 五级 -->
                  <div :class="'wm-tree_node_'+v4.id">
                    <div class="wm-tree_node" v-for="(v5, k5) in v4.children" :key="k5" v-show="v4.show">
                      <div class="wm-tree_content" style="padding-left: 64px;" @click="v5.show=!v5.show">
                        <span class="wm-tree_arrow" v-if="v5.children.length>0">&gt;</span>
                        <span class="wm-tree_arrow_none" v-else></span>
                        <span class="wm-tree_checkbox">
                          <wm-checkbox :checked="v5.checked" @update:checked="v5.checked" @click="click(v5.id, v5.checked=!v5.checked, v5.children)"></wm-checkbox>
                        </span>
                        <span class="wm-tree_label">{{v5.label}}</span>
                      </div>
                      <!-- 六级 -->
                      <div :class="'wm-tree_node_'+v5.id">
                        <div class="wm-tree_node" v-for="(v6, k6) in v5.children" :key="k6" v-show="v5.show">
                          <div class="wm-tree_content" style="padding-left: 80px;" @click="v6.show=!v6.show">
                            <span class="wm-tree_arrow" v-if="v6.children.length>0">&gt;</span>
                            <span class="wm-tree_arrow_none" v-else></span>
                            <span class="wm-tree_checkbox">
                              <wm-checkbox :checked="v6.checked" @update:checked="v6.checked" @click="click(v6.id, v6.checked=!v6.checked, v6.children)"></wm-checkbox>
                            </span>
                            <span class="wm-tree_label">{{v6.label}}</span>
                          </div>
                          <div :class="'wm-tree_node_'+v6.id"></div>
                        </div>
                      </div>
                      <!-- 六级 End -->
                    </div>
                  </div>
                  <!-- 五级 End -->
                </div>
              </div>
              <!-- 四级 End -->
            </div>
          </div>
          <!-- 三级 End -->
        </div>
      </div>
      <!-- 二级 End -->
    </div>
    <!-- 一级 End -->
  </div>
</template>

<style scoped>
.wm-tree_content{cursor: pointer; display: flex; align-items: center; height: 26px;}
.wm-tree_content:hover{background-color: #F2F4F8;}
.wm-tree_node{white-space: nowrap; outline: none;}
.wm-tree_arrow{width: 8px; text-align: center; font-size: 12px; font-weight: 600; color: #C0C4CC;}
.wm-tree_arrow_none{width: 8px;}
.wm-tree_checkbox{width: 24px;}
.wm-tree_checkbox .wm-checkbox{position: absolute; margin-left: -3px; transform: scale(0.9, 0.9);}
.wm-tree_label{font-size: 14px; color: #606266;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmCheckbox from '../form/checkbox/index.vue'
export default defineComponent({
  name: 'Tree',
  components: {wmCheckbox},
  props: {
    data: {default: []}, //数据
  },
  data(){
    let menus: any = [];
    let tmpMenu: any = [];
    return {menus, tmpMenu};
  },
  mounted(){
    this.menus = this.data;
  },
  methods:{

    /* 选择 */
    click(id: any, checked: boolean, children: any) {
      // 数据
      this.setChecked(checked, children);
      // for(let i in children) {
      //   children[i].checked = checked;
      // }
      // 勾选下级
      try {
        const obj = document.querySelectorAll('.wm-tree_node_'+id+' div.checked');
        for(let i=0; i<obj.length; i++){
          if(checked) obj[i].classList.add("active");
          else obj[i].classList.remove("active");
        }
      }catch(err){}
      console.log(this.data);
    },

    /* 勾选下级 */
    setChecked(checked: boolean, data: any) {
      for(let i in data) {
        if(data[i].children) this.setChecked(checked, data[i].children);
      }
    },

  },
});
</script>