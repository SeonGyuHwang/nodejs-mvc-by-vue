<template>
  <div>

    <form ref="publicFrm" method="post" @submit.prevent="proc">
      <input type="hidden" name="idx" class="_pk" v-model="row.idx" />
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" width="100%" cellspacing="0">
              <colgroup>
                <col width="150px;" />
                <col width="*;" />
              </colgroup>
              <tbody>
              <tr>
                <th class="text-center">제목</th>
                <td class="text-center"><input type="text" name="title" class="form-control title" :value="row.title" :readonly="row.idx && row.created_id !== user_info.userId" /></td>
              </tr>
              <tr>
                <th class="text-center">내용</th>
                <td class="text-center">
                  <textarea name="contents" class="form-control contents" rows="10" :readonly="row.idx && row.created_id !== user_info.userId">{{ row.contents }}</textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-body text-center">
          <a href="javascript:void(0);" class="btn btn-primary procBtn" v-if="!idx || row.created_id === user_info.userId" @click="proc">저장</a>
          <a href="javascript:void(0);" class="btn btn-danger delBtn" v-if="row.idx && row.created_id === user_info.userId" @click="delRow(idx)">삭제</a>
          <a href="javascript:void(0);" class="btn btn-black" @click="close">닫기</a>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: 'board-write',
    computed: {
      ...mapState('board', {
        idx: state => state.idx,
        row: state => state.row
      })
    },
    beforeCreate() {
      document.body.classList.add('is_pop', 'is_login', 'is_popup_resize')
    },
    created() {
      this.$store.dispatch('board/clearRow')
    },
    mounted() {

      if( this.idx )
        this.getRowAction({ params: { idx: this.idx } })

    },
    destroyed() {
      this.$emit('close')
      document.body.classList.remove('is_pop', 'is_login', 'is_popup_resize')
    }
  }
</script>
