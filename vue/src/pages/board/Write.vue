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
                <th class="text-center">Title</th>
                <td class="text-center"><input type="text" name="title" class="form-control title" :value="row.title" :readonly="row.idx && row.created_id !== user_info.userId" /></td>
              </tr>
              <tr>
                <th class="text-center">Contents</th>
                <td class="text-center">
                  <textarea name="contents" class="form-control contents" rows="10" :readonly="row.idx && row.created_id !== user_info.userId">{{ row.contents }}</textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-body text-center">
          <a href="javascript:void(0);" class="btn btn-primary procBtn" v-if="!idx || row.created_id === user_info.userId" @click="proc">Save</a>
          <a href="javascript:void(0);" class="btn btn-danger delBtn" v-if="row.idx && row.created_id === user_info.userId" @click="delRow(idx)">Delete</a>
          <a href="javascript:void(0);" class="btn btn-black" @click="close">Close</a>
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
    created() {
      this.$store.dispatch('board/clearRow')
    },
    mounted() {

      if( this.idx ) {
        this.getRowAction({
          container: this.$refs.publicFrm,
          params: {
            idx: this.idx
          }
        })
      }

    },
    destroyed() {
      this.$emit('close')
    }
  }
</script>
