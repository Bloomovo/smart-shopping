<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="search" show-action :placeholder="placeholder" clearable>
      <template #action>
        <div @click="getSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="delAll()" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="getSearch(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchInfo, setSearchInfo } from '@/api/search'
export default {
  name: 'SearchIndex',
  data () {
    return {
      placeholder: '手机',
      search: '',
      history: getSearchInfo()
    }
  },
  methods: {
    getSearch (key) {
      key = key !== '' ? key : this.placeholder
      const index = this.history.indexOf(key)
      if (index !== -1) this.history.splice(index, 1)
      this.history.unshift(key)
      // 持久化更新
      setSearchInfo(this.history)

      this.search = ''
      this.$router.push(`/searchlist?search=${key}`)
    },
    // 清空所有
    delAll () {
      setSearchInfo([])
      this.history = []
      this.$toast.success('清除成功')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
