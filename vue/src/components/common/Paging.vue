<template>
  <div id="App-Paging">
    <div class="dataTables_paginate paging_simple_numbers text-right">
      <ul class="pagination">
        <li class="paginate_button page-item previous" :class="prevBlock === null ? 'disabled' : ''">
          <a href="javascript:void(0);" class="page-link" @click="movePage(prevBlock)">이전</a>
        </li>
        <li class="paginate_button page-item" v-for="p in paging.range" :class="paged === p ? 'active' : ''">
          <a href="javascript:void(0);" class="page-link" @click="movePage(p)">{{ p }}</a>
        </li>
        <li class="paginate_button page-item next" :class="nextBlock === null ? 'disabled' : ''">
          <a href="javascript:void(0);" class="page-link" @click="movePage(nextBlock)">다음</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: 'app-paging',
    props: [
      "page",
      "dataStart",
      "perLength",
      "perBlock",
    ],
    data() {
      return {
        "prevBlock": 0
        ,"nextBlock": 0
        ,"paging": {}
      }
    },
    watch: {
      totalCount: {
        deep: true,
        handler() {
          this.getPaging()
        }
      },
      '$parent.perLength': {
        deep: true,
        handler() {
          this.getPaging()
        }
      }
    },
    computed: {
      ...mapState('board', {
        totalCount: state => state.count
      }),
      paged() {
        return this.$parent.page
      }
    },
    methods: {
      movePage(page = 1) {
        this.$parent.page = page
        this.$parent.dataStart = this.$parent.perLength*(page-1)
      },
      getPaging() {
        this.paging = this.$phps.setPaging(this.$parent.page, this.totalCount, this.$parent.perLength, this.$parent.perBlock)
        //this.paging = this.$phps.setPaging(this.$parent.page, 155, 5, this.$parent.perBlock)

        this.prevBlock = this.paging.firstPage-1 <= 0 ? null : this.paging.firstPage-1
        this.nextBlock = this.paging.lastPage+1 >= this.paging.totalPage ? null : this.paging.lastPage+1
      }
    },
    mounted() {
      this.getPaging()
    }
  }
</script>
