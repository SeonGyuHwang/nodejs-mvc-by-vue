<template>
  <div>
    <div v-if="!showModal">

      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/card">
            게시판
          </router-link>
        </li>
      </ol>

      <div class="card listWrap">
        <div class="card-body">
          <a href="javascript:void(0);" class="btn btn-block btn-primary" @click="writePopup()">등록</a>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <div class="text-center schWrap">
              <label>
                작성자 :
                <input type="text" class="form-control-sm sch_user_email" style="width:150px;" @input="setUserEmail" v-on:keyup.enter="setData" />
              </label>
              <label>
                기간검색 :
                <input type="text" class="form-control-sm date-picker sch_start_date" style="width:120px;" v-model="startDate" :update_target="startDate" readonly />
                ~
                <input type="text" class="form-control-sm date-picker sch_end_date" style="width:120px;" v-model="endDate" :update_target="endDate" readonly />
              </label>
            </div>
            <div class="col-xs-12 no-padding">
              <div class="dataTables_length">
                <label>
                  <select class="form-control form-control-sm" v-model="perLength">
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="250">250</option>
                    <option value="500">500</option>
                    <option value="-1">전체</option>
                  </select>
                </label>개의 항목 표시
              </div>
            </div>
          </div>
          <vcl-table v-show="contentLoading" />
          <table v-show="!contentLoading" class="table table-bordered tableFixed publicDataTable">
            <colgroup>
              <col width="10%;" />
              <col width="*;" />
              <col width="15%;" />
              <col width="15%;" />
            </colgroup>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">제목</th>
                <th class="text-center">일자</th>
                <th class="text-center">작성자</th>
              </tr>
            </thead>
            <tbody>
              <tr v-show="tableData.length > 0" v-for="row in tableData" @click="writePopup(row.idx)">
                <td class="text-center">{{ row.idx }}</td>
                <td class="text-center">{{ row.title }}</td>
                <td class="text-center">{{ row.updated_date || row.created_date }}</td>
                <td class="text-center">{{ row.created_id }}</td>
              </tr>
              <tr v-show="tableData.length <= 0">
                <td class="text-center" colspan="4">조회된 데이터가 없습니다.</td>
              </tr>
            </tbody>
            <tfoot>
            <tr>
              <th class="text-center">번호</th>
              <th class="text-center">제목</th>
              <th class="text-center">일자</th>
              <th class="text-center">작성자</th>
            </tr>
            </tfoot>
          </table>
          <div class="row" v-show="!contentLoading && tableData.length > 0">
            <div class="col-sm-12 col-md-5">
              <div class="dataTables_info">
                총 {{ totalCountNumberFormat }} 건
              </div>
            </div>
            <div class="col-sm-12 col-md-7">
              <app-paging />
            </div>
          </div>
        </div>
        <div class="card-body">
          <a href="javascript:void(0);" class="btn btn-block btn-primary" @click="writePopup()">등록</a>
        </div>
      </div>
    </div>
    <transition name="modal">
      <write v-if="showModal" @close="writeClose" />
    </transition>
  </div>
</template>

<script>
  import Write from './Write'
  import {mapState} from "vuex";

  export default {
    name: 'board-list',
    head() {
      return {
        title: {
          inner: "SPA",
          separator: "-",
          complement: "게시판"
        }
      }
    },
    components: {
      "write": Write
    },
    watch:{
      tableData: {
        deep: true,
        handler() {
          this.tableGroups()
        }
      }
    },
    computed: {
      ...mapState('board', {
        idx: state => state.idx,
        userEmail: state => state.userEmail,
        startDate: state => state.startDate,
        endDate: state => state.endDate,
        tableData: state => state.list,
        totalCount: state => state.count,
        totals: state => state.totals,
      })
    },
    created() {
      this.setData()
    },
    updated() {
      this.setDatePicker()
    }
  }
</script>
