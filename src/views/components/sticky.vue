<template>
  <div>
    <sticky className="sub-navbar">
      <el-dropdown trigger="click">
        <el-button>
          플랫폼<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="no-border" slot="dropdown">
          <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
            <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button>
          체인 외부<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="no-padding no-border" style="width:300px" slot="dropdown">
          <el-input placeholder="콘텐츠를 입력하십시오." v-model="url">
            <template slot="prepend">기입url</template>
          </el-input>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker v-model="time" type="datetime" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="릴리스 시간">
        </el-date-picker>
      </div>

      <el-button style="margin-left: 10px;" type="success">출시 됨
      </el-button>
    </sticky>

    <div class="components-container">
      <code>Sticky header 페이지가 미리 설정된 위치로 스크롤 할 때 위쪽 위치로 스크롤합니다.</code>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
      <div>응애응애 김응애</div>
    </div>
  </div>
</template>


<script>
import Sticky from '@/components/Sticky'

export default {
  components: { Sticky },
  data() {
    return {
      time: '',
      url: '',
      platforms: ['a-platform'],
      platformsOptions: [
            { key: 'a-platform', name: '平台A' },
            { key: 'b-platform', name: '平台B' },
            { key: 'c-platform', name: '平台C' }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  }
}
</script>

<style scoped>
  .time-container {
    display: inline-block;
  }
</style>

